import { PostEditor } from "@/components/admin/post-editor"
import { getCategories } from "@/actions/blog-actions"

export default async function NewPostPage() {
  const categories = await getCategories()
  const categoryNames = categories.map((cat) => cat.name)

  return <PostEditor categories={categoryNames} />
}
