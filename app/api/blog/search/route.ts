import { type NextRequest, NextResponse } from "next/server"
import { getPosts } from "@/actions/blog-actions"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const limit = searchParams.get("limit")

    if (!query) {
      return NextResponse.json({ success: false, error: "Search query is required" }, { status: 400 })
    }

    const posts = await getPosts()
    const publishedPosts = posts.filter((post) => post.status === "published")

    // Search in title, excerpt, content, and tags
    const searchResults = publishedPosts.filter((post) => {
      const searchText = query.toLowerCase()
      return (
        post.title.toLowerCase().includes(searchText) ||
        post.excerpt.toLowerCase().includes(searchText) ||
        post.content.toLowerCase().includes(searchText) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchText)) ||
        post.category.toLowerCase().includes(searchText)
      )
    })

    // Apply limit
    const limitNum = limit ? Number.parseInt(limit) : 10
    const limitedResults = searchResults.slice(0, limitNum)

    const apiResults = limitedResults.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      featuredImage: post.featuredImage,
      category: post.category,
      tags: post.tags,
      publishedAt: post.publishedAt?.toISOString(),
      // Highlight matching terms in title and excerpt
      highlightedTitle: highlightText(post.title, query),
      highlightedExcerpt: highlightText(post.excerpt, query),
    }))

    return NextResponse.json({
      success: true,
      data: apiResults,
      meta: {
        query,
        total: searchResults.length,
        count: apiResults.length,
        limit: limitNum,
      },
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Search failed" }, { status: 500 })
  }
}

function highlightText(text: string, query: string): string {
  const regex = new RegExp(`(${query})`, "gi")
  return text.replace(regex, "<mark>$1</mark>")
}
