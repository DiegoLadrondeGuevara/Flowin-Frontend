import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import Sala from './pages/Sala';
import ReproductorTest from './pages/ReproductorTest'; // ⬅️ IMPORTANTE: asegúrate de que exista este archivo
import { TokenProvider } from './contexts/TokenContext';
import './styles/index.css';
import Perfil from './pages/Perfil';
import EditarPerfil from './pages/EditarPerfil';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta temporal para pruebas del reproductor */}
          <Route path="/reproductor-test" element={<ReproductorTest />} />

          {/* Rutas principales */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/usuario/registrarse" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sala" element={<Sala />} />
          <Route path="/seleccion-artistas" element={<EditarPerfil />} />


          {/* Catch-all: redirige a login */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
          <Route path="/sala" element={<Sala />} /> {/* <-- ahora correctamente usa la página de Sala */}
          <Route path="/usuario/perfil" element={<Perfil />} />

        </Routes>
      </BrowserRouter>
    </TokenProvider>
  </StrictMode>
);
