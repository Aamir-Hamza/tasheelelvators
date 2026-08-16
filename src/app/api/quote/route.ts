import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { QuoteLead } from "@/lib/models/QuoteLead";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  projectType: z.string().optional(),
  floors: z.number().optional(),
  capacity: z.number().optional(),
  units: z.number().optional(),
  city: z.string().optional(),
  notes: z.string().optional(),
  serviceType: z.string().optional(),
  details: z.string().optional(),
  estimate: z
    .object({
      low: z.number(),
      high: z.number(),
    })
    .optional(),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const session = await getSession();
    await connectDb();

    await QuoteLead.create({
      ...body,
      userId: session?.sub,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Invalid request" },
      { status: 400 }
    );
  }
}
