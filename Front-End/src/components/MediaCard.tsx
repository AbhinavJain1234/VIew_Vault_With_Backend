import React, { useState } from 'react'
import { MediaItem } from '../types'
import { getImageUrl, getYear, formatRating } from '../utils'
import { ExpandedCardModal } from './ExpandedCardModal'

interface MediaCardProps {
  item: MediaItem
  onClick?: () => void
  onMoreDetails?: (item: MediaItem, path: string) => void
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onClick, onMoreDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const title = item.title || item.name || 'Untitled'
  const year = getYear(item.release_date || item.first_air_date)
  const posterUrl = getImageUrl(item.poster_path, 'POSTER')

  const handleCardClick = () => {
    setIsExpanded(true)
    onClick?.()
  }

  const handleMoreDetails = (selectedItem: MediaItem, path: string) => {
    setIsExpanded(false)
    onMoreDetails?.(selectedItem, path)
  }

  return (
    <>
      <div 
        className="card movie-card" 
        onClick={handleCardClick}
        style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {item.adult && <div className="adult-badge">18+</div>}
        <img 
          src={posterUrl} 
          alt={title}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/placeholder.jpg'
          }}
        />
        <div className="card-body">
          <h6>{title}</h6>
          <small>
            {year && <span>{year}</span>}
            {item.vote_average && <span className="rating">{formatRating(item.vote_average)}</span>}
          </small>
        </div>
      </div>

      {isExpanded && (
        <ExpandedCardModal
          item={item}
          onClose={() => setIsExpanded(false)}
          onMoreDetails={handleMoreDetails}
        />
      )}
    </>
  )
}
