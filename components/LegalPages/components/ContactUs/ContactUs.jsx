import React from "react";

const ContactUs = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-base-content">Contact AssetVerse</h1>
      <div className="h-px w-full bg-base-content/20"></div>
      <p className="text-base-content/70 text-lg leading-relaxed">
        We value communication with our users, clients, and partners. Whether you have a question about AssetVerse features, need technical assistance, or want to discuss enterprise solutions, our team is ready to assist.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Support Channels</h2>
      <ul className="list-disc list-inside text-base-content/70 space-y-2 text-lg leading-relaxed mt-3">
        <li><strong>Email Support:</strong> nknilandu@gmail.com — typically responds within 24 hours during business days.</li>
        <li><strong>Phone:</strong> +8801986964626 — available Sunday to Thursday, 10:00 AM to 6:00 PM (GMT+6).</li>
        <li><strong>Website:</strong> <a href="https://asset-verse-com.netlify.app/" className="underline text-base-content">https://asset-verse-com.netlify.app/</a></li>
      </ul>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Corporate & Partnership Inquiries</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        AssetVerse welcomes corporate partnership requests and bulk subscription inquiries. Our enterprise team provides customized solutions tailored to organizational size, industry, and workflow requirements. For bulk deployment, onboarding assistance, or integration discussions, reach out directly via the contact channels above.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Feedback & Suggestions</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        User feedback drives our innovation. Share feature suggestions, usability improvements, or any concerns to help us enhance the platform for all users. Every suggestion is reviewed and considered for future releases.
      </p>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Global Offices & Locations</h2>
      <ul className="list-disc list-inside text-base-content/70 space-y-2 text-lg leading-relaxed mt-3">
        <li><strong>Headquarters:</strong> Dhaka, Bangladesh</li>
        <li><strong>Asia-Pacific Office:</strong> Singapore</li>
        <li><strong>Europe Office:</strong> London, UK</li>
        <li><strong>Americas Office:</strong> New York, USA</li>
      </ul>

      <h2 className="text-2xl font-semibold text-base-content mt-6">Response Time Commitment</h2>
      <p className="text-base-content/70 text-lg leading-relaxed">
        We aim to respond to all inquiries within 24 business hours. Enterprise clients receive priority support with dedicated account managers for faster issue resolution.
      </p>
    </div>
  );
};

export default ContactUs;
