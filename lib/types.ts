// API Response Types
export interface HardwareItem {
  id: string
  name: string
  description: string
  specifications: {
    weight: string
    dimensions: string
    range: string
    payload: string
  }
  images: string[]
  category: "drone" | "sensor" | "communication" | "other"
  status: "active" | "development" | "discontinued"
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    role: string
    avatar: string
  }
  publishedAt: string
  tags: string[]
  featuredImage: string
  readTime: number
}

export interface CareerPosition {
  id: string
  title: string
  department: string
  location: string
  type: "full-time" | "part-time" | "contract"
  level: "entry" | "mid" | "senior" | "executive"
  description: string
  requirements: string[]
  benefits: string[]
  postedAt: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  bio: string
  avatar: string
  linkedin?: string
  twitter?: string
}

export interface MediaItem {
  id: string
  title: string
  type: "image" | "video"
  url: string
  thumbnail?: string
  description: string
  tags: string[]
  uploadedAt: string
}

export interface Document {
  id: string
  title: string
  description: string
  type: "pdf" | "doc" | "presentation"
  url: string
  size: string
  category: "manual" | "specification" | "report" | "whitepaper"
  uploadedAt: string
}

export interface Mission {
  id: string
  name: string
  description: string
  objectives: string[]
  status: "planning" | "active" | "completed"
  startDate: string
  endDate?: string
  technologies: string[]
  images: string[]
}

export interface NewsItem {
  id: string
  headline: string
  summary: string
  content: string
  publishedAt: string
  category: "press-release" | "announcement" | "award" | "partnership"
  featuredImage: string
}
