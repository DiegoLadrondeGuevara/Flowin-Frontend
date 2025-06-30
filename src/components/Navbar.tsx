import React from 'react';
import LogoutButton from './LogoutButton';

interface NavbarProps {
  hidePerfilButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ hidePerfilButton }) => {
  const isLoggedIn = true;

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 shadow-md sticky top-0 z-50">
      <div className="text-white font-bold text-2xl tracking-wide font-['Poppins']">
        FlowIn
      </div>
      <div className="flex items-center gap-5">
        {isLoggedIn && (
    <>
      {!hidePerfilButton && (
        <a
          href="/usuario/perfil"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md transition-colors cursor-pointer"
          title="Perfil"
        >
          <span className="text-xl">👤</span>
          Perfil
        </a>
      )}
      <LogoutButton />
    </>
  )}
      </div>
    </nav>
  );
};

export default Navbar; 