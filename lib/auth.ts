import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const SESSION_COOKIE = "Aarogya-siri-session"

function getKey() {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error("Please define the AUTH_SECRET environment variable")
  }
  return new TextEncoder().encode(secret)
}

export interface SessionPayload {
  userId: string
  name: string
  email: string
}

export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(getKey())

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getKey())
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
