import { type NextRequest, NextResponse } from "next/server"
import { getPosts } from "@/actions/blog-actions"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset")

    const posts = await getPosts()

    // Filter posts based on query parameters
    let filteredPosts = posts

    // Filter by status (default to published for public API)
    if (status) {
      filteredPosts = filteredPosts.filter((post) => post.status === status)
    } else {
      // Default to published posts only for public API
      filteredPosts = filteredPosts.filter((post) => post.status === "published")
    }

    // Filter by category
    if (category) {
      filteredPosts = filteredPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
    }

    // Sort by published date (newest first)
    filteredPosts.sort((a, b) => {
      const dateA = a.publishedAt || a.createdAt
      const dateB = b.publishedAt || b.createdAt
      return dateB.getTime() - dateA.getTime()
    })

    // Apply pagination
    const limitNum = limit ? Number.parseInt(limit) : undefined
    const offsetNum = offset ? Number.parseInt(offset) : 0

    if (limitNum) {
      filteredPosts = filteredPosts.slice(offsetNum, offsetNum + limitNum)
    }

    // Transform posts for API response
    const apiPosts = filteredPosts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      category: post.category,
      tags: post.tags,
      status: post.status,
      publishedAt: post.publishedAt?.toISOString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
      seo: {
        title: post.seoTitle,
        description: post.seoDescription,
      },
    }))

    return NextResponse.json({
      success: true,
      data: apiPosts,
      meta: {
        total: posts.filter((p) => (status ? p.status === status : p.status === "published")).length,
        count: apiPosts.length,
        offset: offsetNum,
        limit: limitNum,
      },
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch posts" }, { status: 500 })
  }
}
