import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="w-full z-50 bg-transparent relative">
      <div className="header-container">
        {/* Left Section - Logo */}
        <div className="header-logo">
          <img 
            src="/Untitled design.png" 
            alt="Taggle Logo" 
            className="h-6 w-6 sm:h-8 sm:w-8 object-contain" 
          />
          <span className="text-white text-lg sm:text-xl tracking-tight font-medium">
            aggle
          </span>
        </div>

        {/* Center Section - Navigation (Desktop) */}
        <nav className="header-nav">
          <div className="header-nav-links">
            <a 
              href="#features" 
              className="header-nav-link"
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="header-nav-link"
            >
              Pricing
            </a>
            <a 
              href="#login" 
              className="header-nav-link"
            >
              Login
            </a>
          </div>
        </nav>

        {/* Right Section - CTA Button (Desktop) */}
        <div className="header-cta">
          <a
            href="#get-started"
            className="gradient-button header-cta-button"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="header-mobile-toggle"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          type="button"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="header-mobile-overlay"
          >
            <motion.div
              ref={menuRef}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              className="header-mobile-menu"
            >
              <button
                className="header-mobile-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                type="button"
              >
                <X className="w-6 h-6" />
              </button>
              
              <nav className="header-mobile-nav">
                <a 
                  href="#features" 
                  onClick={() => setMenuOpen(false)} 
                  className="header-mobile-link"
                >
                  Features
                </a>
                <a 
                  href="#pricing" 
                  onClick={() => setMenuOpen(false)} 
                  className="header-mobile-link"
                >
                  Pricing
                </a>
                <a 
                  href="#login" 
                  onClick={() => setMenuOpen(false)} 
                  className="header-mobile-link"
                >
                  Login
                </a>
                <a
                  href="#get-started"
                  className="gradient-button header-mobile-cta"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;