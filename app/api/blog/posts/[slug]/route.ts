import { type NextRequest, NextResponse } from "next/server"
import { getPosts } from "@/actions/blog-actions"

interface RouteParams {
  params: {
    slug: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const posts = await getPosts()
    const post = posts.find((p) => p.slug === params.slug)

    if (!post) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 })
    }

    // Only return published posts for public API (unless admin token is provided)
    const authHeader = request.headers.get("authorization")
    const isAdmin = authHeader === `Bearer ${process.env.ADMIN_API_TOKEN}`

    if (post.status !== "published" && !isAdmin) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 })
    }

    const apiPost = {
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
    }

    return NextResponse.json({
      success: true,
      data: apiPost,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch post" }, { status: 500 })
  }
}
