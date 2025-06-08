import { NextResponse } from "next/server"
import { getCategories } from "@/actions/blog-actions"

export async function GET() {
  try {
    const categories = await getCategories()

    const apiCategories = categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      postCount: category.postCount,
    }))

    return NextResponse.json({
      success: true,
      data: apiCategories,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch categories" }, { status: 500 })
  }
}
