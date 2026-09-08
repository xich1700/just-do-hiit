import { Routes, Route } from 'react-router-dom'
import CatalogPage from './pages/CatalogPage.jsx'
import PreviewPage from './pages/PreviewPage.jsx'
import RunPage from './pages/RunPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/sessions/:id" element={<PreviewPage />} />
      <Route path="/sessions/:id/run" element={<RunPage />} />
    </Routes>
  )
}

export default App

