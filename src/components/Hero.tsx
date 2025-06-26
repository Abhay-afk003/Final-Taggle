import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useWaitlist } from '../hooks/useWaitlist';

interface HeroProps {
  children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(134);
  const { joinWaitlist, getWaitlistCount, isSubmitting } = useWaitlist();

  // Fetch waitlist count on component mount
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const count = await getWaitlistCount();
        setWaitlistCount(count);
      } catch (error) {
        console.error('Error fetching waitlist count:', error);
      }
    };

    fetchCount();
  }, [getWaitlistCount]);

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    const success = await joinWaitlist(email.trim());
    
    if (success) {
      setEmail(''); // Clear the input
      setWaitlistCount((prev) => prev + 1); // Update count
    }
  };

  return (
    <section 
      className="relative flex flex-col items-center justify-center min-h-screen pt-20 pb-20 text-white overflow-hidden"
      style={{ contentVisibility: 'auto' }}
    >
      {/* Content */}
      <div className="w-full max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="hero-content">
          {/* Main Headline */}
          <div className="mb-8 sm:mb-12">
            <div className="text-container hero-text">
              <h1 className="hero-line text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white">
                You Built It.
              </h1>
              
              <h1 className="hero-line text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span className="text-white">Now Find </span>
                <span className="gradient-text italic script-enhanced">Who</span>
                <span className="text-white"> Needs It.</span>
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Done chasing leads? We'll send qualified ones right to your inbox.
          </p>

          {/* Waitlist Form */}
          <form
            onSubmit={handleWaitlistSubmit}
            id="waitlist-section"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-lg mx-auto px-4"
          >
            <div className="relative w-full sm:flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="hero-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                style={{ fontSize: '16px' }}
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
            <button
              type="submit"
              className="gradient-button"
              disabled={isSubmitting || !email.trim()}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Joining...
                </>
              ) : (
                'Join Waitlist'
              )}
            </button>
          </form>

          {/* Social Proof */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 px-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <picture key={num}>
                    <source 
                      srcSet={`/images/trusted-by-avatars/person${num}.png?format=webp`} 
                      type="image/webp"
                      width="40"
                      height="40"
                    />
                    <img 
                      src={`/images/trusted-by-avatars/person${num}.png`} 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover" 
                      alt="User"
                      width="40"
                      height="40"
                      loading="lazy"
                    />
                  </picture>
                ))}
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white text-sm sm:text-base">{waitlistCount.toLocaleString()}+ early adopters</p>
                <p className="text-gray-400 text-xs sm:text-sm">already in the waitlist</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-xs sm:text-sm">No spam, just quality updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;