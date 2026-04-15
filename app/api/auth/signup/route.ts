import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getDb } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      )
    }

    const db = await getDb()
    const users = db.collection("users")

    const normalizedEmail = String(email).toLowerCase().trim()

    // ✅ check existing user
    const existingUser = await users.findOne({ email: normalizedEmail })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(String(password), 10)

    // ✅ insert user
    const result = await users.insertOne({
      name,
      email: normalizedEmail,
      phone: phone || "",
      password: hashedPassword,
      createdAt: new Date(),
    })

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: result.insertedId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("SIGNUP ERROR 👉", error)

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}