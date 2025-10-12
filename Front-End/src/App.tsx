import React from 'react'

export default function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand mb-0 h1">ViewVault</span>
        </div>
      </nav>

      <main className="container my-auto text-center py-5">
        <h1 className="display-4">Welcome to ViewVault</h1>
        <p className="lead text-muted">Dummy home page — React + Vite + Bootstrap</p>
        <a href="#" className="btn btn-primary">Get Started</a>
      </main>

      <footer className="text-center py-3 bg-light">
        <small className="text-muted">Built for Spring Boot static hosting. Copy <code>dist</code> to <code>src/main/resources/static</code></small>
      </footer>
    </div>
  )
}

