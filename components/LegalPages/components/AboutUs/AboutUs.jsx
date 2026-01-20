import React from "react";

const AboutUs = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-base-content">About AssetVerse</h1>
       <div className="h-px w-full bg-base-content/20"></div>
      <p className="text-base-content/70 text-lg leading-relaxed">
        AssetVerse is a modern, enterprise-grade web application developed to help organizations manage and monitor internal assets efficiently. From physical equipment such as laptops, monitors, and office furniture, to digital resources like software licenses and cloud tools, AssetVerse provides a centralized platform for tracking, assignment, and return workflows, all in an automated and auditable manner.
      </p>

      <h2 className="text-2xl font-semibold text-base-content">Our Vision</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        We envision a corporate environment where assets are always accounted for, employee requests are handled seamlessly, and HR managers have actionable insights at their fingertips. AssetVerse aims to remove the inefficiencies caused by manual spreadsheets, miscommunication, and lost or misplaced assets, delivering a truly data-driven approach to asset management.
      </p>

      <h2 className="text-2xl font-semibold text-base-content">Core Mission</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        Our mission is to simplify asset management workflows, provide full visibility for managers, and empower employees to interact with assets responsibly. AssetVerse combines role-based dashboards, approval workflows, reporting, and subscription management into a single, cohesive platform.
      </p>

      <h2 className="text-2xl font-semibold text-base-content">Key Benefits for Organizations</h2>
      <ul className="list-disc list-inside text-base-content/80 space-y-2 text-lg leading-relaxed">
        <li><strong>Centralized Tracking:</strong> Consolidate all asset information in one dashboard for easier management and auditing.</li>
        <li><strong>Operational Transparency:</strong> Know who holds which assets, the status of requests, and upcoming renewals or returns.</li>
        <li><strong>Automated Workflows:</strong> Streamline approvals, assignments, and asset returns, reducing administrative burden.</li>
        <li><strong>Security and Compliance:</strong> Role-based access ensures only authorized personnel can manage sensitive operations.</li>
        <li><strong>Scalability:</strong> Designed to grow with your organization, supporting multiple offices, departments, and employees.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-base-content mt-8">Technology & Innovation</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        AssetVerse leverages modern technologies to provide high performance, secure access, and seamless user experiences. The frontend uses React.js, Tailwind CSS, DaisyUI, and Vite, offering responsive and dynamic dashboards. The backend is powered by Node.js, Express.js, MongoDB, and Firebase for authentication, ensuring data integrity and robust security. Stripe integration allows subscription and payment management.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-8">Why Choose AssetVerse?</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        AssetVerse is more than just an asset tracker. It provides actionable insights, reduces manual errors, ensures accountability, and improves employee satisfaction. By automating repetitive tasks, managers can focus on strategic decisions, while employees enjoy a self-service portal that is simple and intuitive.
      </p>
    </div>
  );
};

export default AboutUs;
