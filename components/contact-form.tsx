"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // In a real implementation, this would be an API call to send the email
      // For now, we'll simulate a successful submission after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setSubmitStatus("success")
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Your Name <span className="text-pest-red">*</span>
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address <span className="text-pest-red">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number <span className="text-pest-red">*</span>
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full"
              placeholder="(518) 123-4567"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Subject <span className="text-pest-red">*</span>
          </label>
          <Select value={formData.subject} onValueChange={handleSelectChange} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General Inquiry">General Inquiry</SelectItem>
              <SelectItem value="Request a Quote">Request a Quote</SelectItem>
              <SelectItem value="Bed Bug Treatment">Bed Bug Treatment</SelectItem>
              <SelectItem value="Residential Service">Residential Service</SelectItem>
              <SelectItem value="Commercial Service">Commercial Service</SelectItem>
              <SelectItem value="Emergency Service">Emergency Service</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message <span className="text-pest-red">*</span>
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full min-h-[150px]"
            placeholder="Please describe your pest problem or inquiry..."
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-pest-red hover:bg-pest-red/90 text-white py-3">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      {submitStatus === "success" && (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your message has been sent successfully. We'll get back to you as soon as possible.
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was a problem sending your message. Please try again or contact us directly by phone.
          </AlertDescription>
        </Alert>
      )}
    </form>
  )
}
