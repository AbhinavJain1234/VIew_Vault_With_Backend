import React from 'react'

/**
 * ErrorPage - A beautiful, reusable error page component for ViewVault
 *
 * Features:
 * - Netflix-style dark theme with glassmorphism effects
 * - Custom movie-themed error icon
 * - Customizable title, message, and retry behavior
 * - Optional help button with troubleshooting tips
 * - Fully responsive design
 *
 * Usage:
 * ```tsx
 * import ErrorPage from '../components/ErrorPage'
 * import { useBackendStatus } from '../hooks/useBackendStatus'
 *
 * function MyPage() {
 *   const { isBackendDown, retry } = useBackendStatus('/api/endpoint')
 *
 *   if (isBackendDown) {
 *     return <ErrorPage onRetry={retry} />
 *   }
 *
 *   return <NormalPageContent />
 * }
 * ```
 */
interface ErrorPageProps {
  onRetry?: () => void
  title?: string
  message?: string
  showHelp?: boolean
}

export default function ErrorPage({
  onRetry = () => window.location.reload(),
  title = "Connection Lost",
  message = "We're unable to connect to the ViewVault movie database.\nPlease ensure your Spring Boot backend is running on localhost:8080.",
  showHelp = true
}: ErrorPageProps) {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#e50914" strokeWidth="2" fill="none"/>
            <path d="M8 8l8 8M16 8l-8 8" stroke="#e50914" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="9" cy="9" r="1.5" fill="#e50914"/>
            <circle cx="15" cy="15" r="1.5" fill="#e50914"/>
          </svg>
        </div>
        <h1 className="error-title">{title}</h1>
        <p className="error-message">
          {message.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < message.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        <div className="error-actions">
          <button className="retry-btn" onClick={onRetry}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retry Connection
          </button>
          {showHelp && (
            <button className="help-btn" onClick={()=>{alert('Make sure your Spring Boot application is running on localhost:8080\n\nCheck the console for any error messages.')}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m0 3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Help
            </button>
          )}
        </div>
        <div className="error-footer">
          <p>ViewVault • Movie Discovery Platform</p>
        </div>
      </div>
    </div>
  )
}