export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export const IMAGE_SIZES = {
  POSTER: 'w500',
  BACKDROP: 'original',
  THUMBNAIL: 'w300',
  STILL: 'w300'
} as const

export const API_ENDPOINTS = {
  MOVIES: {
    TRENDING: '/movies/category/trending',
    POPULAR: '/movies/category/popular',
    TOP_RATED: '/movies/category/top_rated',
    NOW_PLAYING: '/movies/category/now_playing',
    UPCOMING: '/movies/category/upcoming'
  },
  TV: {
    TRENDING: '/tv/category/trending',
    POPULAR: '/tv/category/popular',
    TOP_RATED: '/tv/category/top_rated',
    AIRING_TODAY: '/tv/category/airing_today',
    ON_THE_AIR: '/tv/category/on_the_air'
  }
} as const

export const CATEGORY_TITLES: Record<string, string> = {
  trending: 'Trending Movies',
  popular: 'Popular Movies',
  top_rated: 'Top Rated Movies',
  upcoming: 'Upcoming Movies',
  now_playing: 'Now Playing Movies',
  'tv-trending': 'Trending TV Shows',
  'tv-popular': 'Popular TV Shows',
  'tv-top_rated': 'Top Rated TV Shows',
  'tv-airing_today': 'Airing Today',
  'tv-on_the_air': 'On The Air'
}

export const THEME = {
  COLORS: {
    BACKGROUND: '#141414',
    CARD_BG: '#1a1a1a',
    TEXT_PRIMARY: '#fff',
    TEXT_SECONDARY: '#e5e5e5',
    TEXT_MUTED: '#aaa',
    ACCENT: '#e50914',
    RATING: '#ffd700'
  },
  CAROUSEL: {
    AUTO_ROTATE_INTERVAL: 4000,
    SLIDE_TRANSITION_DURATION: 1000
  },
  SCROLL: {
    SCROLL_AMOUNT: 600
  }
} as const

export const STORAGE_KEYS = {
  CATEGORY_PAGE_PREFIX: 'categoryPage'
} as const

export const PAGINATION = {
  ITEMS_PER_PAGE: 20,
  MAX_DISPLAY_ITEMS: 10,
  HERO_ITEMS: 4
} as const

export const GENRE_MAP: Record<number, string> = {
  // Movie Genres
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
  // TV Genres
  10759: 'Action & Adventure',
  10762: 'Kids',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics'
} as const
