import Image from "next/image"
import {
  Leaf,
  Users,
  MapPin,
  Heart,
  Sprout,
  Sun,
  Mountain,
} from "lucide-react"

export const metadata = {
  title: "About Us | Aarogya siri",
  description:
    "Learn about Aarogya siri and our mission to bring pure, organic products from Karnataka farms to your table.",
}

const values = [
  {
    icon: Sprout,
    title: "Sustainable Agriculture",
    description:
      "We promote farming methods that protect the soil, conserve water, and maintain ecological balance.",
  },
  {
    icon: Users,
    title: "Farmer Partnerships",
    description:
      "We work directly with over 100 small-scale farmers, ensuring fair prices and stable livelihoods.",
  },
  {
    icon: Heart,
    title: "Community Health",
    description:
      "Our mission is to make clean, chemical-free food accessible to every household in Karnataka.",
  },
  {
    icon: Sun,
    title: "Traditional Wisdom",
    description:
      "We preserve ancient farming knowledge and traditional food processing techniques passed down through generations.",
  },
]

const milestones = [
  {
    year: "2019",
    title: "The Seed Was Planted",
    description:
      "Started with a small collection of millets from three farming families in Hassan district.",
  },
  {
    year: "2020",
    title: "Growing Together",
    description:
      "Expanded to 25 farmer partners and launched cold-pressed oils and organic spices.",
  },
  {
    year: "2022",
    title: "Reaching Karnataka",
    description:
      "Began delivering across all districts of Karnataka, serving over 1,000 families.",
  },
  {
    year: "2024",
    title: "The Aarogya siri Family",
    description:
      "100+ farmer partners, 50+ products, and 2,000+ happy customers across Karnataka.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10">
            <Leaf className="size-32" />
          </div>
          <div className="absolute bottom-10 right-10 rotate-45">
            <Mountain className="size-40" />
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest opacity-80">
            Our Story
          </p>
          <h1 className="font-serif text-4xl font-bold md:text-6xl">
            <span className="text-balance">
              Rooted in Tradition, Growing with Purpose
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed opacity-90">
            Aarogya siri is a Karnataka-born initiative dedicated to
            reviving traditional organic farming and making pure, natural
            products accessible to every home.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/about-farm.jpg"
                alt="Organic farm in Karnataka countryside"
                width={600}
                height={450}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                <span className="text-balance">
                  From the Soil of Karnataka
                </span>
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                The name <span className="font-medium">"Aarogya siri"</span> means Earth in Sanskrit. It reflects our
                deep connection with the land and our commitment to preserving
                its purity. We started Aarogya siri with a simple belief:
                the food on your table should be as pure as nature intended.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Karnataka has a rich agricultural heritage spanning thousands
                of years. Our ancestors cultivated diverse millets, pressed
                oils using wooden ghanis, and grew spices that were the envy
                of the world. But the shift to modern agriculture and
                chemical-heavy practices has threatened this legacy.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Aarogya siri was founded to bridge the gap between
                traditional wisdom and modern consumers. We work with small
                farming communities across Karnataka who still practice
                natural, organic farming. By creating a direct market for
                their produce, we ensure fair incomes for farmers and pure,
                chemical-free products for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              What We Believe In
            </p>
            <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
              Our Values
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                  <value.icon className="size-7 text-primary" />
                </div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-card-foreground">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Our Journey
            </p>
            <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
              Milestones
            </h2>
          </div>

          <div className="relative flex flex-col gap-12">
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-6 w-px bg-border md:left-1/2 md:-translate-x-px" />

            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 z-10 flex size-3 -translate-x-1/2 items-center justify-center rounded-full bg-primary md:left-1/2">
                  <div className="size-2 rounded-full bg-primary" />
                </div>

                {/* Content */}
                <div
                  className={`ml-12 w-full rounded-xl border border-border bg-card p-6 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? "" : ""
                  }`}
                >
                  <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {milestone.year}
                  </span>
                  <h3 className="mb-2 font-serif text-lg font-semibold text-card-foreground">
                    {milestone.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Karnataka Focus */}
      <section className="bg-primary py-20 text-primary-foreground lg:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <MapPin className="mx-auto mb-6 size-12 opacity-80" />
          <h2 className="font-serif text-3xl font-bold md:text-5xl">
            <span className="text-balance">Proudly Karnataka</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed opacity-90">
            We are a local-first brand, sourcing exclusively from Karnataka
            farmers and delivering only within the state. This keeps our
            supply chain short, our products fresh, and our carbon footprint
            small.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-12">
            {[
              { value: "100+", label: "Farmer Partners" },
              { value: "30+", label: "Karnataka Districts" },
              { value: "50+", label: "Organic Products" },
              { value: "2,000+", label: "Happy Families" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm opacity-70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
