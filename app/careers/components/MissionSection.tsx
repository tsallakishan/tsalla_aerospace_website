// app/perks-and-benefits/page.tsx
"use client"
import type React from "react"

// Inline content wrapper so spacing matches StormFeatures style
const ContentWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`w-full px-6 md:px-12 xl:px-24 max-w-[90rem] mx-auto lg:ml-[2.75rem] ${className}`}
  >
    {children}
  </div>
)

export default function PerksAndBenefitsPage() {
  return (
    <section className="min-h-screen grid lg:grid-cols-2 font-clash">
      {/* LEFT COLUMN */}
      <div className="bg-black text-white flex flex-col justify-start">
        <ContentWrapper className="py-16 md:py-24">
          <div className="max-w-md w-full text-left">
            <h1 className="text-3xl font-bold leading-tight mb-12 tracking-tight md:text-5xl">
              PERKS AND BENEFITS
            </h1>

            <ul className="space-y-8">
              <li>
                <h2 className="font-bold mb-2 text-xl">1. Comprehensive Health Coverage</h2>
                <p className="text-gray-300 leading-relaxed text-base">
                  From Preventive Care To Emergencies, We&apos;ve Got Your Back With Top-Tier Medical Insurance For
                  Peace Of Mind.
                </p>
              </li>

              <li>
                <h2 className="font-bold mb-2 text-lg">2. Wear What Works</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We Keep Things Relaxed And Idea-Focused. Just Come Dressed In A Way That&apos;s Comfortable And
                  Office-Appropriate.
                </p>
              </li>

              <li>
                <h2 className="font-bold mb-2 text-lg">3. Pet-Friendly Environment</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your Four-Legged Companions Are Welcome—Because Innovation Happens Best In Spaces That Feel Like Home.
                </p>
              </li>

              <li>
                <h2 className="font-bold mb-2 text-lg">4. Above-Market Compensation</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We Pay For Performance, Competitive Salaries Designed To Reflect Your Impact, Not Just Your Title.
                </p>
              </li>
            </ul>
          </div>
        </ContentWrapper>
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full h-[31.25rem] lg:h-auto">
        <img
          src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?auto=format&fit=crop&q=80&w=1600"
          alt="Team working together"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}
