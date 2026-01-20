import React from "react";

const AssetManagement = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-base-content">Asset Management</h1>
      <p className="text-base-content/70 text-lg leading-relaxed">
        AssetVerse provides a complete, centralized system to manage all your organization's assets efficiently. From IT equipment to office furniture, software licenses, and cloud subscriptions, every asset is tracked, assigned, and monitored with full transparency.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Core Features</h2>
      <ul className="list-disc list-inside text-base-content/70 space-y-2 text-lg leading-relaxed mt-3">
        <li><strong>Centralized Inventory:</strong> Keep track of all physical and digital assets in a single dashboard.</li>
        <li><strong>Asset Assignment:</strong> Assign assets to employees with clear visibility of usage history.</li>
        <li><strong>Return & Replacement:</strong> Automate returns, replacements, and approvals to minimize delays.</li>
        <li><strong>Category Management:</strong> Organize assets by department, type, or priority for efficient management.</li>
        <li><strong>Audit & Compliance:</strong> Full audit trail ensures accountability and regulatory compliance.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Benefits for Organizations</h2>
      <ul className="list-disc list-inside text-base-content/70 space-y-2 text-lg leading-relaxed mt-3">
        <li>Reduce lost or misplaced assets</li>
        <li>Increase operational efficiency</li>
        <li>Provide transparency for HR and Finance teams</li>
        <li>Enable data-driven decisions for procurement and upgrades</li>
      </ul>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Why Choose AssetVerse for Asset Management?</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        With AssetVerse, organizations no longer rely on scattered spreadsheets or manual tracking. Automated notifications, detailed reports, and role-based access ensure that every asset is properly monitored, improving accountability, and saving time and money.
      </p>
    </div>
  );
};

export default AssetManagement;
