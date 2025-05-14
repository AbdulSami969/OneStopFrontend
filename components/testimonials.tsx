"use client"

import { useEffect, useState, useRef } from "react"
import Script from "next/script"

export default function Testimonials() {
  const [isClient, setIsClient] = useState(false)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isWidgetInitialized, setIsWidgetInitialized] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const attemptCountRef = useRef(0)

  // Handle script loading
  const handleScriptLoad = () => {
    setIsScriptLoaded(true)
  }

  useEffect(() => {
    setIsClient(true)

    // Add ResizeObserver error handler
    const originalError = window.console.error
    window.console.error = (...args) => {
      if (typeof args[0] === "string" && args[0].includes("ResizeObserver") && args[0].includes("loop")) {
        // Ignore ResizeObserver loop errors
        return
      }
      originalError(...args)
    }

    // Delay the initialization of Elfsight widget
    const timer = setTimeout(() => {
      if (window.elfsight && isScriptLoaded && !isWidgetInitialized && attemptCountRef.current < 3) {
        try {
          attemptCountRef.current += 1
          window.elfsight.reinstateWidgets()
          setIsWidgetInitialized(true)
        } catch (e) {
          console.log("Error initializing Elfsight widget:", e)
        }
      }
    }, 2000)

    return () => {
      clearTimeout(timer)
      window.console.error = originalError
    }
  }, [isScriptLoaded, isWidgetInitialized])

  return (
    <section className="py-10 md:py-16 bg-gray-light">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-6">What Our Customers Say</h2>

        {/* Static container with fixed height to prevent layout shifts */}
        <div
          ref={containerRef}
          className="relative bg-white rounded-lg shadow-sm overflow-hidden"
          style={{ height: "400px" }}
        >
          {/* Only render the widget on the client side */}
          {isClient && (
            <>
              <Script
                src="https://static.elfsight.com/platform/platform.js"
                strategy="lazyOnload"
                onLoad={handleScriptLoad}
              />
              <div
                className="elfsight-app-59405e19-4919-4b2a-aa14-8a6b0462bb45"
                data-elfsight-app-lazy
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </>
          )}

          {/* Fallback content while loading */}
          {(!isClient || !isScriptLoaded || !isWidgetInitialized) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-full max-w-md">
                <div className="flex justify-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-lg mb-4">
                  "1 Stop Pest Control provided excellent service! They were prompt, professional, and completely
                  eliminated our pest problem. Highly recommended for anyone in the Albany area."
                </p>
                <p className="font-medium">- Sarah M., Albany</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
