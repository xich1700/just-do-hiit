import { useParams, Link } from 'react-router-dom'

function RunPage() {
  const { id } = useParams()

  return (
    <div>
      <p>Conducting screen for "{id}" — coming in the next step.</p>
      <Link to={`/sessions/${id}`}>&larr; Back to preview</Link>
    </div>
  )
}

export default RunPage
