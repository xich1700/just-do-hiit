import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSession } from '../api.js'
import { formatDuration } from '../utils.js'

function PreviewPage() {
  const { id } = useParams()
  const [session, setSession] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setSession(null)
    getSession(id)
      .then(setSession)
      .catch(() => setError('Could not load this session.'))
  }, [id])

  if (error) return <p className="error">{error}</p>
  if (!session) return <p>Loading...</p>

  const total = session.blocks.reduce(
    (sum, b) => sum + b.rounds * (b.work_seconds + b.rest_seconds),
    0
  )

  return (
    <div className="preview">
      <Link to="/" className="back-link">&larr; Back to catalog</Link>
      <h1>{session.name}</h1>
      <p className="session-meta">
        {session.level} · {formatDuration(total)} total
      </p>

      <ol className="block-list">
        {session.blocks.map((b, i) => (
          <li key={i} className="block-item">
            <div className="block-exercise">{b.exercise}</div>
            {b.instruction && <div className="block-instruction">{b.instruction}</div>}
            <div className="block-timing">
              {b.rounds} × ({b.work_seconds}s work
              {b.rest_seconds > 0 ? ` / ${b.rest_seconds}s rest` : ''})
            </div>
          </li>
        ))}
      </ol>

      <Link to={`/sessions/${id}/run`} className="start-button">
        Start session
      </Link>
    </div>
  )
}

export default PreviewPage
