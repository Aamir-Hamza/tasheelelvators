import { NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";
import { getSession } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { QuoteLead } from "@/lib/models/QuoteLead";

const schema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, "").length >= 7, "Enter a valid phone number"),
  projectType: z.string().optional(),
  floors: z.coerce.number().optional(),
  capacity: z.coerce.number().optional(),
  units: z.coerce.number().optional(),
  city: z.string().optional(),
  notes: z.string().optional(),
  serviceType: z.string().optional(),
  details: z.string().optional(),
  estimate: z
    .object({
      low: z.coerce.number(),
      high: z.coerce.number(),
    })
    .optional(),
});

function errorMessage(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message ?? "Invalid request";
  }
  if (error instanceof Error) return error.message;
  return "Invalid request";
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  await connectDb();
  const quotes = await QuoteLead.find({ userId: session.sub }).sort({ createdAt: -1 }).lean();

  return NextResponse.json({
    ok: true,
    quotes: quotes.map((quote) => ({
      id: String(quote._id),
      name: quote.name,
      email: quote.email,
      phone: quote.phone,
      city: quote.city,
      projectType: quote.projectType,
      serviceType: quote.serviceType,
      floors: quote.floors,
      capacity: quote.capacity,
      units: quote.units,
      notes: quote.notes,
      estimate: quote.estimate,
      createdAt: quote.createdAt,
    })),
  });
}

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const session = await getSession();
    await connectDb();

    const quote = await QuoteLead.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      projectType: body.projectType,
      floors: body.floors,
      capacity: body.capacity,
      units: body.units,
      city: body.city,
      notes: body.notes,
      serviceType: body.serviceType,
      details: body.details,
      estimate: body.estimate,
      ...(session?.sub && mongoose.Types.ObjectId.isValid(session.sub)
        ? { userId: session.sub }
        : {}),
    });

    return NextResponse.json({ ok: true, id: String(quote._id) });
  } catch (error) {
    console.error("[quote]", error);
    const isValidation = error instanceof z.ZodError;
    return NextResponse.json(
      { ok: false, error: errorMessage(error) },
      { status: isValidation ? 400 : 500 }
    );
  }
}
