import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ErrorPage, LoadingState, MediaCard } from '../components'
import { MediaItem, CategoryData } from '../types'
import { extractTMDBResults } from '../utils'
import { CATEGORY_TITLES, STORAGE_KEYS, PAGINATION, TMDB_IMAGE_BASE_URL } from '../constants'

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  const navigate = useNavigate()
  const [data, setData] = useState<CategoryData>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState(false)

  const isTV = window.location.pathname.startsWith('/tv')
  const apiCategory = category || ''
  const storageKey = `${STORAGE_KEYS.CATEGORY_PAGE_PREFIX}_${isTV ? 'tv' : 'movies'}_${apiCategory}`
  const title = category 
    ? (CATEGORY_TITLES[isTV ? `tv-${category}` : category] || `${category.replace('_', ' ')} ${isTV ? 'TV Shows' : 'Movies'}`) 
    : 'Category'

  const fetchCategoryData = async (page: number) => {
    if (data[page]) return

    setLoading(true)
    try {
      const endpoint = `/${isTV ? 'tv' : 'movies'}/${apiCategory}?page=${page}`
      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const result = await response.json()
      const items = extractTMDBResults<MediaItem>(result)

      if (Array.isArray(items) && items.length > 0) {
        setData(prev => ({ ...prev, [page]: items as MediaItem[] }))
        if (items.length < PAGINATION.ITEMS_PER_PAGE) {
          setHasMore(false)
        }
      } else {
        setHasMore(false)
      }
    } catch (error) {
      setError(true)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (category) {
      setData({})
      setCurrentPage(1)
      setHasMore(true)
      setError(false)
      setInitialLoad(true)
      
      const loadInitialData = async () => {
        await fetchCategoryData(1)
        setInitialLoad(false)
      }
      
      loadInitialData()
    }
  }, [category, isTV])

  const loadMore = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchCategoryData(nextPage)
  }

  const getAllItems = (): MediaItem[] => {
    try {
      const items: MediaItem[] = []
      for (let page = 1; page <= currentPage; page++) {
        if (data[page] && Array.isArray(data[page])) {
          items.push(...data[page])
        }
      }
      return items
    } catch (error) {
      return []
    }
  }

  if (error) {
    return (
      <ErrorPage
        onRetry={() => {
          setError(false)
          setLoading(true)
          window.location.reload()
        }}
        title="Connection Error"
        message="Unable to load content. Please check your connection and try again."
      />
    )
  }

  const allItems = getAllItems()
  const featuredItem = allItems.length > 0 ? allItems[0] : null

  if (initialLoad) {
    return <LoadingState message={`Loading ${title}...`} />
  }

  return (
    <div className="pb-5" style={{ backgroundColor: '#141414', minHeight: '100vh' }}>
      {featuredItem && (
        <section className="mb-5 position-relative">
          <div className="movie-slider">
            <div className="movie-slide active">
              <img
                src={
                  featuredItem.backdrop_path
                    ? `${TMDB_IMAGE_BASE_URL}/original${featuredItem.backdrop_path}`
                    : featuredItem.poster_path
                    ? `${TMDB_IMAGE_BASE_URL}/w500${featuredItem.poster_path}`
                    : '/placeholder.jpg'
                }
                alt={featuredItem.title || featuredItem.name || 'Featured'}
              />
              <div className="hero-content">
                <h1 className="hero-title">{featuredItem.title || featuredItem.name || 'Featured'}</h1>
                <div className="hero-meta">
                  {(featuredItem.release_date || featuredItem.first_air_date) && (
                    <span>{new Date(featuredItem.release_date || featuredItem.first_air_date!).getFullYear()}</span>
                  )}
                  {featuredItem.vote_average && (
                    <span className="rating">★ {Number(featuredItem.vote_average.toFixed(1))}</span>
                  )}
                  {featuredItem.adult && <span className="badge bg-danger">18+</span>}
                </div>
                {featuredItem.overview && <p className="hero-overview">{featuredItem.overview}</p>}
                <div className="hero-buttons">
                  <button className="btn btn-light">▶ Play</button>
                  <button className="btn btn-secondary">ℹ More Info</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container-fluid px-3 py-4">
        <button
          className="btn btn-link text-white mb-3 p-0"
          onClick={() => navigate(isTV ? '/tv' : '/movie')}
          style={{ textDecoration: 'none' }}
        >
          ← Back to {isTV ? 'TV Shows' : 'Movies'}
        </button>
        <h1 className="text-white mb-4" style={{ fontSize: '2rem', fontWeight: '700' }}>
          {title}
        </h1>
      </div>

      <div className="container-fluid px-3">
        {allItems.length === 0 && !loading ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m0 3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-muted mb-3">No {isTV ? 'TV Shows' : 'Movies'} Found</h3>
            <p className="text-muted mb-4">
              There are currently no {isTV ? 'TV shows' : 'movies'} in the "{category?.replace('_', ' ')}" category.
            </p>
            <button className="btn btn-outline-light" onClick={() => navigate(isTV ? '/tv' : '/movie')}>
              ← Back to {isTV ? 'TV Shows' : 'Movies'}
            </button>
          </div>
        ) : (
          <>
            <div className="row g-3">
              {allItems.map(item => (
                <div key={`item-${item.id}`} className="col-6 col-sm-4 col-md-3 col-lg-2">
                  <MediaCard item={item} />
                </div>
              ))}
            </div>

            {hasMore && !loading && (
              <div className="text-center mt-4 mb-5">
                <button
                  className="btn btn-outline-light px-4 py-2"
                  onClick={loadMore}
                  style={{ borderRadius: '25px' }}
                >
                  Load More
                </button>
              </div>
            )}

            {loading && <LoadingState message={`Loading more ${isTV ? 'TV shows' : 'movies'}...`} />}
          </>
        )}
      </div>
    </div>
  )
}
