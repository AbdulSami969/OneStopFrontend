"use client"

import { useState, useEffect } from "react"
import { X, MessageSquare, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev)
    document.addEventListener("toggleContactModal", handleToggle)

    return () => {
      document.removeEventListener("toggleContactModal", handleToggle)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto overflow-hidden">
        <div className="relative p-6">
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </button>

          <div className="mb-6">
            <Image
              src="/images/1stop-logo.png"
              alt="1 Stop Pest Control LLC"
              width={150}
              height={60}
              className="mx-auto h-14 w-auto"
            />
          </div>

          <h2 className="text-3xl font-bold text-center mb-8">How can we help?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild variant="default" size="lg" className="h-auto py-8 bg-pest-red hover:bg-pest-red/90">
              <a href="/book" className="flex flex-col items-center">
                <Calendar className="h-10 w-10 mb-2" />
                <span className="text-lg font-medium">Schedule an Appointment</span>
              </a>
            </Button>

            <div className="flex flex-col gap-4">
              <Button asChild variant="default" size="lg" className="h-auto py-4 bg-pest-red hover:bg-pest-red/90">
                <a href="/text" className="flex items-center justify-center gap-2">
                  <MessageSquare className="h-6 w-6" />
                  <span>Text with Us</span>
                </a>
              </Button>

              <Button asChild variant="default" size="lg" className="h-auto py-4 bg-pest-red hover:bg-pest-red/90">
                <a href="tel:5187285589" className="flex items-center justify-center gap-2">
                  <Phone className="h-6 w-6" />
                  <span>Call Me</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Chat with 1 Stop Pest Control</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Chat with us—just start typing."
                className="w-full border border-gray-300 rounded-full py-3 px-4 pr-12"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pest-red">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
