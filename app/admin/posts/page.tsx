import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPosts } from "@/actions/blog-actions"
import { PostsTable } from "@/components/admin/posts-table"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
        <Link href="/admin/posts/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Posts ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <PostsTable posts={posts} />
        </CardContent>
      </Card>
    </div>
  )
}
