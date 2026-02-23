
import './App.css'
import ListGameComponent from './components/ListGameComponent'
import GameComponent from './components/GameComponent'
 
import { BrowserRouter,Routes,Route, Link }   from 'react-router-dom'

function App() {
 

  return (
   <>
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Game App</Link>
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/games">List Games</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Create Game</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/games" element={<ListGameComponent />} />
        <Route path="/create" element={<GameComponent />} />
      </Routes>
      
    </BrowserRouter>  
   </>
  )
}

export default App
