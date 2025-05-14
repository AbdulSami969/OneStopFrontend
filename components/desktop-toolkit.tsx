"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, MessageSquare, Mail, CalendarCheck, MessageCircle, X } from "lucide-react"

export default function DesktopToolkit() {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleContactModal = () => {
    document.dispatchEvent(new CustomEvent("toggleContactModal"))
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:block">
      {isExpanded ? (
        <div className="bg-pest-red rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors"
              aria-label="Close toolkit"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-5 divide-x divide-red-700">
              <Link href="/book" className="toolkit-button py-4 px-6 hover:bg-pest-red/80 transition-colors">
                <CalendarCheck className="h-6 w-6 mb-1" />
                Book
              </Link>
              <Link href="/text" className="toolkit-button py-4 px-6 hover:bg-pest-red/80 transition-colors">
                <MessageSquare className="h-6 w-6 mb-1" />
                Text
              </Link>
              <Link href="tel:5187285589" className="toolkit-button py-4 px-6 hover:bg-pest-red/80 transition-colors">
                <Phone className="h-6 w-6 mb-1" />
                Call
              </Link>
              <Link
                href="mailto:info@1stoppestcontrolllc.com"
                className="toolkit-button py-4 px-6 hover:bg-pest-red/80 transition-colors"
              >
                <Mail className="h-6 w-6 mb-1" />
                Email
              </Link>
              <button
                onClick={toggleContactModal}
                className="toolkit-button py-4 px-6 hover:bg-pest-red/80 transition-colors"
              >
                <MessageCircle className="h-6 w-6 mb-1" />
                Chat
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-pest-red text-white p-4 rounded-full shadow-lg hover:bg-pest-red/90 transition-all flex items-center justify-center"
          aria-label="Contact options"
        >
          <MessageCircle className="h-7 w-7" />
        </button>
      )}
    </div>
  )
}
