import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState('checking...')

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('backend unreachable'))
  }, [])

  return (
    <div>
      <h1>just-do-hiit</h1>
      <p>Backend status: {status}</p>
    </div>
  )
}

export default App

