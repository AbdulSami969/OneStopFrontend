import TestimonialEditor from "@/components/admin/testimonial-editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestimonialsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Testimonials Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Testimonials Management</CardTitle>
          <CardDescription>Create, edit, and manage customer testimonials</CardDescription>
        </CardHeader>
        <CardContent>
          <TestimonialEditor />
        </CardContent>
      </Card>
    </div>
  )
}
