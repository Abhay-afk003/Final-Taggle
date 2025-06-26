import React, { useState, useEffect, useRef } from 'react';
import { X, Menu } from 'lucide-react';

interface MobileNavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  items: MobileNavItem[];
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ items, isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div className="md:hidden">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 w-64 h-full bg-surface-dark shadow-lg z-50 transform transition-transform ease-in-out duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {/* Navigation Items */}
          <nav className="mt-10">
            <ul>
              {items.map((item, index) => (
                <li key={index} className="mb-4">
                  <a
                    href={item.href}
                    className="block text-white text-lg hover:text-white/80 transition-colors"
                    onClick={onClose} // Close menu when an item is clicked
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;