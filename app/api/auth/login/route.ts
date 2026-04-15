import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getDb } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    console.log("STEP 1: API HIT")

    const { email, password } = await request.json()
    console.log("STEP 2:", email)

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const db = await getDb()
    console.log("STEP 3: DB CONNECTED")

    const users = db.collection("users")

    const normalizedEmail = String(email).toLowerCase().trim()
    const user = await users.findOne({ email: normalizedEmail })
    console.log("STEP 4: USER FOUND", !!user)

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    console.log("STEP 5: CHECKING PASSWORD")

    const passwordMatch = await bcrypt.compare(String(password), user.password)
    console.log("STEP 6: PASSWORD MATCH", passwordMatch)

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // 🔴 Session management will go here later
    // await createSession(user.id, request)

    console.log("STEP 7: LOGIN SUCCESS")

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