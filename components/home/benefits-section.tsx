import { Leaf, MapPin, Heart, ShieldCheck } from "lucide-react"

const benefits = [
  {
    icon: Leaf,
    title: "100% Organic",
    description:
      "All our products are certified organic, grown without synthetic pesticides or chemicals.",
  },
  {
    icon: MapPin,
    title: "Local Karnataka Products",
    description:
      "Sourced directly from small-scale farmers across Karnataka, supporting local communities.",
  },
  {
    icon: Heart,
    title: "Natural Farming",
    description:
      "Our farmers practice traditional, sustainable farming methods passed down through generations.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description:
      "Every product is carefully tested and packed to ensure the highest quality reaches you.",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Why Choose Us
          </p>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            <span className="text-balance">The Aarogya siri Promise</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <benefit.icon className="size-7 text-primary" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-card-foreground">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
