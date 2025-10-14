import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar: React.FC = () => (
  <nav className="navbar navbar-dark" style={{ backgroundColor: '#000', position: 'sticky', top: 0, zIndex: 1000 }}>
    <div className="container-fluid px-4">
      <Link to="/" className="navbar-brand fw-bold text-danger" style={{ fontSize: '1.5rem' }}>
        VIEWVAULT
      </Link>
      <div className="d-flex gap-3">
        <Link to="/movie" className="text-decoration-none text-white">Movies</Link>
        <Link to="/tv" className="text-decoration-none text-white">TV Shows</Link>
        <Link to="/anime" className="text-decoration-none text-white">Anime</Link>
      </div>
    </div>
  </nav>
)
