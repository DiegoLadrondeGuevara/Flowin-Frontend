// src/components/SalaCard.tsx
import React from 'react';

interface SalaCardProps {
  nombre: string;
  personas: number;
  genero: string;
  artista: string;
  onEntrar: () => void;
}

const SalaCard: React.FC<SalaCardProps> = ({ nombre, personas, genero, artista, onEntrar }) => {
  return (
    <div style={styles.card}>
      <h2>{nombre}</h2>
      <p><strong>Personas escuchando:</strong> {personas}</p>
      <p><strong>Género:</strong> {genero}</p>
      <p><strong>Artista:</strong> {artista}</p>
      <button style={styles.boton} onClick={onEntrar}>Entrar a la Sala</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    border: '1px solid #ddd',
    borderRadius: 8,
    padding: 20,
    width: 250,
    margin: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  boton: {
    marginTop: 10,
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: 10,
    borderRadius: 5,
    cursor: 'pointer'
  }
};

export default SalaCard;
