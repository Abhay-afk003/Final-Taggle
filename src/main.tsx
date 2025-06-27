import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './global.css';
import { db } from '/home/user/Final-Taggle/src/lib/firebase';
import ToastProvider from './components/ToastProvider'; // ✅ Import the styled provider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>
);
