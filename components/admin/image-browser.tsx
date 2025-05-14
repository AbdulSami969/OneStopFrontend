"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageIcon, FolderOpen } from "lucide-react"

interface ImageBrowserProps {
  onSelect: (url: string) => void
  currentImage?: string
}

// Sample images for demonstration
const sampleImages = [
  "/images/1stop-logo.png",
  "/images/bedbug-closeup.png",
  "/images/antcontrol.png",
  "/images/roaches.png",
  "/images/rodents.png",
  "/images/wasps.png",
  "/images/heat-treatment.png",
  "/images/technician.png",
  "/images/residential-service.png",
  "/images/commercial-service.png",
  "/albany-ny-skyline.png",
]

export default function ImageBrowser({ onSelect, currentImage }: ImageBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedImage, setSelectedImage] = useState(currentImage || "")

  const filteredImages = sampleImages.filter((image) => image.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSelect = (image: string) => {
    setSelectedImage(image)
    onSelect(image)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" className="flex-shrink-0">
          <FolderOpen className="h-4 w-4 mr-2" />
          Browse
        </Button>
      </div>

      <div className="border rounded-md p-2 h-[200px] overflow-y-auto">
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square border rounded-md overflow-hidden cursor-pointer hover:border-pest-red transition-colors ${
                  selectedImage === image ? "border-pest-red ring-2 ring-pest-red/20" : ""
                }`}
                onClick={() => handleSelect(image)}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Image ${index + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No images found</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" size="sm">
          <ImageIcon className="h-4 w-4 mr-2" />
          Upload New
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => selectedImage && onSelect(selectedImage)}
          disabled={!selectedImage}
          className="bg-pest-red hover:bg-pest-red/90"
        >
          Select Image
        </Button>
      </div>
    </div>
  )
}
