"use client"

import type { BlogPost } from "@/types/blog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { deletePost } from "@/actions/blog-actions"
import { useTransition } from "react"

interface PostsTableProps {
  posts: BlogPost[]
}

export function PostsTable({ posts }: PostsTableProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      startTransition(async () => {
        await deletePost(postId)
      })
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>
              <div>
                <div className="font-medium">{post.title}</div>
                <div className="text-sm text-gray-500">{post.excerpt}</div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
            </TableCell>
            <TableCell>{post.category}</TableCell>
            <TableCell>{post.updatedAt.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                {post.status === "published" && (
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
                <Link href={`/admin/posts/${post.id}/edit`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)} disabled={isPending}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
