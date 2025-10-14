export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export const IMAGE_SIZES = {
  POSTER: 'w500',
  BACKDROP: 'original',
  THUMBNAIL: 'w300'
} as const

export const API_ENDPOINTS = {
  MOVIES: {
    TRENDING: '/movies/trending',
    POPULAR: '/movies/popular',
    TOP_RATED: '/movies/top_rated',
    NOW_PLAYING: '/movies/now_playing',
    UPCOMING: '/movies/upcoming'
  },
  TV: {
    TRENDING: '/tv/trending',
    POPULAR: '/tv/popular',
    TOP_RATED: '/tv/top_rated',
    AIRING_TODAY: '/tv/airing_today',
    ON_THE_AIR: '/tv/on_the_air'
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
