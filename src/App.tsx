import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import Sala from './pages/Sala';
import Perfil from './pages/Perfil';
import EditarPerfil from './pages/EditarPerfil';
import ReproductorTest from './pages/ReproductorTest';
import RedirectToStart from './components/RedirectToStart';
import CrearSalaPage from './pages/CrearSalaPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/reproductor-test" element={<ReproductorTest />} />
        <Route path="/" element={<RedirectToStart />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/usuario/registrarse" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/seleccion-artistas" element={<EditarPerfil />} />
        <Route path="/usuario/perfil" element={<Perfil />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
        <Route path="/crear-sala" element={<CrearSalaPage />} />
        <Route path="/sala/:id" element={<Sala />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;