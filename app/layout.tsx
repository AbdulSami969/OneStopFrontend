import type React from "react"
import type { Metadata } from "next"
import { Inter, Oswald } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileToolkit from "@/components/mobile-toolkit"
import ContactModal from "@/components/contact-modal"
import { ThemeProvider } from "@/components/theme-provider"
import DesktopToolkit from "@/components/desktop-toolkit"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" })

export const metadata: Metadata = {
  title: "1 Stop Pest Control LLC | Albany Capital Region",
  description:
    "Premier pest control service in Albany Capital Region. Specializing in heat treatment for bedbugs and offering both residential and commercial pest control services.",
  keywords:
    "pest control, Albany, bed bugs, heat treatment, residential pest control, commercial pest control, exterminator",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ResizeObserver Polyfill and Error Suppression */}
        <Script id="resize-observer-fix" strategy="beforeInteractive">
          {`
            (function() {
              // Comprehensive ResizeObserver error handling
              window.addEventListener('error', function(e) {
                if (e && e.message && (
                    e.message.includes('ResizeObserver loop') || 
                    e.message.includes('ResizeObserver loop completed with undelivered notifications')
                  )) {
                  e.stopImmediatePropagation();
                  e.preventDefault();
                  return true;
                }
              }, true);
              
              // Patch console.error to filter out ResizeObserver errors
              const originalConsoleError = console.error;
              console.error = function() {
                if (arguments[0] && 
                    typeof arguments[0] === 'string' && 
                    (arguments[0].includes('ResizeObserver loop') || 
                     arguments[0].includes('ResizeObserver loop completed with undelivered notifications'))) {
                  return;
                }
                originalConsoleError.apply(console, arguments);
              };

              // Patch ResizeObserver to be more resilient
              if (typeof window !== 'undefined' && window.ResizeObserver) {
                const OriginalResizeObserver = window.ResizeObserver;
                window.ResizeObserver = function(callback) {
                  return new OriginalResizeObserver(function() {
                    try {
                      callback.apply(this, arguments);
                    } catch (e) {
                      if (e && e.message && !e.message.includes('ResizeObserver loop')) {
                        throw e;
                      }
                    }
                  });
                };
              }
            })();
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${oswald.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <MobileToolkit />
            <DesktopToolkit />
            <ContactModal />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
