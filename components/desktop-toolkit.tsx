"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageSquare, Mail, CalendarCheck, MessageCircle } from "lucide-react";
import BookingModal from "./BookingModal";

// Custom Whatsapp Icon
const WhatsappIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

export default function DesktopToolkit() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  useEffect(() => {
    const handleChatModalStateChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail.isOpen === "boolean") {
        setIsChatModalOpen(customEvent.detail.isOpen);
      }
    };
    document.addEventListener("contactModalStateChange", handleChatModalStateChange);
    return () => {
      document.removeEventListener("contactModalStateChange", handleChatModalStateChange);
    };
  }, []);

  const handleOpenChat = () => {
    document.dispatchEvent(new CustomEvent("toggleContactModal"));
    if (isBookingModalOpen) {
      setIsBookingModalOpen(false);
    }
  };

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
    if (isChatModalOpen) {
      document.dispatchEvent(new CustomEvent("toggleContactModal", { detail: false }));
    }
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  // User has modified the layout to be fixed at bottom-0 and rounded-t-lg
  return (
    <>
      <div className="fixed bottom-0 right-2 z-50 hidden md:flex items-center rtl:space-x-reverse">
        <div className="bg-pest-red rounded-t-lg shadow-lg overflow-hidden flex items-center">
          <div className="flex divide-x divide-red-700">
            <button onClick={handleOpenBooking} className={`toolkit-item ${isBookingModalOpen ? "bg-red-700" : "hover:bg-red-700/80"}`}>
              <CalendarCheck className="h-6 w-6 mb-0.5" />
              <span className="text-xs pt-1">Book</span>
            </button>
            <Link href="https://wa.me/15187285589" target="_blank" rel="noopener noreferrer" className="toolkit-item hover:bg-red-700/80">
              <WhatsappIcon />
              <span className="text-xs pt-1">WA</span>
            </Link>
            <Link href="tel:5187285589" className="toolkit-item hover:bg-red-700/80">
              <Phone className="h-6 w-6 mb-0.5" />
              <span className="text-xs pt-1">Call</span>
            </Link>
            <Link href="mailto:info@1stoppestcontrolllc.com" className="toolkit-item hover:bg-red-700/80">
              <Mail className="h-6 w-6 mb-0.5" />
              <span className="text-xs pt-1">Email</span>
            </Link>
            <button onClick={handleOpenChat} className={`toolkit-item ${isChatModalOpen ? "bg-red-700" : "hover:bg-red-700/80"}`}>
              <MessageCircle className="h-5 w-6 mb-0.5" />
              <span className="text-xs pt-1">Chat</span>
            </button>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />

      <style jsx global>{`
        .toolkit-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.8rem 1rem;
          color: white;
          font-size: 0.75rem;
          line-height: 1rem;
          transition: background-color 0.15s ease-in-out;
        }
        .toolkit-item svg {
          margin-bottom: 0.125rem;
          height: 1.5rem;
          width: 2.75rem;
        }
        .toolkit-item button > svg.lucide-message-circle {
          height: 1.5rem;
          width: 5.5rem;
        }
      `}</style>
    </>
  );
}
