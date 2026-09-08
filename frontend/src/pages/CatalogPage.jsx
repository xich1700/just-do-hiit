import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSessions } from '../api.js'
import { formatDuration } from '../utils.js'

function CatalogPage() {
  const [sessions, setSessions] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getSessions()
      .then(setSessions)
      .catch(() => setError('Could not reach the server. Is the backend running?'))
  }, [])

  if (error) return <p className="error">{error}</p>
  if (!sessions) return <p>Loading sessions...</p>

  return (
    <div className="catalog">
      <h1>Just Do HIIT</h1>
      <ul className="session-list">
        {sessions.map((s) => (
          <li key={s.id}>
            <Link to={`/sessions/${s.id}`} className="session-card">
              <span className="session-name">{s.name}</span>
              <span className="session-meta">
                {s.level} · {formatDuration(s.total_seconds)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CatalogPage
