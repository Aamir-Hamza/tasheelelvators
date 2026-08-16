import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectDb } from "@/lib/db";
import { User } from "@/lib/models/User";
import { sessionCookieOptions, signSession } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8).optional(),
  company: z.string().optional(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    await connectDb();

    const existing = await User.findOne({ email: body.email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ ok: false, error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(body.password, 12);
    const user = await User.create({
      name: body.name,
      email: body.email.toLowerCase(),
      phone: body.phone,
      company: body.company,
      passwordHash,
    });

    const token = await signSession({
      sub: String(user._id),
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json({
      ok: true,
      user: { id: String(user._id), name: user.name, email: user.email },
    });
    response.cookies.set(sessionCookieOptions(token));
    return response;
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Signup failed" },
      { status: 400 }
    );
  }
}
