import ContactUs from "./components/ContactUs/ContactUs";
import AboutUs from "./components/AboutUs/AboutUs";
import HelpSupport from "./components/HelpSupport/HelpSupport";
import TermsOfUse from "./components/TermsOfUse/TermsOfUse";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import CookiePolicy from "./components/CookiePolicy/CookiePolicy";
import { Element } from "react-scroll";
import { Outlet } from "react-router";

const LegalPages = () => {
  return (
    <div className="space-y-16 pt-20 pb-10">
      <Outlet></Outlet>
    </div>
  );
};

export default LegalPages;
