"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Check, Loader2, Plus, Trash2, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ImageBrowser from "@/components/admin/image-browser"
import type { Pest } from "@/data/pests"

// Mock pests data - in a real app, this would come from your API or data store
const mockPests: Pest[] = [
  {
    id: "bed-bugs",
    name: "Bed Bugs",
    image: "/images/pests/bed-bugs.png",
    icon: "bedbug",
    link: "/pests/bed-bugs",
    description: "Tiny, reddish-brown parasites that feed on blood while you sleep.",
    facts: [
      "Can survive up to a year without feeding",
      "Eggs are resistant to many pesticides",
      "Our heat treatment eliminates all life stages",
    ],
  },
  {
    id: "ants",
    name: "Ants",
    image: "/images/pests/ants.png",
    icon: "ant",
    link: "/pests/ants",
    description: "Social insects that can quickly establish colonies in and around your home.",
    facts: [
      "Can lift up to 20 times their body weight",
      "Form complex colonies with specialized roles",
      "Some species can damage structures",
    ],
  },
]

export default function PestEditor() {
  const [pests, setPests] = useState<Pest[]>(mockPests)
  const [selectedPest, setSelectedPest] = useState<Pest | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSelectPest = (pestId: string) => {
    const pest = pests.find((p) => p.id === pestId) || null
    setSelectedPest(pest)
    setIsEditing(false)
    setSaveStatus("idle")
  }

  const handleCreateNew = () => {
    const newPest: Pest = {
      id: `pest-${Date.now()}`,
      name: "New Pest",
      description: "Pest description",
      image: "",
      icon: "bedbug",
      link: "/pests/new-pest",
      facts: [],
    }
    setSelectedPest(newPest)
    setIsEditing(true)
    setSaveStatus("idle")
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    if (selectedPest && selectedPest.id) {
      // Reset to original pest data
      const originalPest = pests.find((p) => p.id === selectedPest.id)
      setSelectedPest(originalPest || null)
    } else {
      setSelectedPest(null)
    }
    setIsEditing(false)
    setSaveStatus("idle")
  }

  const handleSave = async () => {
    if (!selectedPest) return

    setIsSaving(true)
    setSaveStatus("idle")

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update pests list
      const updatedPests =
        selectedPest.id && pests.some((p) => p.id === selectedPest.id)
          ? pests.map((p) => (p.id === selectedPest.id ? selectedPest : p))
          : [...pests, selectedPest]

      setPests(updatedPests)
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
    if (!selectedPest || !window.confirm("Are you sure you want to delete this pest?")) return

    setIsSaving(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Remove from pests list
      const updatedPests = pests.filter((p) => p.id !== selectedPest.id)
      setPests(updatedPests)
      setSelectedPest(null)
    } catch (error) {
      console.error("Delete failed:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleFieldChange = (field: keyof Pest, value: any) => {
    if (!selectedPest) return

    setSelectedPest({
      ...selectedPest,
      [field]: value,
    })
  }

  const handleAddFact = () => {
    if (!selectedPest) return

    setSelectedPest({
      ...selectedPest,
      facts: [...(selectedPest.facts || []), "New fact"],
    })
  }

  const handleUpdateFact = (index: number, value: string) => {
    if (!selectedPest || !selectedPest.facts) return

    const updatedFacts = [...selectedPest.facts]
    updatedFacts[index] = value

    setSelectedPest({
      ...selectedPest,
      facts: updatedFacts,
    })
  }

  const handleRemoveFact = (index: number) => {
    if (!selectedPest || !selectedPest.facts) return

    const updatedFacts = selectedPest.facts.filter((_, i) => i !== index)

    setSelectedPest({
      ...selectedPest,
      facts: updatedFacts,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Pests</h2>
          <Button onClick={handleCreateNew} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Pest
          </Button>
        </div>

        <div className="border rounded-md divide-y max-h-[500px] overflow-y-auto">
          {pests.map((pest) => (
            <div
              key={pest.id}
              className={`p-3 cursor-pointer hover:bg-gray-50 ${selectedPest?.id === pest.id ? "bg-gray-50" : ""}`}
              onClick={() => handleSelectPest(pest.id)}
            >
              <div className="font-medium">{pest.name}</div>
              <div className="text-sm text-gray-500 truncate">{pest.description}</div>
            </div>
          ))}

          {pests.length === 0 && (
            <div className="p-6 text-center text-gray-500">No pests found. Create your first pest.</div>
          )}
        </div>
      </div>

      <div className="md:col-span-2">
        {selectedPest ? (
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Pest" : selectedPest.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input value={selectedPest.name} onChange={(e) => handleFieldChange("name", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">URL Path</label>
                      <Input value={selectedPest.link} onChange={(e) => handleFieldChange("link", e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={selectedPest.description}
                      onChange={(e) => handleFieldChange("description", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Icon</label>
                    <Select value={selectedPest.icon} onValueChange={(value) => handleFieldChange("icon", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ant">Ant</SelectItem>
                        <SelectItem value="bedbug">Bed Bug</SelectItem>
                        <SelectItem value="cockroach">Cockroach</SelectItem>
                        <SelectItem value="mouse">Mouse</SelectItem>
                        <SelectItem value="spider">Spider</SelectItem>
                        <SelectItem value="wasp">Wasp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Featured Image</label>
                    <div className="grid grid-cols-2 gap-4">
                      <ImageBrowser
                        onSelect={(url) => handleFieldChange("image", url)}
                        currentImage={selectedPest.image}
                      />

                      {selectedPest.image && (
                        <div className="relative aspect-video rounded-md overflow-hidden border">
                          <img
                            src={selectedPest.image || "/placeholder.svg"}
                            alt={selectedPest.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Facts</label>
                      <Button size="sm" variant="outline" onClick={handleAddFact}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Fact
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {selectedPest.facts &&
                        selectedPest.facts.map((fact, index) => (
                          <div key={index} className="flex gap-2">
                            <Input value={fact} onChange={(e) => handleUpdateFact(index, e.target.value)} />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleRemoveFact(index)}
                              className="h-10 w-10 flex-shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}

                      {(!selectedPest.facts || selectedPest.facts.length === 0) && (
                        <div className="text-sm text-gray-500 italic">
                          No facts added yet. Click "Add Fact" to add one.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">URL Path</div>
                      <div>{selectedPest.link}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Icon</div>
                      <div>{selectedPest.icon}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-500">Description</div>
                    <div>{selectedPest.description}</div>
                  </div>

                  {selectedPest.image && (
                    <div>
                      <div className="text-sm font-medium text-gray-500">Image</div>
                      <div className="mt-1 relative aspect-video w-full max-w-md rounded-md overflow-hidden border">
                        <img
                          src={selectedPest.image || "/placeholder.svg"}
                          alt={selectedPest.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  )}

                  {selectedPest.facts && selectedPest.facts.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-gray-500">Facts</div>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {selectedPest.facts.map((fact, index) => (
                          <li key={index}>{fact}</li>
                        ))}
                      </ul>
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
                  <Button onClick={handleEdit}>Edit Pest</Button>
                </>
              )}
            </CardFooter>

            {saveStatus === "success" && (
              <Alert variant="default" className="mx-6 mb-6 bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Pest saved successfully.</AlertDescription>
              </Alert>
            )}

            {saveStatus === "error" && (
              <Alert variant="destructive" className="mx-6 mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to save pest. Please try again.</AlertDescription>
              </Alert>
            )}
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full border rounded-lg p-12 bg-gray-50">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">No pest selected</h3>
              <p className="mt-1 text-gray-500">Select a pest from the list or create a new one</p>
              <Button onClick={handleCreateNew} className="mt-4">
                <Plus className="h-4 w-4 mr-1" />
                Create New Pest
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
