"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Leaf, Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useUser } from "@/hooks/use-user"

type Tab = "login" | "register"

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<Tab>("login")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { mutate } = useUser()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    try {
      if (activeTab === "login") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password"),
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.error || "Login failed")
          return
        }

        await mutate()
        toast.success("Welcome back! You are now signed in.")
        router.push("/")
      } else {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("fullname"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            password: formData.get("password"),
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.error || "Signup failed")
          return
        }

        await mutate()
        toast.success("Account created! Welcome to Aarogya siri.")
        router.push("/")
      }
    } catch (error) {
      console.error("Auth form error:", error)
      setError(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary">
            <Leaf className="size-7 text-primary-foreground" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Aarogya siri
          </h1>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {/* Tabs */}
          <div className="mb-8 flex rounded-full border border-border bg-secondary p-1">
            {(["login", "register"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  setError("")
                }}
                className={cn(
                  "flex-1 rounded-full py-2.5 text-sm font-medium transition-all",
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {activeTab === "register" && (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="fullname"
                  className="text-sm font-medium text-card-foreground"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="fullname"
                    name="fullname"
                    placeholder="Enter your name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-card-foreground"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {activeTab === "register" && (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-card-foreground"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-card-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-2 rounded-full text-base"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : activeTab === "login"
                  ? "Sign In"
                  : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {activeTab === "login" ? (
              <>
                {"Don't have an account? "}
                <button
                  onClick={() => {
                    setActiveTab("register")
                    setError("")
                  }}
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                {"Already have an account? "}
                <button
                  onClick={() => {
                    setActiveTab("login")
                    setError("")
                  }}
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {"By continuing, you agree to our "}
          <Link href="#" className="text-primary hover:underline">
            Terms of Service
          </Link>
          {" and "}
          <Link href="#" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

// 👇 ADD THIS - Save as app/api/auth/login/route.ts
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    // your login logic here

    return Response.json({ message: "Login successful" })
  } catch (error) {
    console.error("LOGIN API ERROR:", error) // 👈 ADD THIS
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}