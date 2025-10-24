import React from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { MediaItem } from '../types'
import { getImageUrl, formatRating } from '../utils'
import { TMDB_IMAGE_BASE_URL } from '../constants'

export default function MovieDetailsPage() {
  const { itemId } = useParams<{ itemId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const [item, setItem] = React.useState<MediaItem | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  
  // Use URL search params to persist player state
  const searchParams = new URLSearchParams(location.search)
  const defaultShowPlayer = searchParams.get('play') === 'true'
  const [showPlayer, setShowPlayer] = React.useState(defaultShowPlayer)

  // Update URL when player state changes
  const togglePlayer = (show: boolean) => {
    const newSearchParams = new URLSearchParams(location.search)
    if (show) {
      newSearchParams.set('play', 'true')
    } else {
      newSearchParams.delete('play')
    }
    navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true })
    setShowPlayer(show)
  }

  React.useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true)
      setError(false)
      try {
        // First try to get from location state
        const state = location.state as { item?: MediaItem } | null
        if (state?.item) {
          // If we have basic item, fetch full details
          const response = await fetch(`/movies/${state.item.id}`)
          if (response.ok) {
            const fullDetails = await response.json()
            setItem(fullDetails)
          } else {
            // Fall back to passed item
            setItem(state.item)
          }
          setLoading(false)
        } else {
          // No state, try fetching by ID
          if (itemId) {
            const response = await fetch(`/movies/${itemId}`)
            if (response.ok) {
              const data = await response.json()
              setItem(data)
            } else {
              setError(true)
            }
          } else {
            setError(true)
          }
          setLoading(false)
        }
      } catch (err) {
        console.error('Error fetching movie details:', err)
        setError(true)
        setLoading(false)
      }
    }

    fetchDetails()
  }, [itemId, location])

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#141414' }}>
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div style={{ backgroundColor: '#141414', minHeight: '100vh', color: '#fff', padding: '40px 20px' }}>
        <button
          className="btn btn-link text-white mb-3 p-0"
          onClick={() => navigate(-1)}
          style={{ textDecoration: 'none' }}
        >
          ← Go Back
        </button>
        <div className="text-center py-5">
          <h2>Movie not found</h2>
          <p>Unable to load the movie details.</p>
        </div>
      </div>
    )
  }

  const title = item.title || 'Untitled'
  const posterUrl = getImageUrl(item.poster_path, 'POSTER')
  const backdropUrl = item.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/original${item.backdrop_path}` : posterUrl

  // Get genres from genres array
  const genreList = item.genres?.map(g => g.name) || []

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh', color: '#fff' }}>
      {/* Backdrop */}
      <div
        style={{
          position: 'relative',
          height: '400px',
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '20px'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(20,20,20,0) 0%, rgba(20,20,20,0.5) 50%, rgba(20,20,20,1) 100%)'
        }} />
        
        <button
          className="btn btn-link text-white"
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: '20px', left: '20px', textDecoration: 'none', fontSize: '20px' }}
        >
          ←
        </button>
      </div>

      <div className="container-fluid px-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="row" style={{ marginTop: '-100px', position: 'relative', zIndex: 10 }}>
          {/* Poster */}
          <div className="col-12 col-md-3 mb-4">
            <img
              src={posterUrl}
              alt={title}
              style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                objectFit: 'cover'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/placeholder.jpg'
              }}
            />
          </div>

          {/* Details */}
          <div className="col-12 col-md-9">
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
              {title}
            </h1>

            <div className="mb-3" style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
              {item.vote_average && (
                <span style={{ fontSize: '1.1rem' }}>
                  ★ {formatRating(item.vote_average)}
                </span>
              )}
              {item.release_date && (
                <span>
                  {new Date(item.release_date).getFullYear()}
                </span>
              )}
              {item.adult && (
                <span style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  18+ ADULT
                </span>
              )}
            </div>

            {/* Genres */}
            {genreList.length > 0 && (
              <div style={{ marginBottom: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {genreList.map((genre, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: '#0d6efd',
                      color: '#fff',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '500'
                    }}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Movie Specific Info */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', fontSize: '0.95rem', color: '#ccc', flexWrap: 'wrap' }}>
              {item.runtime && (
                <span>⏱️ {item.runtime} min</span>
              )}
              {item.release_date && (
                <span>📅 {new Date(item.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              )}
              {item.status && (
                <span>📊 {item.status}</span>
              )}
              {item.original_language && (
                <span>🌐 {item.original_language.toUpperCase()}</span>
              )}
            </div>

            {/* Overview */}
            {item.overview && (
              <div className="mb-4">
                <h3 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>Overview</h3>
                <p style={{ lineHeight: '1.6', color: '#ccc', fontSize: '1rem' }}>
                  {item.overview}
                </p>
              </div>
            )}

            {/* Tagline */}
            {item.tagline && (
              <div style={{
                backgroundColor: '#2a2a2a',
                padding: '15px',
                borderLeft: '3px solid #0d6efd',
                marginBottom: '20px',
                borderRadius: '4px',
                fontStyle: 'italic',
                color: '#aaa'
              }}>
                "{item.tagline}"
              </div>
            )}

            {/* Homepage Link */}
            {item.homepage && (
              <div style={{ marginBottom: '20px' }}>
                <a
                  href={item.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#0d6efd',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0b5ed7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0d6efd')}
                >
                  🌐 Visit Official Website
                </a>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '30px', marginBottom: '30px', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-light" 
                onClick={() => togglePlayer(true)}
                style={{ padding: '10px 30px', fontSize: '1rem', fontWeight: 'bold' }}
              >
                ▶ Play
              </button>
              <button className="btn btn-outline-light" style={{ padding: '10px 30px', fontSize: '1rem' }}>
                + Add to Watchlist
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
                style={{ padding: '10px 30px', fontSize: '1rem' }}
              >
                ← Go Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {showPlayer && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={(e) => {
            e.stopPropagation()
            togglePlayer(false)
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100vw',
              height: '100vh'
            }}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                togglePlayer(false)
              }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '2.5rem',
                cursor: 'pointer',
                padding: '0',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000
              }}
            >
              ✕
            </button>

            {/* Iframe Embed */}
            <iframe
              src={`https://www.2embed.cc/embed/${item?.id}`}
            //   src={`https://multiembed.mov/?video_id=${item?.id}&tmdb=1`}
            //   sandbox="allow-scripts allow-same-origin "
              width="100%" 
              height="100%" 
              style={{ borderRadius: '8px' }}
              allowFullScreen
              frameBorder="0"
            />
          </div>
        </div>
      )}
    </div>
  )
}
