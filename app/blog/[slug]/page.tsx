import { getPosts } from "@/actions/blog-actions"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const posts = await getPosts()
  const post = posts.find((p) => p.slug === params.slug && p.status === "published")

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>

      <article>
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Badge>{post.category}</Badge>
            <span className="text-gray-500">{post.publishedAt?.toLocaleDateString()}</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

          {post.excerpt && <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>}

          {post.featuredImage && (
            <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
              <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        <footer className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </footer>
      </article>
    </div>
  )
}
