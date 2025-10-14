import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './components/Home'
import Movie from './pages/Movie'
import TVShows from './pages/TVShows'
import Anime from './pages/Anime'
import CategoryPage from './pages/CategoryPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#141414' }}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/movies/:category" element={<CategoryPage />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/tv/:category" element={<CategoryPage />} />
          <Route path="/anime" element={<Anime />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}