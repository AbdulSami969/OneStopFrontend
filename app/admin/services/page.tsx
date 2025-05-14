import ServiceEditor from "@/components/admin/service-editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Services Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Services Management</CardTitle>
          <CardDescription>Create, edit, and manage services offered by 1 Stop Pest Control</CardDescription>
        </CardHeader>
        <CardContent>
          <ServiceEditor />
        </CardContent>
      </Card>
    </div>
  )
}
