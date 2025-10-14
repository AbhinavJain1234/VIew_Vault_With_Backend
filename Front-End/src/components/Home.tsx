import React from 'react'
import { Link } from 'react-router-dom'

export const Home: React.FC = () => (
  <div className="container py-5">
    <h1 className="mb-4 text-center">Welcome to ViewVault</h1>
    <div className="row g-3">
      <div className="col-md-4">
        <div className="card text-center h-100">
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">MOVIES</h5>
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
            <h5 className="card-title">ANIME</h5>
            <p className="card-text flex-grow-1 text-muted">Browse anime</p>
            <Link to="/anime" className="btn btn-primary mt-3">Open</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)
