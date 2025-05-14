"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, MessageSquare, Mail, CalendarCheck, MessageCircle, MapPin } from "lucide-react"

export default function MobileToolkit() {
  const [showContactModal, setShowContactModal] = useState(false)

  const toggleContactModal = () => {
    // This would be connected to a global state or context in a real implementation
    document.dispatchEvent(new CustomEvent("toggleContactModal"))
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="grid grid-cols-6 bg-pest-red text-white">
        <Link href="/book" className="toolkit-button py-2 border-r border-red-700">
          <CalendarCheck className="h-5 w-5 mb-1" />
          <span className="text-xs">Book</span>
        </Link>
        <Link href="/text" className="toolkit-button py-2 border-r border-red-700">
          <MessageSquare className="h-5 w-5 mb-1" />
          <span className="text-xs">Text</span>
        </Link>
        <Link href="tel:5187285589" className="toolkit-button py-2 border-r border-red-700">
          <Phone className="h-5 w-5 mb-1" />
          <span className="text-xs">Call</span>
        </Link>
        <Link href="mailto:info@1stoppestcontrolllc.com" className="toolkit-button py-2 border-r border-red-700">
          <Mail className="h-5 w-5 mb-1" />
          <span className="text-xs">Email</span>
        </Link>
        <Link href="/service-areas" className="toolkit-button py-2 border-r border-red-700">
          <MapPin className="h-5 w-5 mb-1" />
          <span className="text-xs">Areas</span>
        </Link>
        <button onClick={toggleContactModal} className="toolkit-button py-2">
          <MessageCircle className="h-5 w-5 mb-1" />
          <span className="text-xs">Chat</span>
        </button>
      </div>
    </div>
  )
}
