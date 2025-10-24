import React, { useState } from 'react'
import { MediaItem } from '../types'
import { getImageUrl, formatRating } from '../utils'
import { GENRE_MAP } from '../constants'

interface ExpandedCardModalProps {
  item: MediaItem
  onClose: () => void
  onMoreDetails: (item: MediaItem, detailsPath: string) => void
}

export const ExpandedCardModal: React.FC<ExpandedCardModalProps> = ({ item, onClose, onMoreDetails }) => {
  const [isExpandedDescription, setIsExpandedDescription] = useState(false)
  const title = item.title || item.name || 'Untitled'
  const year = item.release_date || item.first_air_date
  const posterUrl = getImageUrl(item.poster_path, 'POSTER')

  // Determine if it's a movie or TV show based on which date exists
  const isTV = !item.title || (item.first_air_date && !item.release_date)

  // Get genre names from genre_ids
  const genreNames = item.genre_ids?.slice(0, 3).map(id => GENRE_MAP[id as keyof typeof GENRE_MAP]).filter(Boolean) || []

  const handleMoreDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    const detailsPath = isTV ? `/tv-details/${item.id}` : `/movie-details/${item.id}`
    onMoreDetails(item, detailsPath)
  }

  // Check if description is long (more than 150 characters)
  const isLongDescription = (item.overview?.length || 0) > 150
  const displayedOverview = isExpandedDescription ? item.overview : item.overview?.substring(0, 150)

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 999,
          backdropFilter: 'blur(4px)'
        }}
      />

      {/* Modal Card */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          maxWidth: '90%',
          width: '600px',
          maxHeight: '80vh',
          backgroundColor: '#1f1f1f',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)',
          border: '1px solid #333'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: 'none',
            color: '#fff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)')}
        >
          ✕
        </button>

        {/* Content Container */}
        <div style={{ display: 'flex', height: '100%', maxHeight: '80vh' }}>
          {/* Poster Image */}
          <div style={{ flex: '0 0 35%', overflow: 'hidden' }}>
            <img
              src={posterUrl}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/placeholder.jpg'
              }}
            />
          </div>

          {/* Details Section */}
          <div style={{ flex: '1', padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {/* Adult Badge */}
            {item.adult && (
              <div style={{
                display: 'inline-block',
                backgroundColor: '#dc3545',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                marginBottom: '12px',
                width: 'fit-content'
              }}>
                18+
              </div>
            )}

            {/* Title */}
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>
              {title}
            </h3>

            {/* Meta Info */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '0.9rem', color: '#aaa', alignItems: 'center', flexWrap: 'wrap' }}>
              {year && <span>{new Date(year).getFullYear()}</span>}
              {item.vote_average && (
                <span style={{ color: '#ffd700', fontWeight: 'bold' }}>
                  ★ {formatRating(item.vote_average)}
                </span>
              )}
            </div>

            {/* Genres */}
            {genreNames.length > 0 && (
              <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {genreNames.map((genre, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: '#0d6efd',
                      color: '#fff',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}
            <div style={{ height: '1px', backgroundColor: '#444', marginBottom: '16px' }} />

            {/* Overview */}
            {item.overview && (
              <div style={{ marginBottom: '20px', flex: 1 }}>
                <h5 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', fontWeight: 'bold', color: '#ccc' }}>
                  Overview
                </h5>
                <p style={{
                  margin: 0,
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  color: '#aaa'
                }}>
                  {displayedOverview}
                  {isLongDescription && !isExpandedDescription && '...'}
                </p>
                
                {/* Read More / Read Less */}
                {isLongDescription && (
                  <button
                    onClick={() => setIsExpandedDescription(!isExpandedDescription)}
                    style={{
                      marginTop: '8px',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#0d6efd',
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#0b5ed7')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#0d6efd')}
                  >
                    {isExpandedDescription ? '▼ Read Less' : '▶ Read More'}
                  </button>
                )}
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
              <button
                onClick={handleMoreDetails}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  backgroundColor: '#0d6efd',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0b5ed7')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0d6efd')}
              >
                More Details
              </button>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  backgroundColor: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5c636a')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#6c757d')}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
