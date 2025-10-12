import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Movie from './pages/Movie'
import TVShows from './pages/TVShows'
import Anime from './pages/Anime'

function Home(){
  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Welcome to ViewVault</h1>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card text-center h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">MOVIE</h5>
              <p className="card-text flex-grow-1 text-muted">Browse movies</p>
              <Link to="/movie" className="btn btn-primary mt-3">Open</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">TV SHOWS</h5>
              <p className="card-text flex-grow-1 text-muted">Browse TV shows</p>
              <Link to="/tv" className="btn btn-primary mt-3">Open</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">ANiME</h5>
              <p className="card-text flex-grow-1 text-muted">Browse anime</p>
              <Link to="/anime" className="btn btn-primary mt-3">Open</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-vh-100 d-flex flex-column">
        <nav className="navbar navbar-dark bg-primary">
          <div className="container">
            <Link to="/" className="navbar-brand">ViewVault</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/movie" element={<Movie/>} />
          <Route path="/tv" element={<TVShows/>} />
          <Route path="/anime" element={<Anime/>} />
        </Routes>

        <footer className="text-center py-3 bg-light mt-auto">
          <small className="text-muted">Built for Spring Boot static hosting. Copy <code>dist</code> to <code>src/main/resources/static</code></small>
        </footer>
      </div>
    </BrowserRouter>
  )
}

