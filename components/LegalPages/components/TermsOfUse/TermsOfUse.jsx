import React from "react";

const TermsOfUse = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-base-content">Terms of Use</h1>
      <div className="h-px w-full bg-base-content/20"></div>
      <p className="text-base-content/70 text-lg leading-relaxed">
        Last Updated: January 2026. Welcome to AssetVerse. By using this platform, you agree to comply with the following Terms of Use. If you do not accept any part of these terms, please refrain from using the platform.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Acceptance of Terms</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        Using AssetVerse confirms that you have read, understood, and agreed to these Terms. This agreement applies to all users, including HR managers, employees, and any guests with limited access.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">User Accounts & Responsibilities</h2>
      <ul className="list-disc list-inside text-base-content/70 space-y-2 text-lg leading-relaxed mt-3">
        <li>Provide accurate registration information and keep it up to date.</li>
        <li>Maintain confidentiality of your account credentials.</li>
        <li>Be responsible for all actions taken under your account.</li>
        <li>Unauthorized access, misuse, or sharing of account credentials is prohibited.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Intellectual Property</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        All platform content, including logos, designs, source code, and documentation, is owned by AssetVerse or its partners. Unauthorized reproduction, distribution, or commercial use is strictly prohibited.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Data Use and Privacy</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        By using AssetVerse, you consent to the collection and use of data as outlined in our Privacy Policy. Data is used solely for operational, security, and improvement purposes.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Limitation of Liability</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        AssetVerse is provided “as is” without warranties of any kind. The company is not liable for data loss, service interruptions, or financial losses resulting from platform use.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Modification of Terms</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        AssetVerse may update these Terms periodically. Users are encouraged to review the Terms regularly. Continued use of the platform constitutes acceptance of the updated Terms.
      </p>
    </div>
  );
};

export default TermsOfUse;
