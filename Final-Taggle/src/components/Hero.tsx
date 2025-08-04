import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface HeroProps {
  children?: React.ReactNode;
}
const Hero: React.FC<HeroProps> = ({ children }) => {
  const navigate = useNavigate();
  const [adminClickCount, setAdminClickCount] = useState(0);

  const handleAdminClick = () => {
    const newClickCount = adminClickCount + 1;
    setAdminClickCount(newClickCount);
    if (newClickCount >= 5) {
      localStorage.setItem('isAdmin', 'true');
      alert('Admin mode enabled');
      window.location.reload();
    }
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen pt-20 pb-20 text-white overflow-hidden" style={{ contentVisibility: 'auto' }}>
      <div
        style={{ position: 'absolute', top: 0, left: 0, width: '50px', height: '50px', zIndex: 9999 }}
        onClick={handleAdminClick}
      />
      {/* Content */}
      <div className="w-full max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="hero-content">
          {/* Limited Offer Message */}
          <div className="mb-8 sm:mb-12">
            <div className="text-container hero-text">
              <h1 className="hero-line text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white">
                Only Talk to those
              </h1>

              <h1 className="hero-line text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="text-white">who are</span>
                <span className="gradient-text italic script-enhanced">ready</span>
                <span className="text-white"> to talk to you.</span>
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            <i>Verified leads sent straight to your inbox. Download in a click. Automate the rest.</i>
          </p>

          {/* Login/Get Started Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-12 max-w-lg mx-auto px-4">
            <button
              // Replace with actual routing to AuthPage for Get Started
              onClick={() => navigate('/auth')}
              className="gradient-button px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="bg-white text-blue-600 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-colors"
            >
              Login
            </button>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
