import React from "react";
import SalaCard from "../components/ui/SalaCard";
import LogoutButton from "../components/LogoutButton";

interface Sala {
  id: string;
  nombre: string;
  personas: number;
  genero: string;
  artista: string;
}

const salas: Sala[] = [
  {
    id: "1",
    nombre: "Sala Rock",
    personas: 10,
    genero: "Rock",
    artista: "Queen",
  },
  {
    id: "2",
    nombre: "Sala Pop",
    personas: 25,
    genero: "Pop",
    artista: "Taylor Swift",
  },
  {
    id: "3",
    nombre: "Sala Jazz",
    personas: 7,
    genero: "Jazz",
    artista: "Miles Davis",
  },
];

const Home: React.FC = () => {
  const handleEntrar = (salaId: string) => {
    alert(`Entrando a la sala ${salaId}`);
  };

  return (
    <div style={styles.container}>
      <LogoutButton />
      <div style={styles.header}>
        <h1 style={styles.title}>¡Hey, Usuario!</h1>
        <h2 style={styles.subtitle}>¿Qué planes para hoy?</h2>
      </div>
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
    padding: "40px 20px",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#87ceeb",
    overflowY: "auto",
  },
  header: {
    textAlign: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: "3rem",
    fontWeight: 600,
    margin: 0,
  },
  subtitle: {
    fontSize: "1.8rem",
    marginTop: 10,
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
    maxWidth: 1000,
    width: "100%",
  },
};

export default Home;
