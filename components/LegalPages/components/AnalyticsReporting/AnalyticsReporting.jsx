import React from "react";

const AnalyticsReporting = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-base-content">Analytics & Reporting</h1>
      <p className="text-base-content/70 text-lg leading-relaxed">
        AssetVerse empowers organizations with real-time analytics and reporting tools. By transforming raw asset data into actionable insights, HR managers and decision-makers can optimize operations and plan future investments efficiently.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Key Features</h2>
      <ul className="list-disc list-inside text-base-content/70 space-y-2 text-lg leading-relaxed mt-3">
        <li><strong>Dashboard Analytics:</strong> Visual summaries of asset utilization, assignments, and requests.</li>
        <li><strong>Custom Reports:</strong> Generate department, employee, or asset-specific reports on demand.</li>
        <li><strong>Usage Trends:</strong> Monitor trends over time to optimize procurement and asset allocation.</li>
        <li><strong>Alerts & Notifications:</strong> Automatic alerts for pending approvals, overdue returns, and asset expiry.</li>
        <li><strong>Export & Share:</strong> Download reports in PDF or Excel formats for audits or presentations.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Benefits for Organizations</h2>
      <ul className="list-disc list-inside text-base-content/70 space-y-2 text-lg leading-relaxed mt-3">
        <li>Make data-driven decisions about resource allocation</li>
        <li>Identify underutilized or obsolete assets</li>
        <li>Track approvals and workflow efficiency</li>
        <li>Support audit and compliance requirements</li>
      </ul>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Why Choose AssetVerse for Analytics?</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        With a modern, intuitive dashboard and comprehensive reporting tools, AssetVerse turns complex asset data into meaningful insights. HR managers and executives can monitor operations in real time, forecast asset needs, and optimize organizational efficiency without manual spreadsheets.
      </p>
    </div>
  );
};

export default AnalyticsReporting;
