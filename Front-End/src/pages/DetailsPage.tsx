import React from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { MediaItem } from '../types'
import { getImageUrl, formatRating } from '../utils'
import { TMDB_IMAGE_BASE_URL } from '../constants'

export default function DetailsPage() {
  const { itemId } = useParams<{ itemId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const [item, setItem] = React.useState<MediaItem | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

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
        console.error('Error fetching details:', err)
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
          <h2>Item not found</h2>
          <p>Unable to load the full details for this item.</p>
        </div>
      </div>
    )
  }

  const title = item.title || item.name || 'Untitled'
  const posterUrl = getImageUrl(item.poster_path, 'POSTER')
  const backdropUrl = item.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/original${item.backdrop_path}` : posterUrl

  // Get genres from genres array (detail view)
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
              {(item.release_date || item.first_air_date) && (
                <span>
                  {new Date(item.release_date || item.first_air_date!).getFullYear()}
                </span>
              )}
              {item.adult && (
                <span className="badge bg-danger" style={{ padding: '5px 10px' }}>
                  18+
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

            {/* Runtime & Status */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', fontSize: '0.95rem', color: '#ccc', flexWrap: 'wrap' }}>
              {item.runtime && (
                <span>⏱️ {item.runtime} min</span>
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

            {/* Additional Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              {item.budget && item.budget > 0 && (
                <div>
                  <h5 style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '5px' }}>Budget</h5>
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>
                    ${(item.budget / 1000000).toFixed(1)}M
                  </p>
                </div>
              )}
              {item.revenue && item.revenue > 0 && (
                <div>
                  <h5 style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '5px' }}>Revenue</h5>
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>
                    ${(item.revenue / 1000000).toFixed(1)}M
                  </p>
                </div>
              )}
              {item.popularity && (
                <div>
                  <h5 style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '5px' }}>Popularity</h5>
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {item.popularity.toFixed(0)}
                  </p>
                </div>
              )}
              {item.vote_count && (
                <div>
                  <h5 style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '5px' }}>Vote Count</h5>
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {item.vote_count?.toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '30px', marginBottom: '30px', flexWrap: 'wrap' }}>
              <button className="btn btn-light" style={{ padding: '10px 30px', fontSize: '1rem', fontWeight: 'bold' }}>
                ▶ Play
              </button>
              <button className="btn btn-outline-light" style={{ padding: '10px 30px', fontSize: '1rem' }}>
                + Add to List
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
    </div>
  )
}
