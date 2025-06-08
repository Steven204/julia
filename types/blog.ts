export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage?: string
  category: string
  tags: string[]
  status: "draft" | "published"
  seoTitle?: string
  seoDescription?: string
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  postCount: number
}

export interface CMSStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalCategories: number
}
