import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ErrorPage, LoadingState } from '../components'
import { getImageUrl, formatRating } from '../utils'
import { TMDB_IMAGE_BASE_URL } from '../constants'

interface Episode {
  id: number
  name: string
  overview: string
  episode_number: number
  air_date?: string
  still_path?: string
  vote_average: number
  runtime?: number
  episode_type?: string
  production_code?: string
  season_number?: number
  show_id?: number
  vote_count?: number
  crew?: Person[]
  guest_stars?: Person[]
}

interface Person {
  id: number
  name: string
  character?: string
  job?: string
  department?: string
  profile_path?: string
  known_for_department?: string
  order?: number
}

interface Network {
  id: number
  name: string
  logo_path?: string
  origin_country?: string
}

interface SeasonDetail {
  _id?: string
  id: number
  name: string
  overview: string
  air_date?: string
  poster_path?: string
  season_number: number
  vote_average?: number
  episodes: Episode[]
  networks?: Network[]
}

export default function TVSeasonDetailsPage() {
  const { tvId, seasonNumber } = useParams<{ tvId: string; seasonNumber: string }>()
  const navigate = useNavigate()
  const [season, setSeason] = React.useState<SeasonDetail | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [showPlayer, setShowPlayer] = React.useState(false)
  const [selectedEpisode, setSelectedEpisode] = React.useState<Episode | null>(null)

  React.useEffect(() => {
    const fetchSeasonDetails = async () => {
      if (!tvId || !seasonNumber) return

      setLoading(true)
      setError(false)

      try {
        const response = await fetch(`/tv/${tvId}/season/${seasonNumber}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setSeason(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching season details:', err)
        setError(true)
        setLoading(false)
      }
    }

    fetchSeasonDetails()
  }, [tvId, seasonNumber])

  if (loading) {
    return <LoadingState message="Loading season details..." />
  }

  if (error || !season) {
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

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh', color: '#fff', paddingBottom: '40px' }}>
      {/* Header with Season Info */}
      <div className="container-fluid px-4" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '20px' }}>
        <button
          className="btn btn-link text-white mb-4"
          onClick={() => navigate(-1)}
          style={{ textDecoration: 'none', paddingLeft: 0 }}
        >
          ← Back to TV Show
        </button>

        <div className="row">
          {/* Season Poster */}
          <div className="col-12 col-md-3 mb-4">
            <img
              src={season.poster_path ? getImageUrl(season.poster_path, 'POSTER') : '/placeholder.jpg'}
              alt={season.name}
              style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
              }}
            />
          </div>

          {/* Season Info */}
          <div className="col-12 col-md-9">
            <h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{season.name}</h1>
            
            <div style={{ marginBottom: '20px', color: '#aaa' }}>
              {season.air_date && (
                <span style={{ marginRight: '20px' }}>
                  📅 {new Date(season.air_date).toLocaleDateString()}
                </span>
              )}
              <span style={{ marginRight: '20px' }}>📺 {season.episodes.length} Episodes</span>
              {season.vote_average && season.vote_average > 0 && (
                <span>⭐ {formatRating(season.vote_average)}</span>
              )}
            </div>

            {season.overview && (
              <div style={{ marginBottom: '30px' }}>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#ccc' }}>
                  {season.overview}
                </p>
              </div>
            )}

            {/* Networks */}
            {season.networks && season.networks.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '10px', color: '#ccc' }}>Networks</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {season.networks.map((network) => (
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
          </div>
        </div>

        {/* Episodes List */}
        <div className="mt-5">
          <h2 style={{ fontSize: '1.8rem', marginBottom: '25px' }}>Episodes</h2>
          <div className="row g-4">
            {season.episodes.map((episode) => (
              <div key={episode.id} className="col-12">
                <div
                  style={{
                    backgroundColor: '#2a2a2a',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    border: '1px solid #444'
                  }}
                >
                  {/* Episode Still */}
                  <div style={{ width: '200px', flexShrink: 0 }}>
                    <img
                      src={episode.still_path ? getImageUrl(episode.still_path, 'STILL') : '/placeholder.jpg'}
                      alt={`${episode.name} still`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Episode Info */}
                  <div style={{ padding: '20px', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <h3 style={{ margin: 0, fontSize: '1.3rem' }}>
                        {episode.episode_number}. {episode.name}
                      </h3>
                      {episode.vote_average > 0 && (
                        <span style={{ backgroundColor: '#0d6efd', padding: '4px 8px', borderRadius: '4px', fontSize: '0.9rem' }}>
                          ★ {formatRating(episode.vote_average)}
                        </span>
                      )}
                    </div>

                    {episode.air_date && (
                      <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '10px' }}>
                        {new Date(episode.air_date).toLocaleDateString()}
                        {episode.runtime && ` • ${episode.runtime} min`}
                      </div>
                    )}

                    <p style={{ margin: '0 0 15px 0', color: '#ccc', fontSize: '1rem', lineHeight: '1.5' }}>
                      {episode.overview || 'No overview available.'}
                    </p>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setSelectedEpisode(episode)
                          setShowPlayer(true)
                        }}
                        style={{ 
                          padding: '8px 20px', 
                          fontSize: '0.9rem', 
                          fontWeight: 'bold',
                          backgroundColor: '#e50914',
                          border: 'none'
                        }}
                      >
                        ▶ Watch
                      </button>
                      <button
                        className="btn btn-outline-light"
                        onClick={() => navigate(`/tv/${tvId}/season/${seasonNumber}/episode/${episode.episode_number}`)}
                        style={{ 
                          padding: '8px 20px', 
                          fontSize: '0.9rem'
                        }}
                      >
                        More Details
                      </button>
                    </div>

                    {/* Guest Stars */}
                    {episode.guest_stars && episode.guest_stars.length > 0 && (
                      <div style={{ marginTop: '15px' }}>
                        <h5 style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '8px' }}>Guest Stars:</h5>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {episode.guest_stars.slice(0, 3).map((person) => (
                            <span
                              key={person.id}
                              style={{
                                backgroundColor: '#444',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '0.8rem',
                                color: '#ddd'
                              }}
                            >
                              {person.name} {person.character && `as ${person.character}`}
                            </span>
                          ))}
                          {episode.guest_stars.length > 3 && (
                            <span style={{ fontSize: '0.8rem', color: '#aaa' }}>
                              +{episode.guest_stars.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {showPlayer && selectedEpisode && (
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
          onClick={() => setShowPlayer(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowPlayer(false)}
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

          {/* Episode Title */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              zIndex: 10000
            }}
          >
            S{season.season_number}E{selectedEpisode.episode_number}: {selectedEpisode.name}
          </div>

          {/* Iframe Embed - Full Screen */}
          <iframe
            src={`https://vidsrc.xyz/embed/tv?tmdb=${tvId}&season=${season.season_number}&episode=${selectedEpisode.episode_number}`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            allowFullScreen
            frameBorder="0"
          />
        </div>
      )}
    </div>
  )
}