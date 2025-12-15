import {
  FiBox,
  FiGitPullRequest,
  FiBarChart2,
  FiLayers,
  FiFileText,
  FiBell,
  FiSearch,
  FiShield,
  FiCreditCard,
  FiRefreshCw,
  FiGift,
  FiSmartphone,
} from "react-icons/fi";

export default function FeaturesSection() {
  const features = [
    {
      title: "Comprehensive Asset Tracking",
      description:
        "Track all company assets from laptops to office equipment with detailed categorization, serial numbers, and real-time availability status.",
      icon: FiBox,
      color: "bg-blue-600/10 text-blue-600",
    },
    {
      title: "Automated Request Workflows",
      description:
        "Streamline asset requests with automated approval processes, email notifications, and instant assignment upon approval.",
      icon: FiGitPullRequest,
      color: "bg-indigo-600/10 text-indigo-600",
    },
    {
      title: "Real-Time Analytics",
      description:
        "Gain insights with interactive dashboards showing asset distribution, request trends, and utilization metrics across your organization.",
      icon: FiBarChart2,
      color: "bg-emerald-600/10 text-emerald-600",
    },
    {
      title: "Multi-Company Support",
      description:
        "Employees can manage assets across multiple companies while HR maintains complete control over their organization’s inventory.",
      icon: FiLayers,
      color: "bg-purple-600/10 text-purple-600",
    },
    {
      title: "PDF Report Generation",
      description:
        "Generate comprehensive asset reports for employees, audits, and compliance with one-click PDF export functionality.",
      icon: FiFileText,
      color: "bg-rose-600/10 text-rose-600",
    },
    {
      title: "Smart Notifications",
      description:
        "Stay informed with professional email notifications for asset requests, approvals, returns, and important team updates.",
      icon: FiBell,
      color: "bg-amber-600/10 text-amber-600",
    },
    {
      title: "Advanced Search & Filters",
      description:
        "Quickly find assets with powerful search capabilities and customizable filters across all asset lists and inventories.",
      icon: FiSearch,
      color: "bg-cyan-600/10 text-cyan-600",
    },
    {
      title: "Role-Based Security",
      description:
        "Secure access control with JWT authentication, role-based permissions, and protected routes for HR and employee functions.",
      icon: FiShield,
      color: "bg-red-600/10 text-red-600",
    },
    {
      title: "Flexible Package Upgrades",
      description:
        "Scale your plan seamlessly with Stripe-powered payment integration and instant access to enhanced features and limits.",
      icon: FiCreditCard,
      color: "bg-violet-600/10 text-violet-600",
    },
    {
      title: "Asset Return Management",
      description:
        "Track asset lifecycle with easy return processes, automatic inventory updates, and complete audit trails for accountability.",
      icon: FiRefreshCw,
      color: "bg-teal-600/10 text-teal-600",
    },
    {
      title: "Team Birthday Notifications",
      description:
        "Build team culture with automatic birthday notifications and team member viewing across company affiliations.",
      icon: FiGift,
      color: "bg-pink-600/10 text-pink-600",
    },
    {
      title: "Fully Responsive Design",
      description:
        "Access AssetVerse seamlessly across desktop, tablet, and mobile devices with optimized layouts for every screen size.",
      icon: FiSmartphone,
      color: "bg-orange-600/10 text-orange-600",
    },
  ];

  return (
    <div className="py-14" id='f1'>
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="max-w-xl mx-auto text-4xl font-bold text-base-content">
          Powerful Features for Modern Asset Management
        </h2>
        <p className="mt-3 text-base-content/60">
          Everything you need to track, assign, and manage company assets
          efficiently
        </p>
      </div>
      {/* cards */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-2xl border border-base-content/10 bg-base-100 p-6 shadow-xs transition hover:shadow-xl"
          >
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${feature.color}`}
            >
              <feature.icon className="h-5 w-5" />
            </div>

            <h3 className="text-base font-semibold text-base-content">
              {feature.title}
            </h3>

            <p className="mt-2 text-sm text-base-content/50">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
