import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // usa react-router-dom
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import { TokenProvider } from './contexts/TokenContext';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/usuario/registrarse" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  </StrictMode>
);
