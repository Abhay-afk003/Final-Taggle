import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SimpleCarouselProps {
  children: React.ReactNode[];
  cardsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  gap?: number;
  className?: string;
}

const SimpleCarousel: React.FC<SimpleCarouselProps> = ({
  children,
  cardsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 24,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(cardsPerView.mobile);
  const [containerWidth, setContainerWidth] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const totalCards = children.length;
  const maxIndex = Math.max(0, totalCards - cardsVisible);

  // Fixed card widths for different screen sizes
  const getCardWidth = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      return 380; // Desktop: 380px per card
    } else if (width >= 768) {
      return 350; // Tablet: 350px per card
    } else {
      return Math.min(320, width - 48); // Mobile: 320px max, with 24px padding on each side
    }
  };

  // Handle responsive cards per view and container sizing
  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      let newCardsVisible = cardsPerView.mobile;
      
      if (width >= 1024) {
        newCardsVisible = cardsPerView.desktop;
      } else if (width >= 768) {
        newCardsVisible = cardsPerView.tablet;
      }
      
      setCardsVisible(newCardsVisible);
      
      // Update container width
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [cardsPerView]);

  // Update current index when cards visible changes
  useEffect(() => {
    const newMaxIndex = Math.max(0, totalCards - cardsVisible);
    if (currentIndex > newMaxIndex) {
      setCurrentIndex(newMaxIndex);
    }
  }, [cardsVisible, totalCards, currentIndex]);

  // Navigation functions with proper index validation
  const goToNext = () => {
    const newIndex = currentIndex + 1;
    if (newIndex <= maxIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const goToPrev = () => {
    const newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
    }
  };

  // Calculate transform for smooth sliding with fixed card width
  const cardWidth = getCardWidth();
  const translateX = currentIndex * (cardWidth + gap);

  // Calculate total track width
  const trackWidth = totalCards * cardWidth + (totalCards - 1) * gap;

  return (
    <div className={`simple-carousel ${className}`}>
      {/* Main carousel wrapper */}
      <div className="simple-carousel-wrapper" ref={containerRef}>
        {/* Left Arrow - Only show if we can go back */}
        {currentIndex > 0 && (
          <button
            className="simple-carousel-arrow simple-carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous cards"
            type="button"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right Arrow - Only show if we can go forward */}
        {currentIndex < maxIndex && (
          <button
            className="simple-carousel-arrow simple-carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next cards"
            type="button"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Cards container with overflow hidden */}
        <div className="simple-carousel-overflow">
          <div
            ref={trackRef}
            className="simple-carousel-track"
            style={{
              transform: `translateX(-${translateX}px)`,
              width: `${trackWidth}px`,
            }}
          >
            {children.map((child, index) => (
              <div
                key={index}
                className="simple-carousel-card"
                style={{ 
                  width: `${cardWidth}px`,
                  marginRight: index < children.length - 1 ? `${gap}px` : '0',
                  flexShrink: 0,
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCarousel;