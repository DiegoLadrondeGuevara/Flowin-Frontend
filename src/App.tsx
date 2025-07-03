import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import Sala from './pages/Sala';
import Perfil from './pages/Perfil';
import EditarPerfil from './pages/EditarPerfil';
import RedirectToStart from './components/RedirectToStart';
import CrearSalaPage from './pages/CrearSalaPage';
import ErrorPage from './pages/ErrorPage';
import ErrorTestPage from './pages/ErrorTestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToStart />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/usuario/registrarse" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/seleccion-artistas" element={<EditarPerfil />} />
        <Route path="/usuario/perfil" element={<Perfil />} />
        <Route path="/crear-sala" element={<CrearSalaPage />} />
        <Route path="/sala/:id" element={<Sala />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/test-errors" element={<ErrorTestPage />} />
        <Route path="*" element={<ErrorPage errorType="notFound" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;