import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">The page you're looking for doesn't exist or has been moved.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/admin">
            <Button className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go to Admin Dashboard
            </Button>
          </Link>

          <Link href="/blog">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              View Blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
