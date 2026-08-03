import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  projectType: z.string(),
  floors: z.number(),
  capacity: z.number(),
  units: z.number(),
  city: z.string(),
  notes: z.string().optional(),
  estimate: z
    .object({
      low: z.number(),
      high: z.number(),
    })
    .optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    console.info("[quote]", data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Invalid request" },
      { status: 400 }
    );
  }
}
