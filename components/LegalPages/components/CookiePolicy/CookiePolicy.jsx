import React from "react";

const CookiePolicy = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-base-content">Cookie Policy</h1>
      <div className="h-px w-full bg-base-content/20"></div>
      <p className="text-base-content/70 text-lg leading-relaxed">
        Last Updated: January 2026. AssetVerse uses cookies and similar technologies to enhance user experience, optimize system performance, and provide analytics for continuous improvement.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">What Are Cookies?</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        Cookies are small text files stored on your device that help the platform remember your preferences, login sessions, and interactions with AssetVerse. They improve usability and performance.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Types of Cookies We Use</h2>
      <ul className="list-disc list-inside text-base-content/70 space-y-2 text-lg leading-relaxed mt-3">
        <li><strong>Essential Cookies:</strong> Required for login, authentication, and platform functionality.</li>
        <li><strong>Functional Cookies:</strong> Remember theme preferences, language settings, and user dashboard customization.</li>
        <li><strong>Analytics Cookies:</strong> Track platform usage, navigation patterns, and performance metrics to enhance user experience.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-base-content mt-6">How We Use Cookies</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        Cookies enable AssetVerse to maintain your session, remember preferences, collect anonymous usage data, and detect technical issues. This allows us to improve the platform, release updates, and provide tailored support.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Managing Cookies</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        Users can manage or disable cookies through their browser settings. Disabling essential cookies may affect core functionality. Analytics and functional cookies can also be managed via browser preferences. AssetVerse ensures minimal disruption while respecting user privacy.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Third-Party Cookies</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        Some third-party services integrated with AssetVerse, such as Firebase, Stripe, and analytics platforms, may also use cookies for authentication, transaction processing, or performance tracking. These cookies are governed by the respective third-party privacy policies.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Policy Updates</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        This Cookie Policy may be updated periodically to reflect changes in technology, platform use, or legal requirements. Users are encouraged to review the policy regularly to stay informed about how cookies are used.
      </p>
    </div>
  );
};

export default CookiePolicy;
