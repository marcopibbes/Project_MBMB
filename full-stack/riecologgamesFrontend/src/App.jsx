
import './App.css'
import ListGameComponent from './components/ListGameComponent'
import GameComponent from './components/GameComponent'
import RegisterCustomerComponent from './components/RegisterCustomerComponent'
import LoginComponent from "./components/LoginComponent";
import { isLoggedIn, logout } from "./services/AuthService";
 
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
              <li className="nav-item">
                <Link className="nav-link" to="/register_customer">Register Customer</Link>
              </li>
              <li>
                {isLoggedIn() ? (
        <>
          <button 
              onClick={handleLogout}
              className="btn btn-danger m-3">
              Logout
          </button>

          <ListGameComponent />
        </>
      ) : (
        <LoginComponent />
      )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/games" element={<ListGameComponent />} />
        <Route path="/create" element={<GameComponent />} />
        <Route path="/register_customer" element={<RegisterCustomerComponent />} />
      </Routes>
      
    </BrowserRouter>  
   </>
  )
}

export default App
