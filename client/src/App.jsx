import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import RequestDetail from './pages/RequestDetail'
import NewRequest from './pages/NewRequest'

function App() {
  const location = useLocation()

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <span>&#10084;</span>
            Nonprofit Requests
          </Link>
          <nav className="nav">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link
              to="/new"
              className={`nav-link ${location.pathname === '/new' ? 'active' : ''}`}
            >
              + New Request
            </Link>
          </nav>
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/request/:id" element={<RequestDetail />} />
          <Route path="/new" element={<NewRequest />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
