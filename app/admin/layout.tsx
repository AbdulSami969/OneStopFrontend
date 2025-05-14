import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageIcon, Settings, ShieldCheck, Bug, MessageSquare, MapPin, LayoutDashboard } from "lucide-react"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-pest-red text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            <h1 className="text-xl font-bold">1 Stop Pest Control Admin</h1>
          </div>
          <div>
            <Button asChild variant="outline" size="sm" className="text-white border-white hover:bg-pest-red/80">
              <Link href="/">View Website</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <Button asChild variant="ghost" size="sm" className="flex gap-1">
            <Link href="/admin">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="flex gap-1">
            <Link href="/admin/images">
              <ImageIcon className="h-4 w-4" />
              <span>Images</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="flex gap-1">
            <Link href="/admin/services">
              <ShieldCheck className="h-4 w-4" />
              <span>Services</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="flex gap-1">
            <Link href="/admin/pests">
              <Bug className="h-4 w-4" />
              <span>Pests</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="flex gap-1">
            <Link href="/admin/testimonials">
              <MessageSquare className="h-4 w-4" />
              <span>Testimonials</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="flex gap-1">
            <Link href="/admin/areas">
              <MapPin className="h-4 w-4" />
              <span>Service Areas</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="flex gap-1">
            <Link href="/admin/settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </Button>
        </div>

        {children}
      </div>
    </div>
  )
}
