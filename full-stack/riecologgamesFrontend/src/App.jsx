import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListGameComponent from './components/ListGameComponent'
import { BrowserRouter,Routes,Route }   from 'react-router-dom'

function App() {
 

  return (
   <>
    <BrowserRouter>

      <Routes>
        <Route path="/sex" element={<ListGameComponent />} />
      </Routes>
      
    </BrowserRouter>  
   </>
  )
}

export default App
