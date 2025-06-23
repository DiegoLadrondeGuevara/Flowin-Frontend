import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import { TokenProvider } from './contexts/TokenContext'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/usuario/registrarse" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  </StrictMode>
);
