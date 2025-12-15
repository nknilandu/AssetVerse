import React from "react";
import Marquee from "react-fast-marquee";
import logo1 from "../../../../src/assets/companyLogo/pngegg1.png"
import logo2 from "../../../../src/assets/companyLogo/pngegg2.png"
import logo3 from "../../../../src/assets/companyLogo/pngegg3.png"
import logo4 from "../../../../src/assets/companyLogo/pngegg4.png"
import logo5 from "../../../../src/assets/companyLogo/pngegg5.png"
import logo6 from "../../../../src/assets/companyLogo/pngegg6.png"
import logo7 from "../../../../src/assets/companyLogo/pngegg7.png"
import logo8 from "../../../../src/assets/companyLogo/pngegg8.png"



const TestimonialsCompanySection = () => {
  return (
    <div className="py-15">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="max-w-xl mx-auto text-4xl font-bold text-base-content">
          Trusted by Leading Companies Worldwide
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-base-content/60">
          Used by high-growth teams and established enterprises across industries.
        </p>
      </div>
      {/* ======= */}

      <div>
        <Marquee>
            <img src={logo1} alt="company" className="w-36 mr-18 grayscale-100" />
            <img src={logo2} alt="company" className="w-36 mr-18 grayscale-100" />
            <img src={logo3} alt="company" className="w-36 mr-18 grayscale-100" />
            <img src={logo4} alt="company" className="w-36 mr-18 grayscale-100" />
            <img src={logo5} alt="company" className="w-36 mr-18 grayscale-100" />
            <img src={logo6} alt="company" className="w-36 mr-18 grayscale-100" />
            <img src={logo7} alt="company" className="w-36 mr-18 grayscale-100" />
            <img src={logo8} alt="company" className="w-36 mr-18 grayscale-100" />
        </Marquee>
      </div>
    </div>
  );
};

export default TestimonialsCompanySection;
