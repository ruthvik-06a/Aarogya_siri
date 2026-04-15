import type { Metadata, Viewport } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: {
    template: "%s | Aarogya siri",
    default: "Aarogya siri | Pure Organic Products from Karnataka",
  },
  description:
    "Discover premium organic millets, cold-pressed oils, spices, and natural products sourced directly from Karnataka farms. 100% natural, chemical-free, and sustainably grown.",
  keywords: [
    "organic",
    "millets",
    "Karnataka",
    "cold-pressed oil",
    "natural farming",
    "organic food",
  ],
}

export const viewport: Viewport = {
  themeColor: "#2d6a4f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="bottom-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}