import './App.css'
import ListGameComponent from './components/ListGameComponent'
import GameComponent from './components/GameComponent'
import RegisterCustomerComponent from './components/RegisterCustomerComponent'
import LoginComponent from "./components/LoginComponent";
import { isLoggedIn, logout } from "./services/AuthService";
import ListProductComponent from './components/ListProductComponent'
// 1. Importa il componente appena modificato
import ArrivedProductComponent from './components/ArrivedProductComponent'
import RequestProductComponent from './components/RequestProductComponent'
 
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {

  // Aggiunto per evitare errori col tuo pulsante di logout
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

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
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              {/* 2. Aggiunto il Link di navigazione per Arrived Product */}
              <li className="nav-item">
                <Link className="nav-link" to="/arrived_product">Arrived Product</Link>
              </li>

                <li className="nav-item">
                <Link className="nav-link" to="/request_product">Request Stock</Link>
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
        <Route path="/products" element={<ListProductComponent />} />
        {/* 3. Aggiunta la rotta per accedere al componente tramite URL */}
        <Route path="/arrived_product" element={<ArrivedProductComponent />} />
        <Route path="/request_product" element={<RequestProductComponent />} />
      </Routes>
      
    </BrowserRouter>  
   </>
  )
}

export default App