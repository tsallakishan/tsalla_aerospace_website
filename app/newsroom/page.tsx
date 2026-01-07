"use client"

import type React from "react"
import { useState, useMemo } from "react"
import PageWrapper from "@/components/PageWrapper"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"

interface NewsArticle {
  title: string
  date: string
  image: string
  readMoreLink: string
  category: string
}

const newsCategories = [
  { name: "All", value: "all" },
  { name: "News", value: "news" },
  { name: "Announcements", value: "Announcements" },
  { name: "Engineering", value: "engineering" },
  { name: "Products", value: "products" },
]

const featuredNews = {
  title: "Tsalla Awarded $99.6M for Indian. Army Next Generation Command and Control Prototype",
  date: "7/18/2025",
  image:
    "https://cdn.sanity.io/images/z5s3oquj/production/abb6bab613d7d967786b922562d07d61f60f873e-3840x2160.jpg?auto=format&fit=max&w=1920&q=90",
  readMoreLink: "/newsroom/anduril-awarded-army-contract",
  category: "news",
}

const allNewsArticles: NewsArticle[] = [
  {
    title:
      "Barracuda-100M Completes Another Successful Flight Test for Army High Speed Maneuverable Missile Program",
    date: "7/16/2025",
    image: "https://cdn.sanity.io/images/9w6n0tb6/production/df19db700657bdf0225835a8744254a57f3b9613-1536x1024.webp",
    readMoreLink: "/newsroom/barracuda-flight-test",
    category: "products",
  },
  {
    title:
      "Saab Chooses Anduril Rocket Motor Systems to Design and Produce Solid Rocket Motors for the Ground-Launched Small...",
    date: "6/20/2025",
    image: "https://cdn.sanity.io/images/9w6n0tb6/production/df19db700657bdf0225835a8744254a57f3b9613-1536x1024.webp",
    readMoreLink: "/newsroom/saab-partnership",
    category: "news",
  },
  {
    title:
      "Anduril Industries and Rheinmetall Partner to Design and Manufacture Barracuda, Fury & Solid Rocket Motors for...",
    date: "6/19/2025",
    image: "/placeholder.svg?height=200&width=300&text=Rheinmetall+Partnership",
    readMoreLink: "/newsroom/rheinmetall-partnership",
    category: "news",
  },
  {
    title: "Advanced Manufacturing Processes Revolutionize Defense Production",
    date: "6/15/2025",
    image: "/blueprint-background.png",
    readMoreLink: "/newsroom/manufacturing-partnership",
    category: "engineering",
  },
  {
    title: "Riverside Research and Anduril Collaborate to Cyber Harden Critical Defense Capabilities",
    date: "6/12/2025",
    image: "/placeholder.svg?height=200&width=300&text=Riverside+Collaboration",
    readMoreLink: "/newsroom/riverside-collaboration",
    category: "policy",
  },
  {
    title: "Anduril and Meta Team Up to Transform XR for the American Military",
    date: "6/10/2025",
    image: "/placeholder.svg?height=200&width=300&text=Meta+Partnership",
    readMoreLink: "/newsroom/meta-partnership",
    category: "products",
  },
  {
    title: "Advanced Autonomous Systems Integration for Next-Gen Defense Applications",
    date: "6/8/2025",
    image: "/placeholder.svg?height=200&width=300&text=Autonomous+Systems",
    readMoreLink: "/newsroom/autonomous-systems",
    category: "engineering",
  },
  {
    title: "Life at Anduril: Building the Future of Defense Technology",
    date: "6/5/2025",
    image: "/placeholder.svg?height=200&width=300&text=Facility+Expansion",
    readMoreLink: "/newsroom/facility-expansion",
    category: "anduril-life",
  },
  {
    title: "Strategic Partnership Announced for Counter-UAS Technology Development",
    date: "6/1/2025",
    image: "/placeholder.svg?height=200&width=300&text=Counter+UAS",
    readMoreLink: "/newsroom/counter-uas-partnership",
    category: "policy",
  },
]

export default function NewsroomPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    console.log("Searching for:", searchTerm)
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const filteredArticles = useMemo(() => {
    let filtered = allNewsArticles

    if (activeCategory !== "all") {
      filtered = filtered.filter((article) => article.category === activeCategory)
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.date.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [activeCategory, searchTerm])

  const shouldShowFeatured =
    (activeCategory === "all" || featuredNews.category === activeCategory) &&
    (!searchTerm.trim() || featuredNews.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <PageWrapper>
      <div className="min-h-screen bg-white font-clash">
        <div className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            {/* Featured News Section */}
            {shouldShowFeatured && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 font-clash">Featured news</h2>
                <div className="flex flex-col lg:flex-row-reverse gap-8 items-start">
                  <div className="lg:w-1/2">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                      <Image
                        src={featuredNews.image || "/placeholder.svg"}
                        alt={featuredNews.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className="lg:w-1/2 lg:pr-4">
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight font-clash line-clamp-3">
                      {featuredNews.title}
                    </h3>
                    {/* Newsletter-style Read More */}
                    <div className="text-sm text-gray-600 mb-3 font-medium font-clash">{featuredNews.date}</div>
                    <Link
                      href={featuredNews.readMoreLink}
                      className="inline-flex items-center text-gray-900 group font-clash text-sm font-medium transition-all duration-200"
                    >
                      <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[0.125rem] after:bg-black after:transition-all after:duration-300 group-hover:after:w-full">
                        Read More
                      </span>
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Categories */}
            <div className="flex flex-wrap gap-6 mb-8 items-center">
              <div className="flex flex-wrap gap-6">
                {newsCategories.map((category, index) => (
                  <button
                  key={index}
    onClick={() => setActiveCategory(category.value)}
    className={`relative text-sm font-medium font-clash transition-colors pb-1
      ${
        activeCategory === category.value
          ? "text-gray-900 after:w-full after:bg-gray-900"
          : "text-gray-500 hover:text-gray-700 after:bg-gray-400"
      }
      after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full`}
  >
    {category.name}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent font-clash"
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-gray-900 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label="Search"
                  >
                    <Search size={14} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* News Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <div key={index} className="group">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 group">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="text-sm text-gray-600 mb-2 font-medium font-clash">{article.date}</div>
                    <h3 className="h-24 text-lg font-bold text-gray-900 mb-4 leading-snug font-clash line-clamp-3">
                      {article.title}
                    </h3>
                    {/* Newsletter-style Read More */}
                    <Link
                      href={article.readMoreLink}
                      className="inline-flex items-center text-gray-900 group font-clash text-sm font-medium transition-all duration-200"
                    >
                      <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[0.125rem] after:bg-black after:transition-all after:duration-300 group-hover:after:w-full">
                        Read More
                      </span>
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Link>
                    <div className="w-full h-px bg-gray-300 mt-6" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg font-clash">
                  No articles found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all")
                    setSearchTerm("")
                  }}
                  className="mt-4 text-gray-900 font-semibold hover:text-gray-700 transition-colors font-clash"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
