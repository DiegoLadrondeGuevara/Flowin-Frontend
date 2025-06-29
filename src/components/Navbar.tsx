import React from 'react';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  // Aquí podrías usar un contexto de autenticación para saber si el usuario está logueado
  const isLoggedIn = true; // Cambia esto según tu lógica real

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>FlowIn</div>
      <div style={styles.links}>
        {!isLoggedIn && (
          <>
            <a href="/login" style={styles.link}>Login</a>
            <a href="/signup" style={{ ...styles.link, ...styles.signup }}>Registrarse</a>
          </>
        )}
        {isLoggedIn && <LogoutButton />}
      </div>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#3b82f6', // ring-blue-500
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    color: 'white',
    fontWeight: 700,
    fontSize: '1.7rem',
    letterSpacing: '1px',
    fontFamily: 'Poppins, sans-serif',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '1rem',
    padding: '0.5rem 1.1rem',
    borderRadius: '6px',
    transition: 'background 0.2s',
    background: 'transparent',
  },
  signup: {
    background: 'white',
    color: '#3b82f6',
    fontWeight: 700,
    border: 'none',
  },
};

export default Navbar; 