"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Loader2 } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChat } from "@ai-sdk/react";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Use the AI chat hook instead of local state
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, reload, error } = useChat({ api: "/api/gemini" ,  initialMessages: [
      {
        id: "initial-message",
        role: "assistant",
        content: "Hello! I'm your assistant at 1 Stop Pest Control. How can I help you today?"
      }
    ] });


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Dispatch an event whenever isOpen changes
    document.dispatchEvent(new CustomEvent("contactModalStateChange", { detail: { isOpen } }));
  }, [isOpen]);

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    document.addEventListener("toggleContactModal", handleToggle);
    return () => {
      document.removeEventListener("toggleContactModal", handleToggle);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
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
          {messages.length === 0 && (
            <div className="w-full mt-32 text-gray-500 items-center justify-center flex gap-3">
              No messages yet.
            </div>
          )}
          
          {messages.map((message, index) => (
            <div key={message.id || index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] p-3 rounded-xl shadow ${
                message.role === "user" 
                  ? "bg-pest-red text-white rounded-br-none" 
                  : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
              }`}>
                <div className="text-sm">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        return inline ? (
                          <code className="bg-gray-200 px-1 rounded text-gray-800">
                            {children}
                          </code>
                        ) : (
                          <pre className="bg-gray-200 p-2 rounded mt-2 overflow-x-auto">
                            <code className="text-gray-800">
                              {children}
                            </code>
                          </pre>
                        );
                      },
                      ul: ({ children }) => (
                        <ul className="list-disc pl-4 space-y-1 mt-2">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-4 space-y-1 mt-2">
                          {children}
                        </ol>
                      ),
                      p: ({ children }) => (
                        <p className="mb-2 last:mb-0">{children}</p>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-xl rounded-bl-none border border-gray-200 p-3 shadow">
                <div className="flex items-center gap-2 text-sm">
                   <span>...</span>
                </div>
              </div>
            </div>
          )}

          {/* Error handling */}
          {error && (
            <div className="flex justify-center">
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 text-sm">
                <div className="flex items-center gap-2">
                  <span>An error occurred.</span>
                  <button
                    className="underline hover:no-underline"
                    type="button"
                    onClick={() => reload()}
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Fixed Footer (Input Area) */}
        <div className="p-3 border-t flex-shrink-0 bg-white rounded-b-lg">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input 
              type="text" 
              value={input} 
              onChange={handleInputChange}
              placeholder="Type your message..." 
              className="flex-grow border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-pest-red focus:border-pest-red outline-none text-sm"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading} 
              className="bg-pest-red text-white p-2 rounded-lg hover:bg-pest-red/90 disabled:bg-gray-300 transition-colors"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
              <span className="sr-only">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}