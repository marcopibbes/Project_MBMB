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
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Riecologgames</Link>
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/games">Catalogo</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">Aggiungi al catalogo</Link>
              </li>
            
              <li className="nav-item">
                <Link className="nav-link" to="/products">Magazzino</Link>
              </li>
              {/* 2. Aggiunto il Link di navigazione per Arrived Product */}
              <li className="nav-item">
                <Link className="nav-link" to="/arrived_product">Gestione Magazzino</Link>
              </li>

                <li className="nav-item">
                <Link className="nav-link" to="/request_product">Richiedi</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
                <li className="nav-item">
                <Link className="nav-link" to="/register_customer">Registrati</Link>
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
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
      
    </BrowserRouter>  
   </>
  )
}

export default App