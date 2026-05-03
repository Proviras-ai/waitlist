import { NextRequest, NextResponse } from "next/server";
import { createWaitlistEntry, checkDuplicate } from "./waitlist.service";

export async function postWaitlistEntry(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const existing = await checkDuplicate(email);
    if (existing) {
      return NextResponse.json(
        { error: "That email is already on the waitlist." },
        { status: 409 }
      );
    }

    const entry = await createWaitlistEntry({ email });
    return NextResponse.json({ success: true, id: entry.id }, { status: 201 });

  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
