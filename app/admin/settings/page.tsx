"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Check, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import ImageBrowser from "@/components/admin/image-browser"
import { siteConfig } from "@/config/site"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [settings, setSettings] = useState({
    name: siteConfig.name,
    description: siteConfig.description,
    phone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: siteConfig.contact.address,
    region: siteConfig.contact.region,
    facebook: siteConfig.links.facebook,
    instagram: siteConfig.links.instagram,
    twitter: siteConfig.links.twitter,
    logo: siteConfig.logo.main,
  })

  const handleFieldChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      [field]: value,
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus("idle")

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success
      setSaveStatus("success")
    } catch (error) {
      console.error("Save failed:", error)
      setSaveStatus("error")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Website Settings</h1>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic website information and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Website Name</label>
                <Input value={settings.name} onChange={(e) => handleFieldChange("name", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Website Description</label>
                <Textarea
                  value={settings.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-gray-500">
                  This description is used for SEO and appears in search engine results.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Logo</label>
                <div className="grid grid-cols-2 gap-4">
                  <ImageBrowser onSelect={(url) => handleFieldChange("logo", url)} currentImage={settings.logo} />

                  {settings.logo && (
                    <div className="relative h-20 w-auto rounded-md overflow-hidden border bg-white p-2">
                      <img
                        src={settings.logo || "/placeholder.svg"}
                        alt="Logo"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Check className="h-4 w-4 mr-1" />}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update your business contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input value={settings.phone} onChange={(e) => handleFieldChange("phone", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input value={settings.email} onChange={(e) => handleFieldChange("email", e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Business Address</label>
                <Input value={settings.address} onChange={(e) => handleFieldChange("address", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Service Region</label>
                <Input value={settings.region} onChange={(e) => handleFieldChange("region", e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Check className="h-4 w-4 mr-1" />}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Update your social media links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Facebook URL</label>
                <Input value={settings.facebook} onChange={(e) => handleFieldChange("facebook", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Instagram URL</label>
                <Input value={settings.instagram} onChange={(e) => handleFieldChange("instagram", e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Twitter URL</label>
                <Input value={settings.twitter} onChange={(e) => handleFieldChange("twitter", e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Check className="h-4 w-4 mr-1" />}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {saveStatus === "success" && (
        <Alert variant="default" className="mt-6 bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Settings saved successfully.</AlertDescription>
        </Alert>
      )}

      {saveStatus === "error" && (
        <Alert variant="destructive" className="mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to save settings. Please try again.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
