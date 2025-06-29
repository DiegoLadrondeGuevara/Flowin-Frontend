import React from 'react';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  // Aquí podrías usar un contexto de autenticación para saber si el usuario está logueado
  const isLoggedIn = true; // Cambia esto según tu lógica real

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 shadow-md sticky top-0 z-50">
      <div className="text-white font-bold text-2xl tracking-wide font-['Poppins']">
        FlowIn
      </div>
      <div className="flex items-center gap-5">
        {!isLoggedIn && (
          <>
            <a href="/login" className="text-white font-medium text-base px-4 py-2 rounded-md transition-colors hover:bg-blue-500">
              Login
            </a>
            <a href="/signup" className="bg-white text-blue-600 font-bold px-4 py-2 rounded-md transition-colors hover:bg-blue-50">
              Registrarse
            </a>
          </>
        )}
        {isLoggedIn && <LogoutButton />}
      </div>
    </nav>
  );
};

export default Navbar; 