import React from "react";
import { FiTarget, FiZap, FiUsers } from "react-icons/fi";
import bannerImg from "../../../../src/assets/componentImg/asset-banner.jpg";

const AboutSection = () => {
  return (
    <div className="py-14">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="max-w-xl mx-auto text-4xl font-bold text-base-content">
          The Complete Asset Management Solution
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-base-content/60">
          AssetVerse revolutionizes how organizations manage their physical
          assets, providing a comprehensive platform that prevents loss,
          improves accountability, and reduces administrative overhead.
        </p>
      </div>
      {/* ============ */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10 ">
        <div className="flex-1 space-y-10 max-w-3xl">
          {/* Our Mission */}
          <div className="flex gap-4 items-start">
            <div className="flex h-10 w-18 items-center justify-center rounded-xl mt-2 bg-indigo-600/10 text-indigo-600">
              <FiTarget size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-base-content">
                Our Mission
              </h3>
              <p className="mt-2 text-base-content/50">
                To empower organizations with intelligent asset tracking that
                eliminates manual processes, reduces costs, and provides
                real-time visibility into corporate inventory management.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="flex gap-4 items-start">
            <div className="flex h-10 w-24 items-center justify-center rounded-xl mt-2 bg-emerald-600/10 text-emerald-600">
              <FiZap size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-base-content">
                Why Choose Us
              </h3>
              <p className="mt-2 text-base-content/50">
                Built specifically for corporate environments, AssetVerse
                combines powerful automation with intuitive design. Our platform
                reduces HR administrative time by 60% while maintaining complete
                audit trails and compliance standards.
              </p>
            </div>
          </div>

          {/* Who We Serve */}
          <div className="flex gap-4 items-start">
            <div className="flex h-10 w-20 items-center justify-center rounded-xl mt-2 bg-purple-600/10  text-purple-600">
              <FiUsers size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-base-content">
                Who We Serve
              </h3>
              <p className="mt-2 text-base-content/50">
                From startups to enterprises, AssetVerse scales with your
                organization. HR managers gain comprehensive oversight while
                employees enjoy seamless self-service asset requests and
                returns.
              </p>
            </div>
          </div>
        </div>

        {/* img */}
        <div className="flex-1 h-[420px] w-full bg-base-content/2 rounded-2xl overflow-hidden shadow-md group ">
          <img
            src={bannerImg}
            alt="banner"
            className="object-cover w-full h-full group-hover:scale-110 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
