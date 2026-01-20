import React from "react";
import logo from "../../src/assets/logo.png";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-base-300 text-base-content py-5">
      <div className="max-w-7xl mx-auto">
        <footer className="flex flex-col sm:flex-row justify-center sm:items-center footer sm:footer-horizontal p-10">
          <aside className="flex-2">
            <img src={logo} className="grayscale" alt="logo" />
            <p className="text-2xl font-bold">AssetVerse </p>
            <p className="max-w-xs">
              {" "}
              Streamline your corporate asset management with intelligent
              tracking, automated workflows, and real-time analytics.
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="https://www.facebook.com/nknilandu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-base-200 hover:bg-base-content/10 p-2 rounded-full">
                  <FaFacebookF />
                </div>
              </a>
              <a
                href="https://github.com/nknilandu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-base-200 hover:bg-base-content/10 p-2 rounded-full">
                  <FaGithub />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/nilandu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-base-200 hover:bg-base-content/10 p-2 rounded-full">
                  <RiLinkedinFill />
                </div>
              </a>
            </div>
          </aside>
          <nav className="flex-1">
            <h6 className="footer-title">Services</h6>
            <Link to="/legal/asset-management" className="link link-hover">
              Asset Management
            </Link>
            <Link to="/legal/analytics-reporting" className="link link-hover">
              Analytics & Reporting
            </Link>
            <Link to="/legal/workflow-automation" className="link link-hover">
              Workflow Automation
            </Link>
             </nav>
          <nav className="flex-1">
            <h6 className="footer-title">Company</h6>
            <Link to="/legal" className="link link-hover">
              About us
            </Link>
            <Link to="/legal/contact" className="link link-hover">
              Contact us
            </Link>
            <Link to="/legal/help&support" className="link link-hover">
              Help & Support
            </Link>
          </nav>
          <nav className="flex-1">
            <h6 className="footer-title">Legal</h6>
            <Link to="/legal/termofuse" className="link link-hover">
              Terms of use
            </Link>
            <Link to="/legal/privacy" className="link link-hover">
              Privacy policy
            </Link>
            <Link to="/legal/cookie" className="link link-hover">
              Cookie policy
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
