"use server"

import type { BlogPost, Category, CMSStats } from "@/types/blog"
import { revalidatePath } from "next/cache"

// Mock data - replace with your database calls
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    slug: "getting-started-nextjs",
    content: "<p>Next.js is a powerful React framework...</p>",
    excerpt: "Learn the basics of Next.js and how to build modern web applications.",
    featuredImage: "/placeholder.svg?height=400&width=800",
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript"],
    status: "published",
    seoTitle: "Getting Started with Next.js - Complete Guide",
    seoDescription: "Learn Next.js from scratch with this comprehensive guide.",
    publishedAt: new Date("2024-01-15"),
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    slug: "advanced-react-patterns",
    content: "<p>Explore advanced React patterns and techniques...</p>",
    excerpt: "Deep dive into advanced React patterns for better code organization.",
    category: "React",
    tags: ["React", "Patterns", "Advanced"],
    status: "draft",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
]

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Web Development",
    slug: "web-development",
    description: "Articles about web development",
    postCount: 1,
  },
  { id: "2", name: "React", slug: "react", description: "React tutorials and guides", postCount: 1 },
  { id: "3", name: "JavaScript", slug: "javascript", description: "JavaScript tips and tricks", postCount: 0 },
]

export async function getPosts(): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockPosts
}

export async function getPost(id: string): Promise<BlogPost | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockPosts.find((post) => post.id === id) || null
}

export async function createPost(formData: FormData): Promise<{ success: boolean; message: string; postId?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const category = formData.get("category") as string
  const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim())
  const status = formData.get("status") as "draft" | "published"
  const seoTitle = formData.get("seoTitle") as string
  const seoDescription = formData.get("seoDescription") as string

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  const newPost: BlogPost = {
    id: Date.now().toString(),
    title,
    slug,
    content,
    excerpt,
    category,
    tags,
    status,
    seoTitle,
    seoDescription,
    publishedAt: status === "published" ? new Date() : undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  mockPosts.unshift(newPost)
  revalidatePath("/admin")

  return { success: true, message: "Post created successfully!", postId: newPost.id }
}

export async function updatePost(id: string, formData: FormData): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const postIndex = mockPosts.findIndex((post) => post.id === id)
  if (postIndex === -1) {
    return { success: false, message: "Post not found" }
  }

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const category = formData.get("category") as string
  const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim())
  const status = formData.get("status") as "draft" | "published"
  const seoTitle = formData.get("seoTitle") as string
  const seoDescription = formData.get("seoDescription") as string

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  mockPosts[postIndex] = {
    ...mockPosts[postIndex],
    title,
    slug,
    content,
    excerpt,
    category,
    tags,
    status,
    seoTitle,
    seoDescription,
    publishedAt:
      status === "published" && !mockPosts[postIndex].publishedAt ? new Date() : mockPosts[postIndex].publishedAt,
    updatedAt: new Date(),
  }

  revalidatePath("/admin")
  return { success: true, message: "Post updated successfully!" }
}

export async function deletePost(id: string): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const postIndex = mockPosts.findIndex((post) => post.id === id)
  if (postIndex === -1) {
    return { success: false, message: "Post not found" }
  }

  mockPosts.splice(postIndex, 1)
  revalidatePath("/admin")

  return { success: true, message: "Post deleted successfully!" }
}

export async function getCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockCategories
}

export async function getCMSStats(): Promise<CMSStats> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  return {
    totalPosts: mockPosts.length,
    publishedPosts: mockPosts.filter((post) => post.status === "published").length,
    draftPosts: mockPosts.filter((post) => post.status === "draft").length,
    totalCategories: mockCategories.length,
  }
}
