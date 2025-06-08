import { PostEditor } from "@/components/admin/post-editor"
import { getPost, getCategories } from "@/actions/blog-actions"
import { notFound } from "next/navigation"

interface EditPostPageProps {
  params: {
    id: string
  }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const [post, categories] = await Promise.all([getPost(params.id), getCategories()])

  if (!post) {
    notFound()
  }

  const categoryNames = categories.map((cat) => cat.name)

  return <PostEditor post={post} categories={categoryNames} />
}
