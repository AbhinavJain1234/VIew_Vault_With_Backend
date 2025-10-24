import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorPage, LoadingState, HeroCarousel, ScrollableSection } from '../components'
import { useCarousel } from '../hooks'
import { TVItem } from '../types'
import { fetchWithErrorHandling, mapTVItem } from '../utils'
import { API_ENDPOINTS, PAGINATION } from '../constants'

export default function TVShows() {
  const navigate = useNavigate()
  const [heroitem, setHeroItem] = useState<TVItem[]>([])
  const [trending, setTrending] = useState<TVItem[]>([])
  const [popular, setPopular] = useState<TVItem[]>([])
  const [topRated, setTopRated] = useState<TVItem[]>([])
  const [airingToday, setAiringToday] = useState<TVItem[]>([])
  const [onTheAir, setOnTheAir] = useState<TVItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let mounted = true

    const fetchAllTVData = async () => {
      try {
        const [trendingData, popularData, topRatedData, airingTodayData, onTheAirData] = await Promise.all([
          fetchWithErrorHandling(`${API_ENDPOINTS.TV.TRENDING}?timeWindow=week`, mapTVItem),
          fetchWithErrorHandling(API_ENDPOINTS.TV.POPULAR, mapTVItem),
          fetchWithErrorHandling(API_ENDPOINTS.TV.TOP_RATED, mapTVItem),
          fetchWithErrorHandling(API_ENDPOINTS.TV.AIRING_TODAY, mapTVItem),
          fetchWithErrorHandling(API_ENDPOINTS.TV.ON_THE_AIR, mapTVItem)
        ])

        if (mounted) {
          setHeroItem(trendingData.slice(0, PAGINATION.HERO_ITEMS))
          setTrending(trendingData.slice(0, PAGINATION.MAX_DISPLAY_ITEMS))
          setPopular(popularData.slice(0, PAGINATION.MAX_DISPLAY_ITEMS))
          setTopRated(topRatedData.slice(0, PAGINATION.MAX_DISPLAY_ITEMS))
          setAiringToday(airingTodayData.slice(0, PAGINATION.MAX_DISPLAY_ITEMS))
          setOnTheAir(onTheAirData.slice(0, PAGINATION.MAX_DISPLAY_ITEMS))
          setLoading(false)
        }
      } catch (error) {
        if (mounted) {
          setError(true)
          setLoading(false)
        }
      }
    }

    fetchAllTVData()
    return () => { mounted = false }
  }, [])

  const carousel = useCarousel(heroitem.length)

  if (loading) {
    return <LoadingState message="Loading TV shows..." />
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
        title="Trending TV Shows"
        items={trending}
        onSeeAll={() => navigate('/tv/trending')}
        onMoreDetails={(item, path) => navigate(path || `/tv-details/${item.id}`, { state: { item } })}
      />
      <ScrollableSection
        title="Popular TV Shows"
        items={popular}
        onSeeAll={() => navigate('/tv/popular')}
        onMoreDetails={(item, path) => navigate(path || `/tv-details/${item.id}`, { state: { item } })}
      />

      <ScrollableSection
        title="Top Rated TV Shows"
        items={topRated}
        onSeeAll={() => navigate('/tv/top_rated')}
        onMoreDetails={(item, path) => navigate(path || `/tv-details/${item.id}`, { state: { item } })}
      />

      <ScrollableSection
        title="Airing Today"
        items={airingToday}
        onSeeAll={() => navigate('/tv/airing_today')}
        onMoreDetails={(item, path) => navigate(path || `/tv-details/${item.id}`, { state: { item } })}
      />

      <ScrollableSection
        title="On The Air"
        items={onTheAir}
        onSeeAll={() => navigate('/tv/on_the_air')}
        onMoreDetails={(item, path) => navigate(path || `/tv-details/${item.id}`, { state: { item } })}
      />
    </div>
  )
}
