import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          className: '',
          style: {
            background: 'rgba(17, 24, 39, 0.95)',
            color: '#fff',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: 500,
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
          },

          // Success styling (PURPLE glow)
          success: {
            duration: 5000,
            style: {
              background: 'linear-gradient(90deg, rgba(39, 0, 75, 0.8), rgba(168, 85, 247, 0.6))',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              color: '#c084fc',
              borderRadius: '16px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: 500,
              boxShadow: '0 0 24px rgba(168, 85, 247, 0.5), 0 4px 6px rgba(0,0,0,0.1)',
            },
            iconTheme: {
              primary: '#c084fc',
              secondary: 'rgba(168, 85, 247, 0.2)',
            },
          },

          // Error styling (RED glow)
          error: {
            duration: 6000,
            style: {
              background: 'linear-gradient(90deg, rgba(75, 0, 0, 0.8), rgba(239, 68, 68, 0.6))',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#f87171',
              borderRadius: '16px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: 500,
              boxShadow: '0 0 24px rgba(239, 68, 68, 0.4), 0 4px 6px rgba(0,0,0,0.1)',
            },
            iconTheme: {
              primary: '#f87171',
              secondary: 'rgba(239, 68, 68, 0.2)',
            },
          },

          // Loading styling
          loading: {
            style: {
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#8b5cf6',
            },
            iconTheme: {
              primary: '#8b5cf6',
              secondary: 'rgba(139, 92, 246, 0.1)',
            },
          },
        }}
      />
    </>
  );
};

export default ToastProvider;