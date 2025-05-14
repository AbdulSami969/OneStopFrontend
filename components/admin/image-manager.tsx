"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Trash2, Copy, Download } from "lucide-react"

// Sample images for demonstration
const sampleImages = [
  { id: 1, name: "1stop-logo.png", path: "/images/1stop-logo.png", size: "24KB", type: "logo" },
  { id: 2, name: "bedbug-closeup.png", path: "/images/bedbug-closeup.png", size: "156KB", type: "pest" },
  { id: 3, name: "antcontrol.png", path: "/images/antcontrol.png", size: "142KB", type: "pest" },
  { id: 4, name: "roaches.png", path: "/images/roaches.png", size: "128KB", type: "pest" },
  { id: 5, name: "rodents.png", path: "/images/rodents.png", size: "135KB", type: "pest" },
  { id: 6, name: "wasps.png", path: "/images/wasps.png", size: "118KB", type: "pest" },
  { id: 7, name: "heat-treatment.png", path: "/images/heat-treatment.png", size: "245KB", type: "service" },
  { id: 8, name: "technician.png", path: "/images/technician.png", size: "198KB", type: "service" },
  { id: 9, name: "residential-service.png", path: "/images/residential-service.png", size: "212KB", type: "service" },
  { id: 10, name: "commercial-service.png", path: "/images/commercial-service.png", size: "224KB", type: "service" },
  { id: 11, name: "albany-ny-skyline.png", path: "/albany-ny-skyline.png", size: "356KB", type: "location" },
]

export default function ImageManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const filteredImages = sampleImages.filter((image) => {
    const matchesSearch = image.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || image.type === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Image Library</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Images</TabsTrigger>
            <TabsTrigger value="logo">Logos</TabsTrigger>
            <TabsTrigger value="pest">Pests</TabsTrigger>
            <TabsTrigger value="service">Services</TabsTrigger>
            <TabsTrigger value="location">Locations</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={`border rounded-md overflow-hidden cursor-pointer hover:border-pest-red transition-colors ${
                    selectedImage === image.id ? "border-pest-red ring-2 ring-pest-red/20" : ""
                  }`}
                  onClick={() => setSelectedImage(image.id === selectedImage ? null : image.id)}
                >
                  <div className="aspect-square relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <img
                        src={image.path || "/placeholder.svg"}
                        alt={image.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-sm font-medium truncate">{image.name}</p>
                    <p className="text-xs text-gray-500">{image.size}</p>
                  </div>
                </div>
              ))}

              {filteredImages.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No images found</p>
                  <p>Try adjusting your search or upload a new image</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {selectedImage && (
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center">
              <p className="font-medium">{sampleImages.find((img) => img.id === selectedImage)?.name}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Path
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
