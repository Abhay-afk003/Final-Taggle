import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState
import Header from './components/Header';
import Hero from './components/Hero';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getRedirectResult } from 'firebase/auth'; // Import getRedirectResult
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Aurora from './backgrounds/Aurora/Aurora';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage'; // Import AuthPage
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ScrapingComponent from './components/ScrapingComponent';
import { auth, db } from "./lib/firebase";
import './global.css';
import { Route, Routes, useNavigate } from 'react-router-dom'; // Import necessary routing components

// PrivateRoute component to protect routes
const PrivateRoute: React.FC<{ user: User | null; isLoading: boolean; children: React.ReactNode }> = ({ user, isLoading, children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return <>{children}</>;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Check for redirect result
    getRedirectResult(auth)
      .then(async (result) => {
        if (result) {
          // This is the signed-in user
          const user = result.user;
          setUser(user);

          // Check if user document exists, if not, create it
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);
          if (!docSnap.exists()) {
            await setDoc(userDocRef, {
              email: user.email,
              name: user.displayName,
            });
          }
        }
      })
      .catch((error) => {
        // Handle errors here.
        console.error("Error getting redirect result:", error);
      });

    return () => unsubscribe();
  }, []);

  const termsAndConditionsText = `
Effective Date: June 25, 2025

Welcome to Taggle. By joining our waitlist, you agree to the following terms:

1. Waitlist Purpose
Taggle's waitlist allows users to express early interest in our upcoming SaaS platform. Joining the waitlist does not guarantee early access, availability, or pricing.

2. Communications
By submitting your email, you agree to receive updates from Taggle, including product announcements, launch notifications, and related updates. You may unsubscribe at any time.

3. Intellectual Property
All content on this site, including the Taggle name, logo, and visual assets, is owned by Taggle and protected under applicable intellectual property laws.

4. Limitation of Liability
Taggle is currently in its early access stage. We are not liable for any damages resulting from the use, access, or inability to access waitlist-related services.

5. Changes to Terms
We may update these Terms & Conditions at any time. Continued use of the site after any changes constitutes acceptance of the updated terms.
`;

  const privacyPolicyText = `
Effective Date: June 25, 2025

Your privacy is important to us. This Privacy Policy explains how Taggle collects, uses, and protects your information.

1. Information We Collect
Email address when you join the waitlist.

2. How We Use Your Information
We use your email to:

Share product updates and launch information
Understand demand for our product
Improve outreach and communication

3. Data Storage
Emails are securely stored using Google Firebase Firestore. Access is restricted to authorized personnel only.

4. Data Sharing
We do not sell, rent, or share your email address with any third party.

5. Your Rights
You may:

Access or request deletion of your personal data
Unsubscribe at any time via email or unsubscribe links

For data requests, contact taggle003@gmail.com.

6. Updates to This Policy
We may update this policy. Changes will be reflected on this page with a revised effective date.
`;


  return (
    <div className="relative w-full min-h-screen bg-black">
      <Aurora
        className="fixed top-0 left-0 w-full h-full -z-10"
        colorStops={["#6366F1", "#8B5CF6", "#6366F1"]}
      /> {/* Aurora background outside of Routes */}

      <Routes>
        <Route path="/" element={
          <>
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <Hero />

            {/* Main Content */}
            <main>
              <Features />
              <Pricing />
              <Testimonials />
            </main>

            {/* CTA Section */}
            <CtaSection />

            {/* Footer */}
            <Footer onShowPrivacy={() => { /* Link to privacy route */ }} onShowTerms={() => { /* Link to terms route */ }} /> {/* Placeholder handlers for now */}
          </>
        } />

        <Route path="/auth" element={<AuthPage />} />

        {/* Route for Dashboard */}
        <Route path="/dashboard" element={
          <PrivateRoute user={user} isLoading={isLoading}><Dashboard user={user} userPlan={isAdmin ? 'admin' : undefined} /></PrivateRoute>
        } />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/scraping" element={<ScrapingComponent />} />

        {/* Routes for Privacy Policy and Terms and Conditions */}
        <Route path="/privacy" element={
          <div className="min-h-screen bg-black text-white p-8">
            <button onClick={() => window.history.back()} className="mb-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors duration-300">
              ← Back
            </button>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl mb-8 gradient-text">Privacy Policy</h1>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-gray-300 text-base leading-relaxed">{privacyPolicyText}</pre>
              </div>
            </div>
          </div>
        } />

        <Route path="/terms" element={
          <div className="min-h-screen bg-black text-white p-8">
            <button onClick={() => window.history.back()} className="mb-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors duration-300">
              ← Back
            </button>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl mb-8 gradient-text">Terms & Conditions</h1>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-gray-300 text-base leading-relaxed">{termsAndConditionsText}</pre>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
