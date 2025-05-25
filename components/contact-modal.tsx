"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import Image from "next/image";
// import { Button } from "@/components/ui/button"; // Not used
// import Image from "next/image"; // Not used

// Interface for a single message
interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // This effect is to update the helper div, no longer needed.
    // const contactModalElement = document.getElementById("contact-modal-is-open");
    // if (contactModalElement) {
    //   contactModalElement.dataset.isOpen = isOpen.toString();
    // }
  }, [isOpen]);

  useEffect(() => {
    // Dispatch an event whenever isOpen changes
    document.dispatchEvent(new CustomEvent("contactModalStateChange", { detail: { isOpen } }));
  }, [isOpen]);

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prevIsOpen) => {
        const newIsOpen = !prevIsOpen;
        if (newIsOpen && messages.length === 0) {
          setMessages([
            {
              id: "welcome-" + Date.now(),
              text: "Hello! How can I help you today?",
              sender: "ai",
              timestamp: new Date(),
            },
          ]);
        }
        return newIsOpen;
      });
    };

    document.addEventListener("toggleContactModal", handleToggle);
    return () => {
      document.removeEventListener("toggleContactModal", handleToggle);
    };
  }, [messages.length]); // Depend on messages.length to correctly assess if welcome message is needed

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage: ChatMessage = {
      id: "user-" + Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: "ai-" + Date.now(),
        text: "Thanks for your message! An AI assistant will be with you shortly. For now, this is a simulated response.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }, 1000);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Optionally clear messages when closing:
    // setMessages([]);
    // setInputValue("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:justify-end justify-center pointer-events-none md:pr-2 pr-0 rtl:p-0">
      <div className="bg-white shadow-xl w-full md:max-w-sm h-[70vh] max-h-[550px] flex flex-col overflow-hidden pointer-events-auto mb-16 md:mb-20 mb-0 md:mr-0 mr-0 rtl:ml-0 rtl:mr-6 md:rtl:mr-6 md:rounded-lg rounded-t-lg">
        {/* Fixed Header */}
        <div className="flex items-center justify-between p-3 min-h-20 border-b flex-shrink-0 bg-gray-50 rounded-t-lg">
          <div className="flex items-center">
            <Image src="/images/logo-u661-1.png" alt="1 Stop Pest Control Logo" width={100} height={42} className="h-16 w-auto" />
          </div>
          <button onClick={handleClose} className="text-gray-500 hover:text-pest-red p-1 rounded-md hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        {/* Scrollable Message Area */}
        <div className="overflow-y-auto flex-grow p-4 space-y-3 bg-gray-100">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] p-3 rounded-xl shadow ${msg.sender === "user" ? "bg-pest-red text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none border border-gray-200"}`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-gray-200" : "text-gray-400"} text-right`}>{msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Fixed Footer (Input Area) */}
        <div className="p-3 border-t flex-shrink-0 flex items-center space-x-2 bg-white rounded-b-lg">
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} placeholder="Type your message..." className="flex-grow border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-pest-red focus:border-pest-red outline-none text-sm" />
          <button onClick={handleSendMessage} disabled={!inputValue.trim()} className="bg-pest-red text-white p-2 rounded-lg hover:bg-pest-red/90 disabled:bg-gray-300 transition-colors">
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
