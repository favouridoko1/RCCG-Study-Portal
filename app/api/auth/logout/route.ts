import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/src/prisma/db";

const SESSION_COOKIE = "rccg_session";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

    if (sessionId) {
      await db.orm.public.Session
        .where((session) => session.id.eq(sessionId))
        .delete();
    }

    // Clear the session cookie
    cookieStore.set(SESSION_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Signed out successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to sign out. Please try again.",
      },
      { status: 500 }
    );
  }
}