import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ErrorPage, LoadingState } from '../components'
import { getImageUrl, formatRating } from '../utils'
import { TMDB_IMAGE_BASE_URL } from '../constants'

interface Person {
  id: number
  name: string
  character?: string
  job?: string
  department?: string
  profile_path?: string
  known_for_department?: string
  order?: number
  credit_id?: string
  adult?: boolean
  gender?: number
  original_name?: string
  popularity?: number
}

interface EpisodeDetail {
  id: number
  name: string
  overview: string
  episode_number: number
  season_number: number
  air_date?: string
  still_path?: string
  vote_average: number
  vote_count?: number
  runtime?: number
  production_code?: string
  crew?: Person[]
  guest_stars?: Person[]
}

export default function TVEpisodeDetailsPage() {
  const { tvId, seasonNumber, episodeNumber } = useParams<{ 
    tvId: string; 
    seasonNumber: string; 
    episodeNumber: string 
  }>()
  const navigate = useNavigate()
  const [episode, setEpisode] = React.useState<EpisodeDetail | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    const fetchEpisodeDetails = async () => {
      if (!tvId || !seasonNumber || !episodeNumber) return

      setLoading(true)
      setError(false)

      try {
        const response = await fetch(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setEpisode(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching episode details:', err)
        setError(true)
        setLoading(false)
      }
    }

    fetchEpisodeDetails()
  }, [tvId, seasonNumber, episodeNumber])

  if (loading) {
    return <LoadingState message="Loading episode details..." />
  }

  if (error || !episode) {
    return (
      <ErrorPage
        onRetry={() => {
          setError(false)
          setLoading(true)
          window.location.reload()
        }}
      />
    )
  }

  const stillUrl = episode.still_path ? getImageUrl(episode.still_path, 'STILL') : '/placeholder.jpg'

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh', color: '#fff', paddingBottom: '40px' }}>
      {/* Header */}
      <div className="container-fluid px-4" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '20px' }}>
        <button
          className="btn btn-link text-white mb-4"
          onClick={() => navigate(-1)}
          style={{ textDecoration: 'none', paddingLeft: 0 }}
        >
          ← Back to Season
        </button>

        {/* Episode Hero Section */}
        <div className="row mb-5">
          <div className="col-12">
            <div
              style={{
                position: 'relative',
                height: '400px',
                backgroundImage: `url(${stillUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(180deg, rgba(20,20,20,0.3) 0%, rgba(20,20,20,0.7) 70%, rgba(20,20,20,0.9) 100%)'
              }} />
              
              <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '30px',
                right: '30px'
              }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  {episode.episode_number}. {episode.name}
                </h1>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '1.1rem', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    Season {episode.season_number}
                  </span>
                  {episode.air_date && (
                    <span style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                      📅 {new Date(episode.air_date).toLocaleDateString()}
                    </span>
                  )}
                  {episode.runtime && (
                    <span style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                      ⏱️ {episode.runtime} min
                    </span>
                  )}
                  {episode.vote_average > 0 && (
                    <span style={{
                      backgroundColor: 'rgba(13, 110, 253, 0.9)',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.95rem'
                    }}>
                      ⭐ {formatRating(episode.vote_average)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Episode Details */}
        <div className="row">
          <div className="col-12 col-lg-8">
            {/* Overview */}
            {episode.overview && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Overview</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#ccc' }}>
                  {episode.overview}
                </p>
              </div>
            )}

            {/* Guest Stars */}
            {episode.guest_stars && episode.guest_stars.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Guest Stars</h2>
                <div className="row g-3">
                  {episode.guest_stars.slice(0, 12).map((person) => (
                    <div key={person.id} className="col-6 col-md-4 col-lg-3">
                      <div
                        style={{
                          backgroundColor: '#2a2a2a',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '1px solid #444',
                          transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        {person.profile_path && (
                          <img
                            src={getImageUrl(person.profile_path, 'THUMBNAIL')}
                            alt={person.name}
                            style={{
                              width: '100%',
                              height: '150px',
                              objectFit: 'cover'
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = '/placeholder.jpg'
                            }}
                          />
                        )}
                        <div style={{ padding: '12px' }}>
                          <h5 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 'bold' }}>
                            {person.name}
                          </h5>
                          {person.character && (
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#aaa' }}>
                              as {person.character}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Crew */}
            {episode.crew && episode.crew.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Crew</h2>
                <div className="row g-3">
                  {episode.crew
                    .filter(person => person.job && ['Director', 'Writer', 'Producer'].includes(person.job))
                    .slice(0, 8)
                    .map((person) => (
                    <div key={`${person.id}-${person.job}`} className="col-6 col-md-4 col-lg-3">
                      <div
                        style={{
                          backgroundColor: '#2a2a2a',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '1px solid #444',
                          transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        {person.profile_path && (
                          <img
                            src={getImageUrl(person.profile_path, 'THUMBNAIL')}
                            alt={person.name}
                            style={{
                              width: '100%',
                              height: '150px',
                              objectFit: 'cover'
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = '/placeholder.jpg'
                            }}
                          />
                        )}
                        <div style={{ padding: '12px' }}>
                          <h5 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 'bold' }}>
                            {person.name}
                          </h5>
                          {person.job && (
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#aaa' }}>
                              {person.job}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-12 col-lg-4">
            <div
              style={{
                backgroundColor: '#2a2a2a',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #444'
              }}
            >
              <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Episode Details</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <strong style={{ color: '#aaa' }}>Episode:</strong>
                  <span style={{ marginLeft: '10px' }}>{episode.episode_number}</span>
                </div>
                
                <div>
                  <strong style={{ color: '#aaa' }}>Season:</strong>
                  <span style={{ marginLeft: '10px' }}>{episode.season_number}</span>
                </div>
                
                {episode.air_date && (
                  <div>
                    <strong style={{ color: '#aaa' }}>Air Date:</strong>
                    <span style={{ marginLeft: '10px' }}>
                      {new Date(episode.air_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                
                {episode.runtime && (
                  <div>
                    <strong style={{ color: '#aaa' }}>Runtime:</strong>
                    <span style={{ marginLeft: '10px' }}>{episode.runtime} minutes</span>
                  </div>
                )}
                
                {episode.vote_count && episode.vote_count > 0 && (
                  <div>
                    <strong style={{ color: '#aaa' }}>Votes:</strong>
                    <span style={{ marginLeft: '10px' }}>{episode.vote_count.toLocaleString()}</span>
                  </div>
                )}
                
                {episode.production_code && (
                  <div>
                    <strong style={{ color: '#aaa' }}>Production Code:</strong>
                    <span style={{ marginLeft: '10px' }}>{episode.production_code}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}