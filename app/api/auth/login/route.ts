import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getDb } from "@/lib/db"

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const db = await getDb()
    const users = db.collection("users")

    const normalizedEmail = String(email).toLowerCase().trim()
    const user = await users.findOne({ email: normalizedEmail })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    const passwordMatch = await bcrypt.compare(
      String(password),
      user.password
    )

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // 🔴 Session management will go here later
    // await createSession(user.id, request)

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({ 
      success: true,
      message: "Login successful",
      user: userWithoutPassword 
    })
  } catch (error) {
    console.error("LOGIN ERROR 👉", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}