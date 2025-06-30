import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import ReproductorTest from './pages/ReproductorTest'; // Asegúrate de tener este archivo creado

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de prueba para el reproductor, debe ir antes que el catch-all */}
        <Route path="/reproductor-test" element={<ReproductorTest />} />

        {/* Rutas principales */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/usuario/registrarse" element={<Signup />} />
        <Route path="/home" element={<Home />} />

        {/* Catch-all: redirecciona a login si no coincide otra ruta */}
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
