import React from "react";
import { FiDownload, FiUsers, FiTrendingUp } from "react-icons/fi";

const Stats = () => {
  const stats = [
    {
      title: "Companies Trust Us",
      value: "100+",
      desc: "Growing every month",
      icon: FiUsers,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Assets Managed",
      value: "25K+",
      desc: "Across all organizations",
      icon: FiDownload,
      color: "text-emerald-600 bg-emerald-100",
    },

    {
      title: "Platform Uptime",
      value: "99.9%",
      desc: "Last 12 months",
      icon: FiTrendingUp,
      color: "text-orange-600 bg-orange-100",
    },
  ];
  return (
    <div className="py-14">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="max-w-xl mx-auto text-4xl font-bold text-base-content">
          Trusted by teams worldwide
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-base-content/60">
          AssetVerse helps organizations manage assets securely, efficiently,
          and at scale trusted by growing startups and enterprises alike.
        </p>
      </div>
      {/* card   */}
      <div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl bg-base-100 p-6 shadow-sm flex flex-row hover:shadow-xl transition-all"
            >
              <div className="text-center mx-auto space-y-3">
                {/* Title */}
                <p className="font-medium text-base-content/50">{stat.title}</p>

                {/* Value */}
                <p className="text-3xl sm:text-4xl md:text-6xl  font-bold text-base-content">
                  {stat.value}
                </p>

                {/* Description */}
                <p className=" text-sm text-base-content/50">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
