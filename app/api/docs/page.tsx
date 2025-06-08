import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function APIDocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog API Documentation</h1>
        <p className="text-xl text-gray-600">RESTful API endpoints for accessing your blog content</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default">GET</Badge>
              /api/blog/posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Retrieve a list of blog posts</p>
            <div className="space-y-2">
              <h4 className="font-semibold">Query Parameters:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>
                  <code>status</code> - Filter by status (published, draft)
                </li>
                <li>
                  <code>category</code> - Filter by category name
                </li>
                <li>
                  <code>limit</code> - Number of posts to return
                </li>
                <li>
                  <code>offset</code> - Number of posts to skip
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Example:</h4>
              <code className="bg-gray-100 p-2 rounded block mt-2">
                GET /api/blog/posts?limit=10&category=Web%20Development
              </code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default">GET</Badge>
              /api/blog/posts/[slug]
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Retrieve a single blog post by slug</p>
            <div className="mt-4">
              <h4 className="font-semibold">Example:</h4>
              <code className="bg-gray-100 p-2 rounded block mt-2">GET /api/blog/posts/getting-started-nextjs</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default">GET</Badge>
              /api/blog/categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Retrieve all blog categories with post counts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default">GET</Badge>
              /api/blog/search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Search blog posts</p>
            <div className="space-y-2">
              <h4 className="font-semibold">Query Parameters:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>
                  <code>q</code> - Search query (required)
                </li>
                <li>
                  <code>limit</code> - Number of results to return (default: 10)
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Example:</h4>
              <code className="bg-gray-100 p-2 rounded block mt-2">GET /api/blog/search?q=react&limit=5</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default">GET</Badge>
              /api/blog/rss
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>RSS feed of published blog posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Format</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">All API responses follow this format:</p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {`{
  "success": true,
  "data": [...],
  "meta": {
    "total": 100,
    "count": 10,
    "offset": 0,
    "limit": 10
  }
}`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">For accessing draft posts or admin endpoints, include the admin token:</p>
            <code className="bg-gray-100 p-2 rounded block">Authorization: Bearer YOUR_ADMIN_TOKEN</code>
            <p className="text-sm text-gray-600 mt-2">
              Set the <code>ADMIN_API_TOKEN</code> environment variable in your deployment.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
