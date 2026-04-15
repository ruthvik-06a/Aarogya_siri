"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  User,
  Mail,
  ShoppingBag,
  ArrowRight,
  Loader2,
  Leaf,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/hooks/use-user"
import { toast } from "sonner"

export default function AccountPage() {
  const { user, isLoading, mutate } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [isLoading, user, router])

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    await mutate()
    toast.success("You have been signed out.")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-12 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="font-serif text-4xl font-bold">My Account</h1>
          <p className="mt-2 text-lg opacity-90">
            {"Manage your profile and orders"}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        {/* Profile Card */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="flex items-center gap-5">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-card-foreground">
                {user.name}
              </h2>
              <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                <Mail className="size-4" />
                <span className="text-sm">{user.email}</span>
              </div>
            </div>
          </div>

          <div className="my-8 h-px bg-border" />

          {/* Quick Links */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/shop"
              className="flex items-center gap-4 rounded-xl border border-border p-5 transition-colors hover:bg-secondary"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <ShoppingBag className="size-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-card-foreground">
                  Browse Products
                </h3>
                <p className="text-sm text-muted-foreground">
                  Explore our organic catalog
                </p>
              </div>
              <ArrowRight className="size-5 text-muted-foreground" />
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-4 rounded-xl border border-border p-5 transition-colors hover:bg-secondary"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Leaf className="size-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-card-foreground">
                  View Cart
                </h3>
                <p className="text-sm text-muted-foreground">
                  Check your current items
                </p>
              </div>
              <ArrowRight className="size-5 text-muted-foreground" />
            </Link>
          </div>

          <div className="my-8 h-px bg-border" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="size-4" />
              {"Signed in as "}
              <span className="font-medium text-foreground">{user.email}</span>
            </div>
            <Button
              variant="outline"
              className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
