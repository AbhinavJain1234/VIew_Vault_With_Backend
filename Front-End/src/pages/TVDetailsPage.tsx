import React from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { MediaItem } from '../types'
import { getImageUrl, formatRating } from '../utils'
import { TMDB_IMAGE_BASE_URL } from '../constants'

interface Season {
  id: number
  name: string
  season_number: number
  episode_count: number
  air_date?: string
  poster_path?: string
}

interface TVDetail extends MediaItem {
  seasons?: Season[]
  networks?: Array<{ id: number; name: string; logo_path?: string }>
  number_of_seasons?: number
  number_of_episodes?: number
  created_by?: Array<{ id: number; name: string }>
}

export default function TVDetailsPage() {
  const { itemId } = useParams<{ itemId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const [item, setItem] = React.useState<TVDetail | null>(null)
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
          const response = await fetch(`/tv/${state.item.id}`)
          if (response.ok) {
            const fullDetails = await response.json()
            setItem(fullDetails)
          } else {
            // Fall back to passed item
            setItem(state.item as TVDetail)
          }
          setLoading(false)
        } else {
          // No state, try fetching by ID
          if (itemId) {
            const response = await fetch(`/tv/${itemId}`)
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
        console.error('Error fetching TV details:', err)
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
          <h2>TV Show not found</h2>
          <p>Unable to load the TV show details.</p>
        </div>
      </div>
    )
  }

  const title = item.name || 'Untitled'
  const posterUrl = getImageUrl(item.poster_path, 'POSTER')
  const backdropUrl = item.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/original${item.backdrop_path}` : posterUrl

  // Get genres from genres array
  const genreList = item.genres?.map(g => g.name) || []
  const seasons = item.seasons || []
  const networks = item.networks || []

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
              {item.first_air_date && (
                <span>
                  {new Date(item.first_air_date).getFullYear()}
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

            {/* TV Specific Info */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', fontSize: '0.95rem', color: '#ccc', flexWrap: 'wrap' }}>
              {item.number_of_seasons && (
                <span>🎬 {item.number_of_seasons} Season{item.number_of_seasons > 1 ? 's' : ''}</span>
              )}
              {item.number_of_episodes && (
                <span>📺 {item.number_of_episodes} Episodes</span>
              )}
              {item.status && (
                <span>📊 {item.status}</span>
              )}
              {item.original_language && (
                <span>🌐 {item.original_language.toUpperCase()}</span>
              )}
            </div>

            {/* Networks */}
            {networks.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '10px', color: '#ccc' }}>Networks</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {networks.map((network) => (
                    <div
                      key={network.id}
                      style={{
                        backgroundColor: '#2a2a2a',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '0.9rem'
                      }}
                    >
                      {network.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

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

            {/* Official Website */}
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
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0a58ca')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0d6efd')}
                >
                  🌐 Visit Official Website
                </a>
              </div>
            )}

            {/* Seasons */}
            {seasons.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Seasons</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
                  {seasons.slice(0, 6).map((season) => (
                    <div
                      key={season.id}
                      onClick={() => navigate(`/tv/${item.id}/season/${season.season_number}`)}
                      style={{
                        backgroundColor: '#2a2a2a',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        border: '1px solid #444'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      {season.poster_path && (
                        <img
                          src={getImageUrl(season.poster_path, 'POSTER')}
                          alt={season.name}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/placeholder.jpg'
                          }}
                        />
                      )}
                      <div style={{ padding: '12px' }}>
                        <h5 style={{ margin: '0 0 8px 0', fontSize: '0.95rem', fontWeight: 'bold' }}>
                          {season.name}
                        </h5>
                        <p style={{ margin: '0', fontSize: '0.85rem', color: '#aaa' }}>
                          {season.episode_count} episode{season.episode_count > 1 ? 's' : ''}
                        </p>
                        {season.air_date && (
                          <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#666' }}>
                            {new Date(season.air_date).getFullYear()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '30px', marginBottom: '30px', flexWrap: 'wrap' }}>
              <button
                className="btn btn-outline-light"
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
