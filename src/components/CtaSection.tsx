import React from 'react';

// Function to scroll to the waitlist section
const scrollToWaitlist = () => {
  const element = document.getElementById('waitlist-section');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl text-white mb-4 leading-tight">
            Ready to Transform Your Lead Generation?
          </h2>
          
          <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of founders who've already discovered the power of qualified leads delivered to their inbox.
          </p>
          
          <button
            onClick={scrollToWaitlist}
            className="cta-button"
            aria-label="Get early access to Taggle"
          >
            Get Early Access
          </button>
          
          <p className="text-gray-400 text-sm mt-4">
            ✨ No spam, no exports, just results
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;