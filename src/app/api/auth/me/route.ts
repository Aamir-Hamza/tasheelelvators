import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { User } from "@/lib/models/User";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ ok: true, user: null });
  }

  await connectDb();
  const user = await User.findById(session.sub).select("name email phone company");
  if (!user) {
    return NextResponse.json({ ok: true, user: null });
  }

  return NextResponse.json({
    ok: true,
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email,
      phone: user.phone ?? "",
      company: user.company ?? "",
    },
  });
}
