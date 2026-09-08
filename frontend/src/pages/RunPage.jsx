import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getSession } from '../api.js'
import { useSessionTimer } from '../useSessionTimer.js'
import { formatDuration } from '../utils.js'

function RunPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getSession(id)
      .then(setSession)
      .catch(() => setError('Could not load this session.'))
  }, [id])

  const timer = useSessionTimer(session)

  useEffect(() => {
    if (session && timer.status === 'idle') {
      timer.start()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  if (error) return <p className="error">{error}</p>
  if (!session || timer.status === 'idle') return <p>Loading...</p>

  if (timer.status === 'finished') {
    return (
      <div className="run-screen end-screen">
        <h1>Session complete</h1>
        <p className="end-stat">{formatDuration(timer.elapsedRealSeconds)} elapsed</p>
        <p className="end-stat">{timer.phaseCount} phases completed</p>
        <div className="end-actions">
          <button onClick={() => timer.start()}>Restart</button>
          <Link to="/">Back to catalog</Link>
        </div>
      </div>
    )
  }

  const { currentPhase, nextPhase, remainingSeconds, status } = timer

  if (!currentPhase) {
    // Transient frame between "time's up" and the status flipping to
    // 'finished' (that happens a moment later). Nothing to show yet.
    return <p>Loading...</p>
  }

  const isPrestart = currentPhase.type === 'prestart'
  const isRest = currentPhase.type === 'rest'
  const phaseLabel = isPrestart ? 'Get ready' : isRest ? 'Rest' : 'Work'

  return (
    <div
      className={`run-screen ${isRest ? 'phase-rest' : 'phase-work'} ${
        isPrestart ? 'phase-prestart' : ''
      }`}
    >
      <div className="phase-label">{phaseLabel}</div>
      <div className="countdown">{remainingSeconds}</div>

      {!isPrestart && (
        <>
          <div className="exercise-name">{currentPhase.exercise}</div>
          {currentPhase.instruction && !isRest && (
            <div className="instruction">{currentPhase.instruction}</div>
          )}
          <div className="round-info">
            Round {currentPhase.round} / {currentPhase.roundsInBlock}
          </div>
        </>
      )}

      {nextPhase && (
        <div className="next-up">
          Up next: {nextPhase.type === 'rest' ? 'Rest' : nextPhase.exercise}
        </div>
      )}

      {!isPrestart && (
        <div className="controls">
          <button
            className="pause-button"
            onClick={() => (status === 'paused' ? timer.resume() : timer.pause())}
          >
            {status === 'paused' ? 'Resume' : 'Pause'}
          </button>
          <div className="secondary-controls">
            <button onClick={() => timer.previous()} disabled={status !== 'active'}>
              Previous
            </button>
            <button onClick={() => timer.next()} disabled={status !== 'active'}>
              Next
            </button>
            <button
              onClick={() => {
                timer.stop()
                navigate(`/sessions/${id}`)
              }}
            >
              Stop
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RunPage
