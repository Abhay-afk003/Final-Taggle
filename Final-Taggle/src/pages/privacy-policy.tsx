import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500">Effective Date: June 25, 2025</p>

      <p className="mt-4">Your privacy is important to us. This Privacy Policy explains how Taggle collects, uses, and protects your information.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p>Email address when you join the waitlist.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p>We use your email to:</p>
      <ul className="list-disc ml-6">
        <li>Share product updates and launch information</li>
        <li>Understand demand for our product</li>
        <li>Improve outreach and communication</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Storage</h2>
      <p>Emails are securely stored using Google Firebase Firestore. Access is restricted to authorized personnel only.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Sharing</h2>
      <p>We do not sell, rent, or share your email address with any third party.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p>You may:</p>
      <ul className="list-disc ml-6">
        <li>Access or request deletion of your personal data</li>
        <li>Unsubscribe at any time via email or unsubscribe links</li>
      </ul>
      <p className="mt-2">For data requests, contact taggle003@gmail.com.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Updates to This Policy</h2>
      <p>We may update this policy. Changes will be reflected on this page with a revised effective date.</p>
    </div>
  );
};

export default PrivacyPolicy;