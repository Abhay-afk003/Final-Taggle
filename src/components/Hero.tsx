import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { db } from '../lib/firebase'; // Import db
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'; // Import Firestore functions
import toast from 'react-hot-toast'; // Import toast

interface HeroProps {
  children?: React.ReactNode;
}

const BASE_WAITLIST_COUNT = 10; // You can adjust this base number

const Hero: React.FC<HeroProps> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(BASE_WAITLIST_COUNT);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to fetch waitlist count from Firestore
  const getWaitlistCount = async (): Promise<number> => {
    try {
      const querySnapshot = await getDocs(collection(db, "waitlist"));
      return BASE_WAITLIST_COUNT + querySnapshot.size;
    } catch (error) {
      console.error('Error fetching waitlist count:', error);
      // Optionally show an error toast if fetching count fails
      // toast.error('Failed to fetch waitlist count.');
      return BASE_WAITLIST_COUNT; // Return base count in case of error
    }
  };

  // Fetch waitlist count on component mount
  useEffect(() => {
    fetchCount();
  }, []); // Empty dependency array to run only on mount

  const fetchCount = async () => {
    const count = await getWaitlistCount();
    setWaitlistCount(count);
  };


  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address.'); // Added a toast for empty email
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if email already exists
      const q = query(collection(db, "waitlist"), where("email", "==", email.trim()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error('You are already on the waitlist!');
      } else {
        // Add email to Firestore
        await addDoc(collection(db, "waitlist"), {
          email: email.trim(),
          timestamp: new Date(),
        });
        toast.success('Successfully joined the waitlist!');
        setEmail(''); // Clear the input
        setWaitlistCount((prev) => prev + 1); // Update count
      }
    } catch (error) {
      console.error('Error joining waitlist:', error);
      toast.error('Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
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
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover" // Use template literal for src
                      alt="User"
                      width="40"
                      height="40"
                      loading="lazy"
                    />
                  </picture>
                ))}
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white text-sm sm:text-base">{waitlistCount.toLocaleString()} early adopters</p>
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