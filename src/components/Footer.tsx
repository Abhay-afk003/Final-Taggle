import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  onShowPrivacy: () => void;
  onShowTerms: () => void;
}

const Footer: FC<FooterProps> = ({ onShowPrivacy, onShowTerms }) => {
  return (
    <footer className="relative bg-background text-white font-sans pt-16 sm:pt-20 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4 sm:mb-6">
              <img
                src="/Untitled design.png"
                alt="logo"
                className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
              />
              <span className="ml-0 text-lg sm:text-xl font-heading text-white">
                aggle
              </span>
            </div>
            <p className="text-white/70 mb-4 sm:mb-6 max-w-sm text-sm sm:text-base leading-relaxed">
              Done chasing leads? We'll send qualified ones right to your inbox.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://x.com/Taggle003?t=Y22m6F_aT2Ndendy6ZHt8w&s=08"
                className="p-2 rounded-md bg-surface-medium hover:bg-surface-dark transition"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 hover:text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/taggle003/"
                className="p-2 rounded-md bg-surface-medium hover:bg-surface-dark transition"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-base sm:text-lg text-white mb-4 sm:mb-6">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 sm:gap-y-4">
              {['Home', 'Features', 'Pricing'].map((link, i) => (
                <a
                  key={i}
                  href={`#${link.toLowerCase()}`}
                  className="text-white/70 hover:text-primary-light transition duration-300 text-sm sm:text-base"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-white/50 gap-4">
          <p className="text-white/50 text-center md:text-left">
            © 2025 Taggle. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {['Privacy Policy', 'Terms of Service'].map((text) => {
              const isPrivacy = text === 'Privacy Policy';
              return (
                <button
                  key={text}
                  onClick={() => {
                    if (isPrivacy) {
                      onShowPrivacy();
                    } else {
                      onShowTerms();
                    }
                  }}
                  className="text-white/50 hover:text-white transition duration-300 cursor-pointer"
                >
                  {text}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;