import { useState, useEffect } from 'react'
import { extractTMDBResults } from '../utils'

export interface BackendStatus {
  isLoading: boolean
  isBackendDown: boolean
  retry: () => void
}

export function useBackendStatus(endpoint: string = '/movies/trending', strict: boolean = true): BackendStatus {
  const [isLoading, setIsLoading] = useState(true)
  const [isBackendDown, setIsBackendDown] = useState(false)

  const checkBackend = async () => {
    setIsLoading(true)
    setIsBackendDown(false)

    try {
      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      const results = extractTMDBResults(data)
      const hasValidData = Array.isArray(results) && results.length > 0

      if (strict && !hasValidData) {
        setIsBackendDown(true)
      } else if (!Array.isArray(results)) {
        setIsBackendDown(true)
      }
    } catch (error) {
      setIsBackendDown(true)
    } finally {
      setIsLoading(false)
    }
  }

  const retry = () => {
    checkBackend()
  }

  useEffect(() => {
    checkBackend()
  }, [endpoint])

  return {
    isLoading,
    isBackendDown,
    retry
  }
}