import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageIcon, ShieldCheck, Bug, MessageSquare, MapPin, Settings } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/images">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                <span>Image Management</span>
              </CardTitle>
              <CardDescription>Upload and manage website images</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Organize and upload images for services, pests, and other website content.</p>
              <Button variant="link" className="p-0 h-auto mt-2">
                Manage Images →
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/services">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <span>Services</span>
              </CardTitle>
              <CardDescription>Manage service offerings</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Create and edit service pages, descriptions, and images.</p>
              <Button variant="link" className="p-0 h-auto mt-2">
                Manage Services →
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/pests">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                <span>Pests</span>
              </CardTitle>
              <CardDescription>Manage pest information</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Create and edit pest information pages, facts, and treatment methods.</p>
              <Button variant="link" className="p-0 h-auto mt-2">
                Manage Pests →
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/testimonials">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>Testimonials</span>
              </CardTitle>
              <CardDescription>Manage customer testimonials</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Add and edit customer reviews and testimonials to display on the website.</p>
              <Button variant="link" className="p-0 h-auto mt-2">
                Manage Testimonials →
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/areas">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Service Areas</span>
              </CardTitle>
              <CardDescription>Manage service locations</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Update the areas served by 1 Stop Pest Control in the Albany Capital Region.</p>
              <Button variant="link" className="p-0 h-auto mt-2">
                Manage Areas →
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/settings">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </CardTitle>
              <CardDescription>Website configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Update contact information, SEO settings, and other website configurations.</p>
              <Button variant="link" className="p-0 h-auto mt-2">
                Manage Settings →
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
