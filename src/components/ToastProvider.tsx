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
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 4000,
          style: {
            background: 'rgba(17, 24, 39, 0.95)',
            color: '#fff',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
          
          // Success toast styling
          success: {
            duration: 5000,
            style: {
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10b981',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: 'rgba(16, 185, 129, 0.1)',
            },
          },
          
          // Error toast styling
          error: {
            duration: 6000,
            style: {
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: 'rgba(239, 68, 68, 0.1)',
            },
          },
          
          // Loading toast styling
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