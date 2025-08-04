import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useLocation, useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from "../lib/firebase"; // Import app
import { auth } from "../lib/firebase"; // Import auth

const AuthPage: React.FC = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
 navigate('/dashboard'); // Add this line
      console.error("Error signing in with Google:", error);
      // Handle errors here (e.g., display an error message to the user)
    }
  };

  const handleEmailRegistration = async () => {
    if (!registerName) {
      alert("Please enter your name.");
      return;
    }
    console.log("Register button clicked, handleEmailRegistration called"); // Add this line
    try {
      console.log("Attempting to create user with email:", registerEmail); // Log before auth call
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log("User created in Firebase Authentication:", userCredential.user); // Log after auth call
      const user = userCredential.user;
      console.log("User registered successfully:", user);

      // Save user data to Firestore
      console.log("Attempting to save user data to Firestore for UID:", user.uid); // Log before Firestore call
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: registerName, // Add this line
      });
      console.log("User data saved to Firestore!");

      navigate('/dashboard'); // Change to your desired post-registration route
    } catch (error) {
      console.error("Error during email registration:", error);
      // Handle errors here (e.g., display specific error messages to the user)
    }
  };

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log("User logged in successfully!");
      navigate('/dashboard'); // Redirect after successful login
    } catch (error) {
      console.error("Error during email login:", error);
      // You can inspect the error object to provide more specific feedback to the user.\
      // For example, error.code can tell you the type of error (e.g., \'auth/user-not-found\', \'auth/wrong-password\')
      // You might want to set a state variable to display an error message on the UI.\
      // Example: setError(\'Invalid email or password.\');
      console.error("Login Error Details:", error);
    }
  };

  const [formType, setFormType] = useState('login'); // 'login' or 'register'
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerName, setRegisterName] = useState('');

  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const db = getFirestore(app);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const form = params.get('form');
    if (form === 'register') {
      setFormType('register');
    } else {
      setFormType('login');
    }
  }, [location.search]);

  return ( // Moved the return statement here
    <section className="min-h-screen flex items-center justify-center py-12">
      <div className="container-custom">
        <div className="glass-card p-8 w-full max-w-md mx-auto">
          {formType === 'login' ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-6 brand-text">
                Login
              </h2>
              <div className="flex flex-col gap-6">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Email"
                  className="hero-input mb-4"
                />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Password"
                  className="hero-input mb-6"
                />
                <button type="button" className="gradient-button w-full mb-4" onClick={handleEmailLogin}>
                  Login
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-6 brand-text">
                Register
              </h2>
              <div className="flex flex-col gap-6">
                {formType === 'register' && (
                  <input
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Your Name"
                    className="hero-input mb-4"
                    required
                  />
                )}
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="Email"
                  className="hero-input mb-4"
                />
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Password"
                  className="hero-input mb-6"
                />
                <button type="button" className="gradient-button w-full mb-4" onClick={() => handleEmailRegistration()}>
 Register
                </button>
              </div>
            </>
          )}
          {/* Content visible in both forms within the glass-card */}
          {/* "or" separator */}
          <div className="flex items-center justify-center gap-2 my-4 flex-col">
            <span className="text-gray-400 text-sm">or</span>
          </div>

          {/* Google Sign-In button */}
          <button className="gradient-button w-full" onClick={handleGoogleSignIn}>
            <img
              src="/google.png"
              className="w-5 h-5 mr-2 inline-block align-middle" // Adjust size and margin as needed
              alt="Google Logo"
            />
            Sign In with Google
          </button>

          {/* "Already registered?" link */}
          {formType === 'register' && (
            <div className="text-center text-sm text-gray-400 mt-4">
              Already registered?{' '}
              <span className="text-purple-400 hover:text-purple-600 cursor-pointer" onClick={() => setFormType('login')}>
                Then Login
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
