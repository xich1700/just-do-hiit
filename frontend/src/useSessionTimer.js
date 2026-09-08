import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { buildPhases } from './timerEngine.js'

const PRESTART_SECONDS = 5

export function useSessionTimer(session) {
  const timeline = useMemo(() => {
    if (!session) return []
    return [{ type: 'prestart', duration: PRESTART_SECONDS }, ...buildPhases(session)]
  }, [session])

  const cumulativeMs = useMemo(() => {
    let acc = 0
    return timeline.map((phase) => {
      const start = acc
      acc += phase.duration * 1000
      return start
    })
  }, [timeline])

  const totalMs = useMemo(
    () => timeline.reduce((sum, phase) => sum + phase.duration * 1000, 0),
    [timeline]
  )

  const prestartMs = timeline.length > 0 ? timeline[0].duration * 1000 : 0

  const [status, setStatus] = useState('idle') // idle | active | paused | finished
  const [, forceTick] = useState(0)

  const sessionStartRef = useRef(null)
  const totalPausedMsRef = useRef(0)
  const pausedAtRef = useRef(null)

  useEffect(() => {
    if (status !== 'active') return
    const id = setInterval(() => forceTick((t) => t + 1), 200)
    return () => clearInterval(id)
  }, [status])

  const reference =
    status === 'paused' && pausedAtRef.current !== null ? pausedAtRef.current : Date.now()
  const rawElapsed =
    sessionStartRef.current === null
      ? 0
      : reference - sessionStartRef.current - totalPausedMsRef.current
  const elapsedMs = Math.min(Math.max(0, rawElapsed), totalMs)

  let currentIndex = timeline.length
  let remainingMs = 0
  for (let i = 0; i < timeline.length; i++) {
    const start = cumulativeMs[i]
    const end = start + timeline[i].duration * 1000
    if (elapsedMs < end) {
      currentIndex = i
      remainingMs = end - elapsedMs
      break
    }
  }

  useEffect(() => {
    if (status === 'active' && totalMs > 0 && elapsedMs >= totalMs) {
      setStatus('finished')
    }
  }, [elapsedMs, totalMs, status])

  const start = useCallback(() => {
    sessionStartRef.current = Date.now()
    totalPausedMsRef.current = 0
    pausedAtRef.current = null
    setStatus('active')
  }, [])

  const pause = useCallback(() => {
  if (status !== 'active') return
  pausedAtRef.current = Date.now()
  setStatus('paused')
}, [status])

const resume = useCallback(() => {
  if (status !== 'paused' || pausedAtRef.current === null) return
  totalPausedMsRef.current += Date.now() - pausedAtRef.current
  pausedAtRef.current = null
  setStatus('active')
}, [status])

  const jumpTo = useCallback(
    (destIndex) => {
      if (status !== 'active' || sessionStartRef.current === null) return
      const clamped = Math.max(1, Math.min(destIndex, timeline.length))
      const desiredElapsed = clamped >= timeline.length ? totalMs : cumulativeMs[clamped]
      totalPausedMsRef.current = Date.now() - sessionStartRef.current - desiredElapsed
      if (clamped >= timeline.length) {
        setStatus('finished')
      }
      forceTick((t) => t + 1)
    },
    [status, timeline.length, cumulativeMs, totalMs]
  )

  const next = useCallback(() => jumpTo(currentIndex + 1), [jumpTo, currentIndex])
  const previous = useCallback(() => jumpTo(currentIndex - 1), [jumpTo, currentIndex])

  const stop = useCallback(() => {
    sessionStartRef.current = null
    pausedAtRef.current = null
    totalPausedMsRef.current = 0
    setStatus('idle')
  }, [])

  const currentPhase = timeline[currentIndex] ?? null
  const nextPhase = timeline[currentIndex + 1] ?? null

  return {
    status,
    currentPhase,
    nextPhase,
    remainingSeconds: Math.max(0, Math.ceil(remainingMs / 1000)),
    elapsedRealSeconds: Math.round(Math.max(0, elapsedMs - prestartMs) / 1000),
    phaseCount: Math.max(0, timeline.length - 1),
    start,
    pause,
    resume,
    next,
    previous,
    stop,
  }
}

