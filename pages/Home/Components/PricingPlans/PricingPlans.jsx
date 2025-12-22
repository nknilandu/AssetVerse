import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../../../provider/AuthProvider";

export default function PricingPlans() {
  const [plans, setPlans] = useState([]);
  const { user, userRole } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://asset-verse-server-chi.vercel.app/packages")
      .then((res) => res.json())
      .then((data) => {
        setPlans(data);
      });
  }, []);

  if (!user || userRole === "hr") {
    return (
      <div className="py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="max-w-xl mx-auto text-4xl font-bold text-base-content">
            Our package for HR manager
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-base-content/60">
            AssetVerse helps organizations manage assets securely, efficiently,
            and at scale trusted by growing startups and enterprises alike.
          </p>
        </div>
        {/* // card */}
        <div className="w-full flex items-center justify-center px-3">
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 max-w-7xl w-full">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-base-100 rounded-2xl shadow-sm p-6 flex flex-col hover:scale-101 hover:shadow-xl transition-all ${
                  plan.highlighted && "border-2 border-primary"
                }`}
              >
                {plan.badge && (
                  <span className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full ">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-xl font-semibold text-base-content">
                  {plan.name}
                </h3>
                <p className="text-base-content/50 text-sm mt-1">
                  {plan.title}
                </p>

                <div className="mt-6">
                  <span className="text-4xl font-bold text-base-content">
                    ${plan.price}
                  </span>
                  <span className="text-base-content/80">{plan.period}</span>
                </div>
                <p className="text-base-content/50 text-sm mt-1">
                  {plan.subtitle}
                </p>

                <button
                  disabled={plan.buttonDisabled}
                  className={`btn btn-primary rounded-lg my-6 ${
                    plan.name === "Standard" || "btn-soft"
                  }`}
                >
                  <NavLink to="/upgrade-package">{plan.buttonText}</NavLink>
                </button>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    What's included:
                  </p>
                  <ul className="space-y-3 mb-3">
                    {/* Included features */}
                    {plan?.included?.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-base-content/90"
                      >
                        <span className="text-green-500 font-bold">✓</span>
                        {item}
                      </li>
                    ))}

                    {/* Unavailable features */}
                    {plan?.unavailable?.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-base-content/40"
                      >
                        <span className="text-red-400 font-bold">✕</span>
                        <span className="line-through">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
