"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { BlogPost } from "@/types/blog"
import { createPost, updatePost } from "@/actions/blog-actions"
import { useRouter } from "next/navigation"

interface PostEditorProps {
  post?: BlogPost
  categories: string[]
}

export function PostEditor({ post, categories }: PostEditorProps) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = post ? await updatePost(post.id, formData) : await createPost(formData)

      setMessage(result.message)

      if (result.success && !post) {
        router.push("/admin/posts")
      }
    })
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{post ? "Edit Post" : "Create New Post"}</h1>
        <div className="flex space-x-2">
          <Button type="submit" name="status" value="draft" variant="outline" disabled={isPending}>
            Save as Draft
          </Button>
          <Button type="submit" name="status" value="published" disabled={isPending}>
            {post?.status === "published" ? "Update" : "Publish"}
          </Button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-md ${message.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={post?.title} placeholder="Enter post title..." required />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  defaultValue={post?.excerpt}
                  placeholder="Brief description of the post..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={post?.content}
                  placeholder="Write your post content here..."
                  rows={15}
                  className="font-mono"
                />
                <p className="text-sm text-gray-500 mt-1">You can use HTML tags for formatting.</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="seo" className="w-full">
            <TabsList>
              <TabsTrigger value="seo">SEO Settings</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Optimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="seoTitle">SEO Title</Label>
                    <Input
                      id="seoTitle"
                      name="seoTitle"
                      defaultValue={post?.seoTitle}
                      placeholder="SEO optimized title..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="seoDescription">SEO Description</Label>
                    <Textarea
                      id="seoDescription"
                      name="seoDescription"
                      defaultValue={post?.seoDescription}
                      placeholder="SEO meta description..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Advanced settings like custom fields, scheduling, etc. can be added here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={post?.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" name="tags" defaultValue={post?.tags.join(", ")} placeholder="tag1, tag2, tag3" />
                <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="text-gray-500">
                  <p>Click to upload or drag and drop</p>
                  <p className="text-sm">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
