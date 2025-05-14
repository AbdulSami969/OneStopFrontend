"use client"

import { useState, useCallback } from "react"

export function useErrorBoundary() {
  const [hasError, setHasError] = useState(false)

  const handleError = useCallback((error: Error) => {
    console.error("Error caught by error boundary:", error)
    setHasError(true)
  }, [])

  return { hasError, handleError }
}
