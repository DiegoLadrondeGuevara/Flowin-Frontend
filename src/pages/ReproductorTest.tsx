import AudioPlayer from '../components/AudioPlayer';

const ReproductorTest = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial' }}>
      <h2>Reproductor de Música - Test</h2>
      <p>Si todo está bien configurado, deberías poder reproducir la canción:</p>

      {/* Prueba simple con <audio> */}
      <audio controls style={{ width: '100%', marginTop: '20px' }}>
        <source src="http://localhost:8080/music/TNT.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>

      <hr style={{ margin: '40px 0' }} />

      {/* Prueba con componente personalizado */}
      <AudioPlayer />
    </div>
  );
};

export default ReproductorTest;
