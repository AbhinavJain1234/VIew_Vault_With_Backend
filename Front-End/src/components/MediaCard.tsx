import React from 'react'
import { MediaItem } from '../types'
import { getImageUrl, getYear, formatRating } from '../utils'

interface MediaCardProps {
  item: MediaItem
  onClick?: () => void
}

export const MediaCard: React.FC<MediaCardProps> = ({ item, onClick }) => {
  const title = item.title || item.name || 'Untitled'
  const year = getYear(item.release_date || item.first_air_date)
  const posterUrl = getImageUrl(item.poster_path, 'POSTER')

  return (
    <div className="card movie-card" onClick={onClick}>
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
  )
}
