import React from 'react'
import { MediaItem } from '../types'
import { getImageUrl, getYear, formatRating } from '../utils'

interface HeroCarouselProps {
  items: MediaItem[]
  currentIndex: number
  onPrev: () => void
  onNext: () => void
  onDotClick: (index: number) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onTouchStart?: (e: React.TouchEvent) => void
  onTouchMove?: (e: React.TouchEvent) => void
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  items,
  currentIndex,
  onPrev,
  onNext,
  onDotClick,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchMove
}) => {
  if (items.length === 0) return null

  return (
    <section 
      className="mb-5 position-relative" 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      <div className="movie-slider">
        {items.map((item, index) => {
          const title = item.title || item.name || 'Untitled'
          const year = getYear(item.release_date || item.first_air_date)
          const backdropUrl = getImageUrl(item.backdrop_path, 'BACKDROP')

          return (
            <div 
              key={item.id} 
              className={`movie-slide ${index === currentIndex ? 'active' : ''}`}
              aria-hidden={index === currentIndex ? 'false' : 'true'}
            >
              <img src={backdropUrl} alt={title} />
              <div className="hero-content">
                <h1 className="hero-title">{title}</h1>
                <div className="hero-meta">
                  {year && <span>{year}</span>}
                  {item.vote_average && <span className="rating">{formatRating(item.vote_average)}</span>}
                  {item.adult && <span className="badge bg-danger">18+</span>}
                </div>
                {item.overview && <p className="hero-overview">{item.overview}</p>}
                <div className="hero-buttons">
                  <button className="btn btn-light">▶ Play</button>
                  <button className="btn btn-secondary">ℹ More Info</button>
                </div>
              </div>
            </div>
          )
        })}

        <div className="carousel-controls d-flex align-items-center justify-content-between px-3">
          <button className="btn" onClick={onPrev} aria-label="Previous">❮</button>
          <div className="carousel-indicators">
            {items.map((_, index) => (
              <button
                key={index}
                className={index === currentIndex ? 'active' : ''}
                onClick={() => onDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button className="btn" onClick={onNext} aria-label="Next">❯</button>
        </div>
      </div>
    </section>
  )
}
