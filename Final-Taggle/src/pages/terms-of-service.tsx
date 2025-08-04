import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <p className="text-sm text-gray-500 mb-6">Effective Date: June 25, 2025</p>

      <p className="mb-4">
        Welcome to Taggle. By joining our waitlist, you agree to the following terms:
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Waitlist Purpose</h2>
      <p className="mb-4">
        Taggle’s waitlist allows users to express early interest in our upcoming SaaS platform. Joining the waitlist does not guarantee early access, availability, or pricing.
      </p>

      <h2 className="text-xl font-semibold mb-2">2. Communications</h2>
      <p className="mb-4">
        By submitting your email, you agree to receive updates from Taggle, including product announcements, launch notifications, and related updates. You may unsubscribe at any time.
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
      <p className="mb-4">
        All content on this site, including the Taggle name, logo, and visual assets, is owned by Taggle and protected under applicable intellectual property laws.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
      <p className="mb-4">
        Taggle is currently in its early access stage. We are not liable for any damages resulting from the use, access, or inability to access waitlist-related services.
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms & Conditions at any time. Continued use of the site after any changes constitutes acceptance of the updated terms.
      </p>
    </div>
  );
};

export default TermsOfService;