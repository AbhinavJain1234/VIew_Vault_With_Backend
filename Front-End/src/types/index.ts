export interface Genre {
  id: number
  name: string
}

export interface MediaItem {
  id: number
  title?: string
  name?: string
  poster_path?: string
  backdrop_path?: string
  vote_average?: number
  release_date?: string
  first_air_date?: string
  adult?: boolean
  overview?: string
  genre_ids?: number[]
  genres?: Genre[]
  runtime?: number
  revenue?: number
  budget?: number
  status?: string
  imdb_id?: string
  homepage?: string
  tagline?: string
  popularity?: number
  vote_count?: number
  origin_country?: string[]
  original_language?: string
}

export interface MovieItem extends MediaItem {
  title: string
  release_date?: string
}

export interface TVItem extends MediaItem {
  name: string
  first_air_date?: string
}

export interface TMDBResponse<T> {
  page: number
  total_pages: number
  total_results: number
  results: T[]
}

export type MediaType = 'movie' | 'tv'

export interface CategoryData {
  [page: number]: MediaItem[]
}

export interface ScrollState {
  atStart: boolean
  atEnd: boolean
}
