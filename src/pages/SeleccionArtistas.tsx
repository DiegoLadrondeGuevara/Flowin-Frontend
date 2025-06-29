// src/pages/SeleccionArtistas.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { actualizarArtistasFavoritos } from '../api';

interface Artista {
  nombre: string;
  imagen: string;
}

const ARTISTAS: Artista[] = [
  { nombre: 'Queen', imagen: '/assets/artistas/queen.jpg' },
  { nombre: 'Taylor Swift', imagen: '/assets/artistas/taylor.jpg' },
  { nombre: 'Bad Bunny', imagen: '/assets/artistas/badbunny.jpg' },
  { nombre: 'The Beatles', imagen: '/assets/artistas/beatles.jpg' },
  { nombre: 'Dua Lipa', imagen: '/assets/artistas/dualipa.jpg' },
];

const SeleccionArtistas: React.FC = () => {
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleSeleccion = (nombre: string) => {
    setSeleccionados((prev) =>
      prev.includes(nombre) ? prev.filter((n) => n !== nombre) : [...prev, nombre]
    );
  };

  const handleContinuar = async () => {
    try {
      await actualizarArtistasFavoritos(seleccionados);
      navigate('/home');
    } catch (error) {
      console.error('Error al actualizar artistas:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Elige tus artistas favoritos</h1>
      <div style={styles.grid}>
        {ARTISTAS.map((artista) => (
          <div
            key={artista.nombre}
            onClick={() => toggleSeleccion(artista.nombre)}
            style={{
              ...styles.card,
              border: seleccionados.includes(artista.nombre) ? '3px solid #4CAF50' : '1px solid #ccc',
            }}
          >
            <img src={artista.imagen} alt={artista.nombre} style={styles.image} />
            <p style={styles.name}>{artista.nombre}</p>
          </div>
        ))}
      </div>
      <button style={styles.boton} onClick={handleContinuar} disabled={seleccionados.length === 0}>
        Continuar
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 40,
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center',
    backgroundColor: '#87ceeb',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: 30,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  card: {
    width: 150,
    cursor: 'pointer',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease-in-out',
  },
  image: {
    width: '100%',
    borderRadius: 8,
  },
  name: {
    marginTop: 10,
    fontWeight: 600,
  },
  boton: {
    marginTop: 30,
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
  },
};

export default SeleccionArtistas;
