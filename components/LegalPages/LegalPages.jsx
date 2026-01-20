import ContactUs from "./components/ContactUs/ContactUs";
import AboutUs from "./components/AboutUs/AboutUs";
import HelpSupport from "./components/HelpSupport/HelpSupport";
import TermsOfUse from "./components/TermsOfUse/TermsOfUse";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import CookiePolicy from "./components/CookiePolicy/CookiePolicy";
import { Element } from "react-scroll";

const LegalPages = () => {
  return (
    <div className="space-y-16 pt-20">
      <Element name="about">
        <AboutUs></AboutUs>
      </Element>
      <Element name="contact">
        <ContactUs></ContactUs>
      </Element>
      <Element name="helpsupport">
        <HelpSupport></HelpSupport>
      </Element>
      <Element name="term">
        <TermsOfUse></TermsOfUse>
      </Element>
      <Element name="privacy">
        <PrivacyPolicy></PrivacyPolicy>
      </Element>
      <Element name="cookie">
        <CookiePolicy></CookiePolicy>
      </Element>
    </div>
  );
};

export default LegalPages;
