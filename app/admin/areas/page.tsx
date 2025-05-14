import ServiceAreasEditor from "@/components/admin/service-areas-editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServiceAreasPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Service Areas Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Service Areas</CardTitle>
          <CardDescription>Manage the areas served by 1 Stop Pest Control in the Albany Capital Region</CardDescription>
        </CardHeader>
        <CardContent>
          <ServiceAreasEditor />
        </CardContent>
      </Card>
    </div>
  )
}
