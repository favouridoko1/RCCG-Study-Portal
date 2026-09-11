import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { db } from "./db";

const SESSION_COOKIE = "rccg_session";
const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7;

export async function createSession(userId: number) {
  const sessionId = randomBytes(32).toString("hex");

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION
  ).toISOString();

  await db.orm.public.Session.create({
    id: sessionId,
    userId,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });

  return sessionId;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionId) {
    console.log("AUTH CHECK - no session cookie");
    return null;
  }

  const session = await db.orm.public.Session
    .where((session) => session.id.eq(sessionId))
    .first();

  if (!session) {
    return null;
  }

  if (new Date(session.expiresAt) <= new Date()) {
    return null;
  }

  const user = await db.orm.public.User
    .where((user) => user.id.eq(session.userId))
    .first();

  return user;
}