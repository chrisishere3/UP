import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Find or create the root element
const rootElement = document.getElementById('rental-description-generator') || 
  (() => {
    const el = document.createElement('div');
    el.id = 'rental-description-generator';
    document.body.appendChild(el);
    return el;
  })();

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);