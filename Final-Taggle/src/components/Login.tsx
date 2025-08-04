typescriptreact
import React from 'react';

const Login: React.FC = () => {
  const handleGoogleSignIn = () => {
    // Placeholder for Google Sign-in logic
    console.log('Google Sign-in button clicked');
    // In a real application, you would call your Firebase signInWithGoogle function here
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;