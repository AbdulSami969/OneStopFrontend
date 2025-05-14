import ImageManager from "@/components/admin/image-manager"
import ImageUpload from "@/components/admin/image-upload"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ImagesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Image Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Image</CardTitle>
            <CardDescription>Upload a new image to use on the website</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload />
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <ImageManager />
        </div>
      </div>
    </div>
  )
}
