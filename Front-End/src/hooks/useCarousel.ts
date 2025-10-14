import { useState, useEffect, useRef } from 'react'
import { THEME } from '../constants'

interface UseCarouselReturn {
  currentIndex: number
  paused: boolean
  prev: () => void
  next: () => void
  goToSlide: (index: number) => void
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  handleTouchStart: (e: React.TouchEvent) => void
  handleTouchMove: (e: React.TouchEvent) => void
}

export const useCarousel = (itemCount: number): UseCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchRef = useRef<{ startX: number | null }>({ startX: null })

  useEffect(() => {
    if (itemCount > 0 && currentIndex >= itemCount) {
      setCurrentIndex(0)
    }
  }, [itemCount, currentIndex])

  useEffect(() => {
    if (paused || itemCount === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex(i => (i + 1) % itemCount)
    }, THEME.CAROUSEL.AUTO_ROTATE_INTERVAL)

    return () => clearInterval(interval)
  }, [paused, itemCount])

  const prev = () => {
    if (itemCount) setCurrentIndex(i => (i - 1 + itemCount) % itemCount)
  }

  const next = () => {
    if (itemCount) setCurrentIndex(i => (i + 1) % itemCount)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const handleMouseEnter = () => setPaused(true)
  const handleMouseLeave = () => setPaused(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current = { startX: e.touches[0].clientX }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchRef.current || touchRef.current.startX === null) return
    const dx = e.touches[0].clientX - touchRef.current.startX
    if (Math.abs(dx) > 50) {
      if (dx > 0) prev()
      else next()
      touchRef.current.startX = null
    }
  }

  return {
    currentIndex,
    paused,
    prev,
    next,
    goToSlide,
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove
  }
}
