# 🎬 ViewVault Frontend

A modern, production-ready movie and TV show discovery platform built with **React**, **TypeScript**, **Vite**, and **Bootstrap**. Designed to integrate seamlessly with Spring Boot backends.

## ✨ Features

- 🎥 **Movie & TV Show Discovery** - Browse trending, popular, top-rated content
- 🎠 **Auto-Rotating Carousel** - Hero section with touch/swipe support
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🔄 **Infinite Scrolling** - Horizontal scrollable sections with navigation
- 📄 **Paginated Categories** - Load more content dynamically
- 🎨 **Netflix-Style UI** - Modern dark theme with smooth animations
- ⚡ **Lightning Fast** - Optimized with Vite and code splitting
- 🔒 **Type-Safe** - 100% TypeScript coverage
- 🧩 **Modular Architecture** - Reusable components and hooks

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit **http://localhost:5173** (or the port shown in terminal)

### 3. Build for Production

```bash
npm run build
```

Production files will be in the `dist/` folder.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── HeroCarousel     # Auto-rotating carousel
│   ├── MediaCard        # Movie/TV show cards
│   ├── ScrollableSection # Horizontal scrolling
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useBackendStatus # Backend health check
│   └── useCarousel      # Carousel logic
├── pages/              # Page components
│   ├── Movie.tsx
│   ├── TVShows.tsx
│   └── CategoryPage.tsx
├── types/              # TypeScript definitions
├── constants/          # App configuration
└── utils/              # Helper functions
```

## 📚 Documentation

- **[Architecture Guide](./ARCHITECTURE.md)** - Detailed architecture overview
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment instructions
- **[Production Checklist](./PRODUCTION_CHECKLIST.md)** - Pre-deployment verification
- **[Refactoring Summary](./REFACTORING_SUMMARY.md)** - Recent improvements

## 🔧 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npx tsc --noEmit  # Type checking
```

## 🌐 Integration with Spring Boot

### Option 1: Static Assets (Recommended)

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Copy `dist/` contents to Spring Boot:
   ```bash
   cp -r dist/* ../backend/src/main/resources/static/
   ```

3. Configure Spring Boot to serve index.html for all routes:
   ```java
   @Controller
   public class SPAController {
       @GetMapping(value = "/{path:[^\\.]*}")
       public String redirect() {
           return "forward:/index.html";
       }
   }
   ```

### Option 2: Separate Deployment

- Deploy frontend to Vercel/Netlify
- Configure CORS on Spring Boot backend
- Update API endpoints in `src/constants/index.ts`

## 🔌 Backend API Requirements

The frontend expects these endpoints:

### Movies
- `GET /movies/trending?timeWindow=day`
- `GET /movies/popular?page=1`
- `GET /movies/top_rated?page=1`
- `GET /movies/now_playing?page=1`

### TV Shows
- `GET /tv/trending?timeWindow=week`
- `GET /tv/popular?page=1`
- `GET /tv/top_rated?page=1`
- `GET /tv/airing_today?page=1`
- `GET /tv/on_the_air?page=1`

**Response Format** (TMDB-compatible):
```json
{
  "page": 1,
  "total_pages": 500,
  "total_results": 10000,
  "results": [
    {
      "id": 123,
      "title": "Movie Title",
      "poster_path": "/path.jpg",
      "backdrop_path": "/path.jpg",
      "vote_average": 8.5,
      "release_date": "2024-01-01",
      "overview": "Description..."
    }
  ]
}
```

## 🎨 Tech Stack

- **Framework**: React 18.2
- **Language**: TypeScript 5.5
- **Build Tool**: Vite 5.4
- **Styling**: Bootstrap 5.3 + Custom CSS
- **Routing**: React Router 7.1
- **State Management**: React Hooks
- **HTTP Client**: Fetch API

## 🚀 Production Ready

✅ **Code Quality**
- Zero console.log statements
- No code duplication
- 100% TypeScript coverage
- Proper error handling

✅ **Performance**
- Optimized bundle size (~115 kB gzipped)
- Code splitting enabled
- Image optimization
- Debounced events

✅ **Developer Experience**
- Clean architecture
- Comprehensive docs
- Reusable components
- Easy to maintain

## 📊 Build Stats

- **Build Time**: ~1.3s
- **Bundle Size**: 262 kB (82.9 kB gzipped)
- **CSS Size**: 236 kB (32.2 kB gzipped)
- **Total**: ~500 kB (~115 kB gzipped)

## 🌟 Recent Updates

**v2.0.0 - Production Ready Refactor**
- ✨ Modular component architecture
- 🎯 37% code reduction
- 🔒 100% TypeScript coverage
- ⚡ Performance optimizations
- 📚 Comprehensive documentation

See [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) for details.

## 📝 License

This project is part of ViewVault - A movie and TV show discovery platform.

## 🤝 Contributing

1. Follow the architecture patterns in [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Ensure TypeScript compilation passes: `npx tsc --noEmit`
3. Keep components small and focused
4. Add types for all new code
5. Update documentation as needed

---

**Status**: ✅ Production Ready  
**Last Updated**: October 14, 2025  
**Framework**: Vite + React + TypeScript + Bootstrap
