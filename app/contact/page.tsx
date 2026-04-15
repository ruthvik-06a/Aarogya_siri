"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendContactEmail } from "@/lib/emailjs"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 94488 62175",
    subtext: "Mon-Sat, 9am to 6pm IST",
  },
  {
    icon: Mail,
    label: "Email",
    value: "aruthvik4@gmail.com",
    subtext: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bengaluru, Karnataka",
    subtext: "India 560001",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon - Sat: 9AM - 6PM",
    subtext: "Sunday: Closed",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      })
      toast.success("Message sent! We will get back to you soon.")
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="font-serif text-4xl font-bold md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg opacity-90">
            {"We'd love to hear from you. Reach out anytime."}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">
                Get in Touch
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Have questions about our products, delivery, or partnerships?
                We are here to help. Reach out through any of the channels
                below or fill out the form.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <info.icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {info.label}
                    </p>
                    <p className="mt-1 font-medium text-card-foreground">
                      {info.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {info.subtext}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Embed */}
            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497699.9973874144!2d77.35074!3d12.9539974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aarogya siri Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
            <h3 className="mb-6 font-serif text-2xl font-bold text-card-foreground">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-card-foreground"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-card-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-card-foreground"
                >
                  Phone (optional)
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-card-foreground"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
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
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 size-4" />
                    Send Message
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
