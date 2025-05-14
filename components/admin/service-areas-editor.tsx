"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Check, Loader2, Plus, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { ServiceArea } from "@/data/service-areas"

// Mock service areas data - in a real app, this would come from your API or data store
const mockServiceAreas: ServiceArea[] = [
  { name: "Albany", featured: true },
  { name: "Rensselaer", featured: true },
  { name: "Troy", featured: true },
  { name: "Schenectady", featured: true },
  { name: "Colonie", featured: true },
  { name: "Clifton Park", featured: true },
  { name: "Latham" },
  { name: "Delmar" },
  { name: "Guilderland" },
  { name: "East Greenbush" },
  { name: "Cohoes" },
  { name: "Watervliet" },
  { name: "Saratoga Springs" },
  { name: "Ballston Spa" },
  { name: "Malta" },
  { name: "Glenville" },
]

export default function ServiceAreasEditor() {
  const [areas, setAreas] = useState<ServiceArea[]>(mockServiceAreas)
  const [newAreaName, setNewAreaName] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  const handleAddArea = async () => {
    if (!newAreaName.trim()) return

    setIsSaving(true)
    setSaveStatus("idle")

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newArea: ServiceArea = {
        name: newAreaName.trim(),
        featured: false,
      }

      setAreas([...areas, newArea])
      setNewAreaName("")
      setSaveStatus("success")
    } catch (error) {
      console.error("Save failed:", error)
      setSaveStatus("error")
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggleFeatured = async (index: number) => {
    setIsSaving(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      const updatedAreas = [...areas]
      updatedAreas[index] = {
        ...updatedAreas[index],
        featured: !updatedAreas[index].featured,
      }

      setAreas(updatedAreas)
    } catch (error) {
      console.error("Update failed:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteArea = async (index: number) => {
    if (!window.confirm("Are you sure you want to delete this service area?")) return

    setIsSaving(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedAreas = areas.filter((_, i) => i !== index)
      setAreas(updatedAreas)
    } catch (error) {
      console.error("Delete failed:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          placeholder="Add new service area..."
          value={newAreaName}
          onChange={(e) => setNewAreaName(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleAddArea} disabled={!newAreaName.trim() || isSaving}>
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
          Add Area
        </Button>
      </div>

      {saveStatus === "success" && (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Service area added successfully.</AlertDescription>
        </Alert>
      )}

      {saveStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to add service area. Please try again.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Service Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {areas.map((area, index) => (
              <div
                key={index}
                className={`p-3 rounded-md border flex justify-between items-center ${
                  area.featured ? "bg-blue-50 border-blue-200" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={area.featured || false}
                    onChange={() => handleToggleFeatured(index)}
                    className="rounded border-gray-300"
                    id={`featured-${index}`}
                  />
                  <label htmlFor={`featured-${index}`} className="font-medium">
                    {area.name}
                  </label>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteArea(index)} className="h-8 w-8">
                  <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          {areas.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No service areas found. Add your first service area above.
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-sm text-gray-500">Check the box to mark an area as featured on the homepage.</div>
        </CardFooter>
      </Card>
    </div>
  )
}
