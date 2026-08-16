import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { PlanOrder } from "@/lib/models/PlanOrder";

const schema = z.object({
  division: z.enum(["elevators", "cctv", "maintenance"]),
  planName: z.string().min(2),
  planSummary: z.string().optional(),
  notes: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional(),
});

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  await connectDb();
  const orders = await PlanOrder.find({ userId: session.sub }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({
    ok: true,
    orders: orders.map((o) => ({
      id: String(o._id),
      division: o.division,
      planName: o.planName,
      planSummary: o.planSummary,
      status: o.status,
      notes: o.notes,
      createdAt: o.createdAt,
    })),
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Please log in to request a plan" }, { status: 401 });
  }

  try {
    const body = schema.parse(await request.json());
    await connectDb();

    const order = await PlanOrder.create({
      userId: session.sub,
      division: body.division,
      planName: body.planName,
      planSummary: body.planSummary,
      notes: body.notes,
      contactPhone: body.contactPhone,
      contactEmail: body.contactEmail ?? session.email,
      status: "pending",
    });

    return NextResponse.json({
      ok: true,
      order: {
        id: String(order._id),
        planName: order.planName,
        status: order.status,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Order failed" },
      { status: 400 }
    );
  }
}
