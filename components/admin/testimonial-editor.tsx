"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Check, Loader2, Plus, Star, StarOff, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ImageBrowser from "@/components/admin/image-browser"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Testimonial } from "@/data/testimonials"

// Mock testimonials data - in a real app, this would come from your API or data store
const mockTestimonials: Testimonial[] = [
  {
    name: "John D.",
    location: "Albany, NY",
    text: "I was referred to 1 Stop Pest Control by my property manager, so I gave them a call. Got an appointment for the next day for the time frame I needed! Other places had me leave a message or wasn't available for days to a week.",
    rating: 5,
    image: "/images/testimonials/professional-man-headshot.png",
    pest: "ant",
  },
  {
    name: "Sarah M.",
    location: "Troy, NY",
    text: "Their heat treatment for bedbugs was amazing! No chemicals and all the bugs were gone in one treatment. Worth every penny for the peace of mind.",
    rating: 5,
    image: "/images/testimonials/professional-woman-headshot.png",
    pest: "bedbug",
  },
]

export default function TestimonialEditor() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSelectTestimonial = (index: number) => {
    setSelectedTestimonial(testimonials[index])
    setIsEditing(false)
    setSaveStatus("idle")
  }

  const handleCreateNew = () => {
    const newTestimonial: Testimonial = {
      name: "New Customer",
      location: "Albany, NY",
      text: "Customer testimonial",
      rating: 5,
      image: "",
    }
    setSelectedTestimonial(newTestimonial)
    setIsEditing(true)
    setSaveStatus("idle")
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    if (selectedTestimonial) {
      // Find the original testimonial by matching properties
      const originalIndex = testimonials.findIndex(
        (t) => t.name === selectedTestimonial.name && t.location === selectedTestimonial.location,
      )

      if (originalIndex >= 0) {
        setSelectedTestimonial(testimonials[originalIndex])
      } else {
        setSelectedTestimonial(null)
      }
    }

    setIsEditing(false)
    setSaveStatus("idle")
  }

  const handleSave = async () => {
    if (!selectedTestimonial) return

    setIsSaving(true)
    setSaveStatus("idle")

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find if this testimonial already exists
      const existingIndex = testimonials.findIndex(
        (t) => t.name === selectedTestimonial.name && t.location === selectedTestimonial.location,
      )

      // Update testimonials list
      const updatedTestimonials =
        existingIndex >= 0
          ? testimonials.map((t, i) => (i === existingIndex ? selectedTestimonial : t))
          : [...testimonials, selectedTestimonial]

      setTestimonials(updatedTestimonials)
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
    if (!selectedTestimonial || !window.confirm("Are you sure you want to delete this testimonial?")) return

    setIsSaving(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find the testimonial to delete
      const deleteIndex = testimonials.findIndex(
        (t) => t.name === selectedTestimonial.name && t.location === selectedTestimonial.location,
      )

      if (deleteIndex >= 0) {
        // Remove from testimonials list
        const updatedTestimonials = testimonials.filter((_, i) => i !== deleteIndex)
        setTestimonials(updatedTestimonials)
        setSelectedTestimonial(null)
      }
    } catch (error) {
      console.error("Delete failed:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleFieldChange = (field: keyof Testimonial, value: any) => {
    if (!selectedTestimonial) return

    setSelectedTestimonial({
      ...selectedTestimonial,
      [field]: value,
    })
  }

  const handleRatingChange = (rating: number) => {
    if (!selectedTestimonial) return

    setSelectedTestimonial({
      ...selectedTestimonial,
      rating,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Testimonials</h2>
          <Button onClick={handleCreateNew} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Testimonial
          </Button>
        </div>

        <div className="border rounded-md divide-y max-h-[500px] overflow-y-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`p-3 cursor-pointer hover:bg-gray-50 ${
                selectedTestimonial?.name === testimonial.name && selectedTestimonial?.location === testimonial.location
                  ? "bg-gray-50"
                  : ""
              }`}
              onClick={() => handleSelectTestimonial(index)}
            >
              <div className="font-medium">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.location}</div>
              <div className="flex mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          ))}

          {testimonials.length === 0 && (
            <div className="p-6 text-center text-gray-500">No testimonials found. Create your first testimonial.</div>
          )}
        </div>
      </div>

      <div className="md:col-span-2">
        {selectedTestimonial ? (
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Testimonial" : `${selectedTestimonial.name}'s Testimonial`}</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={selectedTestimonial.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        value={selectedTestimonial.location}
                        onChange={(e) => handleFieldChange("location", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Testimonial Text</label>
                    <Textarea
                      value={selectedTestimonial.text}
                      onChange={(e) => handleFieldChange("text", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rating</label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Button
                            key={rating}
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto"
                            onClick={() => handleRatingChange(rating)}
                          >
                            {rating <= selectedTestimonial.rating ? (
                              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="h-6 w-6 text-gray-300" />
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Related Pest (optional)</label>
                      <Select
                        value={selectedTestimonial.pest || ""}
                        onValueChange={(value) => handleFieldChange("pest", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select pest" />
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
                    <label className="text-sm font-medium">Profile Image</label>
                    <div className="grid grid-cols-2 gap-4">
                      <ImageBrowser
                        onSelect={(url) => handleFieldChange("image", url)}
                        currentImage={selectedTestimonial.image}
                      />

                      {selectedTestimonial.image && (
                        <div className="relative h-32 w-32 rounded-full overflow-hidden border">
                          <img
                            src={selectedTestimonial.image || "/placeholder.svg"}
                            alt={selectedTestimonial.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    {selectedTestimonial.image && (
                      <div className="relative h-16 w-16 rounded-full overflow-hidden border flex-shrink-0">
                        <img
                          src={selectedTestimonial.image || "/placeholder.svg"}
                          alt={selectedTestimonial.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}

                    <div>
                      <div className="font-medium text-lg">{selectedTestimonial.name}</div>
                      <div className="text-gray-500">{selectedTestimonial.location}</div>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < selectedTestimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md italic">"{selectedTestimonial.text}"</div>

                  {selectedTestimonial.pest && (
                    <div>
                      <div className="text-sm font-medium text-gray-500">Related Pest</div>
                      <div className="capitalize">{selectedTestimonial.pest}</div>
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
                  <Button onClick={handleEdit}>Edit Testimonial</Button>
                </>
              )}
            </CardFooter>

            {saveStatus === "success" && (
              <Alert variant="default" className="mx-6 mb-6 bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-600" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Testimonial saved successfully.</AlertDescription>
              </Alert>
            )}

            {saveStatus === "error" && (
              <Alert variant="destructive" className="mx-6 mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to save testimonial. Please try again.</AlertDescription>
              </Alert>
            )}
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full border rounded-lg p-12 bg-gray-50">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">No testimonial selected</h3>
              <p className="mt-1 text-gray-500">Select a testimonial from the list or create a new one</p>
              <Button onClick={handleCreateNew} className="mt-4">
                <Plus className="h-4 w-4 mr-1" />
                Create New Testimonial
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
