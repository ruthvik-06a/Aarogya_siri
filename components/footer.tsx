import Link from "next/link"
import { Leaf, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary">
                <Leaf className="size-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-bold">
                Aarogya siri
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-70">
              Bringing the purest organic products from Karnataka farms directly
              to your doorstep. Committed to natural farming and sustainable
              living.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg font-semibold">Categories</h3>
            <nav className="flex flex-col gap-2">
              {["Millets", "Oils", "Spices", "Sweeteners", "Honey"].map(
                (cat) => (
                  <Link
                    key={cat}
                    href={`/shop?category=${cat}`}
                    className="text-sm opacity-70 transition-opacity hover:opacity-100"
                  >
                    {cat}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg font-semibold">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm opacity-70">
                <Phone className="size-4 shrink-0" />
                <span>+91 94488 62175</span>
              </div>
              <div className="flex items-center gap-3 text-sm opacity-70">
                <Mail className="size-4 shrink-0" />
                <span>aruthvik4@gmail.com</span>
              </div>
              <div className="flex items-start gap-3 text-sm opacity-70">
                <MapPin className="size-4 shrink-0 mt-0.5" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8 text-center text-sm opacity-50">
          <p>
            {"2026  Aarogya siri. All rights reserved. Delivering across Karnataka."}
          </p>
        </div>
      </div>
    </footer>
  )
}
