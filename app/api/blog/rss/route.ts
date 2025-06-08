import { NextResponse } from "next/server"
import { getPosts } from "@/actions/blog-actions"

export async function GET() {
  try {
    const posts = await getPosts()
    const publishedPosts = posts
      .filter((post) => post.status === "published")
      .sort((a, b) => {
        const dateA = a.publishedAt || a.createdAt
        const dateB = b.publishedAt || b.createdAt
        return dateB.getTime() - dateA.getTime()
      })

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"
    const rssItems = publishedPosts
      .map(
        (post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <description><![CDATA[${post.excerpt}]]></description>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid>${siteUrl}/blog/${post.slug}</guid>
        <pubDate>${(post.publishedAt || post.createdAt).toUTCString()}</pubDate>
        <category>${post.category}</category>
        ${post.tags.map((tag) => `<category>${tag}</category>`).join("")}
      </item>
    `,
      )
      .join("")

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Your Blog</title>
        <description>Latest posts from your blog</description>
        <link>${siteUrl}/blog</link>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${rssItems}
      </channel>
    </rss>`

    return new NextResponse(rssXml, {
      headers: {
        "Content-Type": "application/xml",
      },
    })
  } catch (error) {
    console.error("RSS Error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate RSS feed" }, { status: 500 })
  }
}
