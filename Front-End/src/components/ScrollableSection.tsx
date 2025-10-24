import React, { useRef, useEffect, useState } from 'react'
import { MediaItem } from '../types'
import { MediaCard } from './MediaCard'

interface ScrollableSectionProps {
  title: string
  items: MediaItem[]
  onSeeAll?: () => void
  onMoreDetails?: (item: MediaItem, path?: string) => void
}

export const ScrollableSection: React.FC<ScrollableSectionProps> = ({
  title,
  items,
  onSeeAll,
  onMoreDetails
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = useState({ atStart: true, atEnd: false })

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const checkScrollPosition = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setScrollState({
      atStart: scrollLeft <= 0,
      atEnd: scrollLeft + clientWidth >= scrollWidth - 1
    })
  }

  useEffect(() => {
    const ref = scrollRef.current
    if (ref) {
      ref.addEventListener('scroll', checkScrollPosition)
      checkScrollPosition()
    }
    return () => {
      if (ref) ref.removeEventListener('scroll', checkScrollPosition)
    }
  }, [items])

  if (items.length === 0) return null

  return (
    <section className="mb-5">
      <div className="section-title">
        <h4>{title}</h4>
        {onSeeAll && (
          <small onClick={onSeeAll} style={{ cursor: 'pointer' }}>
            See all →
          </small>
        )}
      </div>
      <div className="scroller-wrapper">
        {items.length > 0 && !scrollState.atStart && (
          <button className="scroll-btn left" onClick={() => scroll('left')}>‹</button>
        )}
        <div className="h-scroller" ref={scrollRef}>
          {items.map(item => (
            <MediaCard 
              key={item.id} 
              item={item}
              onMoreDetails={onMoreDetails}
            />
          ))}
        </div>
        {items.length > 0 && !scrollState.atEnd && (
          <button className="scroll-btn right" onClick={() => scroll('right')}>›</button>
        )}
      </div>
    </section>
  )
}
