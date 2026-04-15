"use client"

import { useState } from "react"
import {
  Leaf,
  Users,
  TrendingUp,
  Shield,
  CheckCircle,
  Send,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { sendSellerEmail } from "@/lib/emailjs"
import { toast } from "sonner"

const benefits = [
  {
    icon: Users,
    title: "Direct Customer Access",
    description: "Connect directly with health-conscious customers seeking organic products.",
  },
  {
    icon: TrendingUp,
    title: "Fair Pricing",
    description: "Get competitive prices for your organic produce without middlemen.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "We help maintain quality standards and provide guidance on organic practices.",
  },
  {
    icon: Leaf,
    title: "Sustainable Partnership",
    description: "Join our mission to promote organic farming across Karnataka.",
  },
]

const requirements = [
  "Farm located in Karnataka",
  "Organic or natural farming practices",
  "Minimum 1 acre of cultivable land",
  "Commitment to chemical-free produce",
  "Reliable transportation access",
]

export default function SellerAccessPage() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    farmLocation: "",
    products: "",
    farmSize: "",
    message: "",
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      await sendSellerEmail(formData)
      setSuccess(true)
      toast.success("Application submitted successfully!")
    } catch {
      toast.error("Failed to submit. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-32 text-center">
          <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="size-10 text-primary" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Application Received!
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Thank you for your interest in partnering with Aarogya siri. Our team will review your application and contact you within 3-5 business days.
          </p>
          <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="size-4" />
              <span>aruthvik4@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="size-4" />
              <span>+91 94488 62175</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="font-serif text-4xl font-bold md:text-5xl">
            Become a Seller
          </h1>
          <p className="mt-4 text-lg opacity-90">
            Partner with us to bring your organic produce directly to customers
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-center font-serif text-3xl font-bold text-foreground">
            Why Partner With Us?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-border bg-card p-6 text-center transition-all hover:shadow-lg"
              >
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <benefit.icon className="size-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Requirements */}
          <div>
            <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
              Seller Requirements
            </h2>
            <p className="mb-6 text-muted-foreground">
              To ensure we maintain the highest quality standards, we look for partners who meet the following criteria:
            </p>
            <ul className="space-y-4">
              {requirements.map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary">
                    <CheckCircle className="size-3 text-primary-foreground" />
                  </div>
                  <span className="text-foreground">{req}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl bg-secondary p-6">
              <h3 className="mb-3 font-semibold text-foreground">
                Have Questions?
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Contact our seller support team for more information about becoming a partner.
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <Mail className="size-4 text-primary" />
                  aruthvik4@gmail.com
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Phone className="size-4 text-primary" />
                  +91 94488 62175
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="mb-6 font-serif text-2xl font-bold text-card-foreground">
              Apply to Become a Seller
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="seller-name" className="text-sm font-medium text-card-foreground">
                  Full Name
                </label>
                <Input
                  id="seller-name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="seller-email" className="text-sm font-medium text-card-foreground">
                    Email
                  </label>
                  <Input
                    id="seller-email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="seller-phone" className="text-sm font-medium text-card-foreground">
                    Phone Number
                  </label>
                  <Input
                    id="seller-phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="seller-location" className="text-sm font-medium text-card-foreground">
                  Farm Location
                </label>
                <Input
                  id="seller-location"
                  placeholder="Village, District, Karnataka"
                  value={formData.farmLocation}
                  onChange={(e) => setFormData({ ...formData, farmLocation: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="seller-products" className="text-sm font-medium text-card-foreground">
                    Products You Grow
                  </label>
                  <Input
                    id="seller-products"
                    placeholder="e.g., Ragi, Turmeric, Coconut"
                    value={formData.products}
                    onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="seller-farm-size" className="text-sm font-medium text-card-foreground">
                    Farm Size
                  </label>
                  <Select
                    value={formData.farmSize}
                    onValueChange={(value) => setFormData({ ...formData, farmSize: value })}
                    required
                  >
                    <SelectTrigger id="seller-farm-size">
                      <SelectValue placeholder="Select farm size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2 acres">1-2 acres</SelectItem>
                      <SelectItem value="2-5 acres">2-5 acres</SelectItem>
                      <SelectItem value="5-10 acres">5-10 acres</SelectItem>
                      <SelectItem value="10+ acres">10+ acres</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="seller-message" className="text-sm font-medium text-card-foreground">
                  Tell Us About Your Farm
                </label>
                <Textarea
                  id="seller-message"
                  placeholder="Describe your farming practices, experience, and why you'd like to partner with us..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="mt-2 rounded-full"
                disabled={submitting}
              >
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="mr-2 size-4" />
                    Submit Application
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
