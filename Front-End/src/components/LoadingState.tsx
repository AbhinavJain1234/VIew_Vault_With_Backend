import React from 'react'

export const LoadingSpinner: React.FC = () => (
  <div className="text-center py-5">
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
)

interface LoadingStateProps {
  message?: string
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => (
  <div className="text-center py-5">
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mt-2" style={{ color: '#e5e5e5' }}>{message}</p>
  </div>
)
