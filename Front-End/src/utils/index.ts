import { MediaItem, MovieItem, TVItem, TMDBResponse } from '../types'
import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES } from '../constants'

export const mapMovieItem = (data: any): MovieItem => ({
  id: data.id ?? 0,
  title: data.title ?? data.original_title ?? 'Untitled',
  poster_path: data.poster_path,
  backdrop_path: data.backdrop_path,
  vote_average: data.vote_average ? Number(data.vote_average.toFixed(1)) : undefined,
  release_date: data.release_date,
  overview: data.overview || '',
  adult: data.adult || false,
  genre_ids: data.genre_ids || []
})

export const mapTVItem = (data: any): TVItem => ({
  id: data.id ?? 0,
  name: data.name ?? data.original_name ?? 'Untitled',
  poster_path: data.poster_path,
  backdrop_path: data.backdrop_path,
  vote_average: data.vote_average ? Number(data.vote_average.toFixed(1)) : undefined,
  first_air_date: data.first_air_date,
  overview: data.overview || '',
  genre_ids: data.genre_ids || []
})

export const getImageUrl = (
  path: string | undefined,
  size: keyof typeof IMAGE_SIZES = 'POSTER',
  fallback: string = '/placeholder.jpg'
): string => {
  if (!path) return fallback
  return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES[size]}${path}`
}

export const getYear = (date?: string): number | undefined => {
  if (!date) return undefined
  return Number(date.split('-')[0])
}

export const formatRating = (rating?: number): string => {
  if (!rating) return ''
  return `★ ${rating.toFixed(1)}`
}

export const extractTMDBResults = <T>(data: any): T[] => {
  const results = data.results || data
  return Array.isArray(results) ? results : []
}

export const fetchWithErrorHandling = async <T>(
  endpoint: string,
  mapper: (data: any) => T
): Promise<T[]> => {
  try {
    console.log(`Fetching data from ${endpoint}...`)
    const response = await fetch(endpoint)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()
    const results = extractTMDBResults(data)
    return results.map(mapper)
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error)
    return []
  }
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait) as unknown as number
  }
}
