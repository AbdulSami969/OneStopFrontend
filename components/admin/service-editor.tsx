"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Check, Loader2, Plus, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ImageBrowser from "@/components/admin/image-browser"
import type { Service } from "@/data/services"
import { IconPicker } from "@/components/admin/icon-picker"

// Mock services data - in a real app, this would come from your API or data store
const mockServices: Service[] = [
  {
    id: "heat-treatment",
    title: "Heat Treatment",
    description: "Our specialty! Eco-friendly bedbug elimination using advanced heat treatment technology.",
    icon: "Thermometer",
    image: "/images/services/heat-treatment.png",
    link: "/heat-treatment",
    pestIcon: "bedbug",
    featured: true,
  },
  {
    id: "residential",
    title: "Residential Pest Control",
    description: "Comprehensive pest management solutions for your home.",
    icon: "Home",
    image: "/images/services/residential-service.png",
    link: "/residential",
    pestIcon: "ant",
    featured: true,
  },
]

export default function ServiceEditor() {
  const [services, setServices] = useState<Service[]>(mockServices)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSelectService = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId) || null
    setSelectedService(service)
    setIsEditing(false)
    setSaveStatus("idle")
  }

  const handleCreateNew = () => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      title: "New Service",
      description: "Service description",
      icon: "Shield",
      link: "/new-service",
      featured: false,
    }
    setSelectedService(newService)
    setIsEditing(true)
    setSaveStatus("idle")
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    if (selectedService && selectedService.id) {
      // Reset to original service data
      const originalService = services.find((s) => s.id === selectedService.id)
      setSelectedService(originalService || null)
    } else {
      setSelectedService(null)
    }
    setIsEditing(false)
    setSaveStatus("idle")
  }

  const handleSave = async () => {
    if (!selectedService) return

    setIsSaving(true)
    setSaveStatus("idle")

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update services list
      const updatedServices =
        selectedService.id && services.some((s) => s.id === selectedService.id)
          ? services.map((s) => (s.id === selectedService.id ? selectedService : s))
          : [...services, selectedService]

      setServices(updatedServices)
      setSaveStatus("success")
      setIsEditing(false)
    } catch (error) {
      console.error("Save failed:", error)
      setSaveStatus("error")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedService || !window.confirm("Are you sure you want to delete this service?")) return

    setIsSaving(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Remove from services list
      const updatedServices = services.filter((s) => s.id !== selectedService.id)
      setServices(updatedServices)
      setSelectedService(null)
    } catch (error) {
      console.error("Delete failed:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleFieldChange = (field: keyof Service, value: any) => {
    if (!selectedService) return

    setSelectedService({
      ...selectedService,
      [field]: value,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Services</h2>
          <Button onClick={handleCreateNew} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Service
          </Button>
        </div>

        <div className="border rounded-md divide-y max-h-[500px] overflow-y-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-3 cursor-pointer hover:bg-gray-50 ${
                selectedService?.id === service.id ? "bg-gray-50" : ""
              }`}
              onClick={() => handleSelectService(service.id)}
            >
              <div className="font-medium">{service.title}</div>
              <div className="text-sm text-gray-500 truncate">{service.description}</div>
              {service.featured && (
                <div className="mt-1">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Featured</span>
                </div>
              )}
            </div>
          ))}

          {services.length === 0 && (
            <div className="p-6 text-center text-gray-500">No services found. Create your first service.</div>
          )}
        </div>
      </div>

      <div className="md:col-span-2">
        {selectedService ? (
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Service" : selectedService.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={selectedService.title}
                        onChange={(e) => handleFieldChange("title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">URL Path</label>
                      <Input value={selectedService.link} onChange={(e) => handleFieldChange("link", e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={selectedService.description}
                      onChange={(e) => handleFieldChange("description", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Icon</label>
                      <IconPicker
                        value={selectedService.icon || "Shield"}
                        onChange={(value) => handleFieldChange("icon", value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pest Icon (optional)</label>
                      <Select
                        value={selectedService.pestIcon || ""}
                        onValueChange={(value) => handleFieldChange("pestIcon", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select pest icon" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="ant">Ant</SelectItem>
                          <SelectItem value="bedbug">Bed Bug</SelectItem>
                          <SelectItem value="cockroach">Cockroach</SelectItem>
                          <SelectItem value="mouse">Mouse</SelectItem>
                          <SelectItem value="spider">Spider</SelectItem>
                          <SelectItem value="wasp">Wasp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Featured Image</label>
                    <div className="grid grid-cols-2 gap-4">
                      <ImageBrowser
                        onSelect={(url) => handleFieldChange("image", url)}
                        currentImage={selectedService.image}
                      />

                      {selectedService.image && (
                        <div className="relative aspect-video rounded-md overflow-hidden border">
                          <img
                            src={selectedService.image || "/placeholder.svg"}
                            alt={selectedService.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={selectedService.featured || false}
                      onChange={(e) => handleFieldChange("featured", e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="featured" className="text-sm font-medium">
                      Featured Service
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">URL Path</div>
                      <div>{selectedService.link}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Featured</div>
                      <div>{selectedService.featured ? "Yes" : "No"}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-500">Description</div>
                    <div>{selectedService.description}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Icon</div>
                      <div>{selectedService.icon}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Pest Icon</div>
                      <div>{selectedService.pestIcon || "None"}</div>
                    </div>
                  </div>

                  {selectedService.image && (
                    <div>
                      <div className="text-sm font-medium text-gray-500">Image</div>
                      <div className="mt-1 relative aspect-video w-full max-w-md rounded-md overflow-hidden border">
                        <img
                          src={selectedService.image || "/placeholder.svg"}
                          alt={selectedService.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                    Cancel
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="destructive" onClick={handleDelete} disabled={isSaving}>
                      {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 mr-1" />}
                      Delete
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-1" />
                      ) : (
                        <Check className="h-4 w-4 mr-1" />
                      )}
                      Save
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div></div>
                  <Button onClick={handleEdit}>Edit Service</Button>
                </>
              )}
            </CardFooter>

            {saveStatus === "success" && (
              <Alert variant="default" className="mx-6 mb-6 bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Service saved successfully.</AlertDescription>
              </Alert>
            )}

            {saveStatus === "error" && (
              <Alert variant="destructive" className="mx-6 mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to save service. Please try again.</AlertDescription>
              </Alert>
            )}
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full border rounded-lg p-12 bg-gray-50">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">No service selected</h3>
              <p className="mt-1 text-gray-500">Select a service from the list or create a new one</p>
              <Button onClick={handleCreateNew} className="mt-4">
                <Plus className="h-4 w-4 mr-1" />
                Create New Service
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
