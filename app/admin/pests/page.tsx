import PestEditor from "@/components/admin/pest-editor"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PestsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pests Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Pests Management</CardTitle>
          <CardDescription>Create, edit, and manage pest information pages</CardDescription>
        </CardHeader>
        <CardContent>
          <PestEditor />
        </CardContent>
      </Card>
    </div>
  )
}
