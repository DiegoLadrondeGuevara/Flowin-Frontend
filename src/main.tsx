import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import Sala from './pages/Sala'; // <-- Aquí se importa
import SeleccionArtistas from './pages/SeleccionArtistas';
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
          <Route path="/seleccion-artistas" element={<SeleccionArtistas />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sala" element={<Sala />} /> {/* <-- ahora correctamente usa la página de Sala */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  </StrictMode>
);
