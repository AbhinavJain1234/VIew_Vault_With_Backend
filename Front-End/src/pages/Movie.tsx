import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorPage, LoadingState, HeroCarousel, ScrollableSection } from '../components'
import { useCarousel } from '../hooks'
import { MovieItem } from '../types'
import { fetchWithErrorHandling, mapMovieItem } from '../utils'
import { API_ENDPOINTS, PAGINATION } from '../constants'

export default function Movie() {
  const navigate = useNavigate()
  const [heroitem, setHeroItem] = useState<MovieItem[]>([])
  const [trending, setTrending] = useState<MovieItem[]>([])
  const [popular, setPopular] = useState<MovieItem[]>([])
  const [topRated, setTopRated] = useState<MovieItem[]>([])
  const [nowPlaying, setNowPlaying] = useState<MovieItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const carousel = useCarousel(heroitem.length)

  useEffect(() => {
    let mounted = true

    const fetchAllData = async () => {
      try {
        const [trendingData, popularData, topRatedData, nowPlayingData] = await Promise.all([
          fetchWithErrorHandling(`${API_ENDPOINTS.MOVIES.TRENDING}?timeWindow=day`, mapMovieItem),
          fetchWithErrorHandling(API_ENDPOINTS.MOVIES.POPULAR, mapMovieItem),
          fetchWithErrorHandling(API_ENDPOINTS.MOVIES.TOP_RATED, mapMovieItem),
          fetchWithErrorHandling(API_ENDPOINTS.MOVIES.NOW_PLAYING, mapMovieItem)
        ])

        if (mounted) {
          setHeroItem(trendingData.slice(0, PAGINATION.HERO_ITEMS))
          setTrending(trendingData.slice(0, PAGINATION.MAX_DISPLAY_ITEMS))
          setPopular(popularData.slice(0, PAGINATION.MAX_DISPLAY_ITEMS))
          setTopRated(topRatedData.slice(0, PAGINATION.MAX_DISPLAY_ITEMS))
          setNowPlaying(nowPlayingData.slice(0, PAGINATION.MAX_DISPLAY_ITEMS))
          setLoading(false)
        }
      } catch (error) {
        if (mounted) {
          setError(true)
          setLoading(false)
        }
      }
    }

    fetchAllData()
    return () => { mounted = false }
  }, [])

  if (loading) {
    return <LoadingState message="Loading movies..." />
  }

  if (error) {
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
    <div className="pb-5" style={{ backgroundColor: '#141414' }}>
      <HeroCarousel
        items={heroitem}
        currentIndex={carousel.currentIndex}
        onPrev={carousel.prev}
        onNext={carousel.next}
        onDotClick={carousel.goToSlide}
        onMouseEnter={carousel.handleMouseEnter}
        onMouseLeave={carousel.handleMouseLeave}
        onTouchStart={carousel.handleTouchStart}
        onTouchMove={carousel.handleTouchMove}
      />
      <ScrollableSection
        title="Trending on ViewVault"
        items={trending}
        onSeeAll={() => navigate('/movies/trending')}
      />
      <ScrollableSection
        title="Popular on ViewVault"
        items={popular}
        onSeeAll={() => navigate('/movies/popular')}
      />

      <ScrollableSection
        title="Top Rated"
        items={topRated}
        onSeeAll={() => navigate('/movies/top_rated')}
      />

      <ScrollableSection
        title="Now Playing"
        items={nowPlaying}
        onSeeAll={() => navigate('/movies/now_playing')}
      />
    </div>
  )
}
