"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Upload, X, Loader2 } from "lucide-react"

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [category, setCategory] = useState("pest")
  const [altText, setAltText] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      setFile(droppedFile)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(droppedFile)
    }
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real implementation, you would upload the file to your server or storage service here
    console.log("Uploading file:", file.name)
    console.log("Category:", category)
    console.log("Alt text:", altText)

    // Reset form after successful upload
    setFile(null)
    setPreview(null)
    setAltText("")
    setIsUploading(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          preview ? "border-gray-300" : "border-gray-300 hover:border-pest-red"
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative">
            <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-48 mx-auto" />
            <button
              onClick={clearFile}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="py-4">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-gray-500 mb-2">Drag and drop an image, or click to browse</p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="mx-auto">
              <Upload className="h-4 w-4 mr-2" />
              Select Image
            </Button>
          </div>
        )}
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="category">Image Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="logo">Logo</SelectItem>
              <SelectItem value="pest">Pest</SelectItem>
              <SelectItem value="service">Service</SelectItem>
              <SelectItem value="location">Location</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="alt-text">Alt Text</Label>
          <Input
            id="alt-text"
            placeholder="Describe the image for accessibility"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </div>

        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="w-full bg-pest-red hover:bg-pest-red/90"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
