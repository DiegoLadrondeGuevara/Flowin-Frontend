import './styles/index.css'; // <--- Importa tu CSS global aquí
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { TokenProvider } from './contexts/TokenContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokenProvider>
      <App />
    </TokenProvider>
  </StrictMode>
);
