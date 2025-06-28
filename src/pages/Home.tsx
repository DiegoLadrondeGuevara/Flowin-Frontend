// src/pages/Home.tsx
import React from 'react';
import SalaCard from '../components/ui/SalaCard';

interface Sala {
  id: string;
  nombre: string;
  personas: number;
  genero: string;
  artista: string;
}

const salas: Sala[] = [
  {
    id: '1',
    nombre: 'Sala Rock',
    personas: 10,
    genero: 'Rock',
    artista: 'Queen',
  },
  {
    id: '2',
    nombre: 'Sala Pop',
    personas: 25,
    genero: 'Pop',
    artista: 'Taylor Swift',
  },
  {
    id: '3',
    nombre: 'Sala Jazz',
    personas: 7,
    genero: 'Jazz',
    artista: 'Miles Davis',
  },
];

const Home: React.FC = () => {

  const handleEntrar = (salaId: string) => {
    alert(`Entrando a la sala ${salaId}`);
    // Aquí podés agregar la navegación a la sala o lógica que quieras
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hola Usuario, a dónde quieres ir?</h1>
      <div style={styles.grid}>
        {salas.map((sala) => (
          <SalaCard
            key={sala.id}
            nombre={sala.nombre}
            personas={sala.personas}
            genero={sala.genero}
            artista={sala.artista}
            onEntrar={() => handleEntrar(sala.id)}
          />
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#87ceeb', // azul celeste
    color: '#fff',              // texto blanco
  },
  title: {
    fontSize: '2.8rem',
    fontWeight: '700',
    marginBottom: 30,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    maxWidth: 1000,
    width: '100%',
  }
};

export default Home;
