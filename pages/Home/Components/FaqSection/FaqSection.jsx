import React from "react";

const FaqSection = () => {
  const data = [
    {
      title: "How does AssetVerse help reduce administrative overhead?",
      subtitle:
        "AssetVerse automates the entire asset management lifecycle, from request submission to approval and assignment. HR managers no longer need to manually track spreadsheets, send emails, or update inventory records. Our automated workflows, instant notifications, and real-time inventory updates reduce administrative time by an average of 60%, allowing your HR team to focus on strategic initiatives rather than paperwork.",
    },
    {
      title: "Can employees work with multiple companies on AssetVerse?",
      subtitle:
        "Yes! AssetVerse supports multi-company affiliation, which is perfect for contractors, consultants, or employees working across multiple organizations. Employees can register once and request assets from any company they're affiliated with. Each company maintains complete control over their own asset inventory and employee management, while employees enjoy a unified experience across all their company relationships.",
    },
    {
      title: "What happens when I reach my package limit?",
      subtitle:
        "When you approach your package limit for employees or assets, AssetVerse will notify you in advance. You can easily upgrade your package through our Stripe-powered payment system with just a few clicks. The upgrade is instant, and you'll immediately gain access to higher limits and additional features. You can also downgrade at any time if your needs change, with changes taking effect at the next billing cycle.",
    },
    {
      title: "How secure is my company data on AssetVerse?",
      subtitle:
        "Security is our top priority. AssetVerse uses JWT-based authentication with role-based access control, ensuring that only authorized users can access specific features and data. All data transmission is encrypted with SSL/TLS, and we maintain bank-level security standards. We're ISO 27001 compliant and GDPR-ready, with regular security audits and 99.9% uptime guarantee. Your company data is stored in secure, redundant data centers with automatic backups.",
    },
    {
      title: "How easy is it to migrate from our current system?",
      subtitle:
        "Migration to AssetVerse is straightforward. You can manually add assets and employees through our intuitive interface, or contact our support team for assistance with bulk imports. We provide templates and guidance for data migration, and our team can help ensure a smooth transition. Most organizations are fully operational within 1-2 days. We also offer migration assistance as part of our Enterprise package, where our team handles the entire process for you.",
    },
    {
      title: "What kind of support do you provide?",
      subtitle:
        "All plans include email support with response times based on your package level. Professional and Enterprise plans receive priority support with faster response times. Enterprise customers get 24/7 support and a dedicated account manager who understands your specific needs. We also provide comprehensive documentation, video tutorials, and regular webinars to help you get the most out of AssetVerse. Our support team is known for being responsive, knowledgeable, and genuinely helpful.",
    },
  ];

  return (
    <div className="py-14 ">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="max-w-xl mx-auto text-4xl font-bold text-base-content">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-base-content/60">
          Everything you need to know about AssetVerse. Can't find what you're looking for? Contact our support team.
        </p>
      </div>
      {/* ========== */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="collapse collapse-arrow bg-base-100 border border-base-content/5 shadow-xs rounded-xl"
          >
            <input type="radio" name="my-accordion-2" defaultChecked={index===0 ? true : false} />
            <div className="collapse-title font-semibold text-base-content">
              {item?.title}
            </div>
            <div className="collapse-content text-sm text-base-content/50">
              {item?.subtitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
