import React from "react";

const HelpSupport = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-base-content">Help & Support</h1>
      <div className="h-px w-full bg-base-content/20"></div>
      <p className="text-base-content/70 text-lg leading-relaxed">
        AssetVerse provides comprehensive help resources to ensure your
        organization can fully leverage the platform. This page includes
        guidance for HR managers, employees, and technical support.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">
        Support for HR Managers
      </h2>
      <ul className="list-disc list-inside text-base-content/70 space-y-2 text-lg leading-relaxed mt-3">
        <li>
          Creating and managing assets, including categories and specifications.
        </li>
        <li>Processing and approving or declining asset requests.</li>
        <li>Monitoring asset allocation across employees and departments.</li>
        <li>
          Generating reports for audits, budgeting, and operational review.
        </li>
        <li>Managing company accounts and subscription plans.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-base-content mt-6">
        Support for Employees
      </h2>
      <ul className="list-disc list-inside text-base-content/70 space-y-2 text-lg leading-relaxed mt-3">
        <li>Submitting new asset requests with details and justifications.</li>
        <li>Tracking status of pending requests and approvals.</li>
        <li>Viewing currently assigned assets and return schedules.</li>
        <li>
          Requesting returns for assets that are no longer in use or due for
          upgrade.
        </li>
        <li>Accessing usage history and documentation for assigned assets.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-base-content mt-6">
        Common Troubleshooting
      </h2>
      <ul className="list-disc list-inside text-base-content/70 space-y-2 text-lg leading-relaxed mt-3">
        <li>
          Unable to submit request → Ensure your account has the correct role
          permissions.
        </li>
        <li>
          Cannot view asset details → Check your dashboard filters and role
          assignments.
        </li>
        <li>
          Notification issues → Verify email settings and enable notifications
          in your profile.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-base-content mt-6">FAQs</h2>
      <div className="text-base-content/70 text-lg leading-relaxed space-y-4 mt-3">
        <p>
          <strong>Q:</strong> How are asset requests approved?
          <br />
          <strong>A:</strong> Requests are reviewed and approved by HR managers
          via the role-based dashboard.
        </p>
        <p>
          <strong>Q:</strong> Can I track my assigned asset history?
          <br />
          <strong>A:</strong> Yes, all past assignments and returns are logged
          in your personal dashboard.
        </p>
        <p>
          <strong>Q:</strong> Is AssetVerse secure for sensitive assets?
          <br />
          <strong>A:</strong> Absolutely. All access is role-based and
          authenticated through Firebase for maximum security.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-base-content mt-6">
        Technical Support & Updates
      </h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        Our technical team monitors system performance, releases regular
        updates, and resolves issues quickly. Users are notified of new
        features, maintenance windows, or system enhancements through in-app
        alerts and email notifications.
      </p>
    </div>
  );
};

export default HelpSupport;
