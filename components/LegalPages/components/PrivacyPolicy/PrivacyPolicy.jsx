import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-base-content">Privacy Policy</h1>
      <div className="h-px w-full bg-base-content/20"></div>
      <p className="text-base-content/70 text-lg leading-relaxed">
        Last Updated: January 2026. At AssetVerse, we value your privacy and are committed to protecting personal and organizational data. This Privacy Policy outlines what information we collect, how it is used, and your rights regarding your data.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Information We Collect</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        AssetVerse collects information to provide a seamless, secure, and personalized experience. Types of data include:
      </p>
      <ul className="list-disc list-inside text-base-content/70 space-y-2 text-lg leading-relaxed mt-3">
        <li><strong>Personal Data:</strong> Names, emails, roles, and organization details.</li>
        <li><strong>Usage Data:</strong> Login times, asset requests, interactions with the dashboard, and system navigation patterns.</li>
        <li><strong>Device & Technical Data:</strong> IP addresses, browser type, operating system, and device identifiers to optimize platform performance.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-base-content mt-6">How We Use Your Data</h2>
      <ul className="list-disc list-inside text-base-content/70 space-y-2 text-lg leading-relaxed mt-3">
        <li>Authentication and role verification for secure access.</li>
        <li>Tracking asset requests, assignments, and approvals.</li>
        <li>Improving system performance, security, and user experience.</li>
        <li>Communicating platform updates, notifications, and alerts.</li>
        <li>Analytics for reporting and organizational insights.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Data Sharing & Security</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        AssetVerse does not sell personal data. Data is only shared with trusted third-party services necessary for platform operation, such as Firebase, MongoDB, and Stripe. All data is encrypted, and access is strictly role-based. We implement industry-standard security measures to prevent unauthorized access or data breaches.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">User Rights</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        Users have the right to access, update, or request deletion of their personal information. Requests are handled in accordance with organizational policies and legal requirements.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Cookies & Tracking</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        AssetVerse uses cookies to enhance functionality, remember preferences, and improve user experience. Cookies may also be used for analytics and system optimization.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Policy Updates</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        We may update this Privacy Policy periodically. Users are encouraged to review it regularly. Continued use of the platform indicates acceptance of the updated policy.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
