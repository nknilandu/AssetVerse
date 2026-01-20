import React from "react";
import logo from "../../src/assets/logo.png";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
  return (
    <div className="bg-base-300 text-base-content py-5">
      <div className="max-w-7xl mx-auto">
        <footer className="flex flex-col sm:flex-row justify-center sm:items-center footer sm:footer-horizontal p-10">
          <aside className="flex-2">
            <img src={logo} className="grayscale" alt="logo" />
            <p className="text-2xl font-bold">AssetVerse </p>
            <p>
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
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav className="flex-1">
            <h6 className="footer-title">Company</h6>
            <ScrollLink
              to="about"
              smooth
              offset={-60}
              duration={500}
              // activeClass="underline"
              spy
              className="link link-hover"
            >
              About us
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth
              offset={-60}
              duration={500}
              // activeClass="underline"
              spy
              className="link link-hover"
            >
              Contact us
            </ScrollLink>
            <ScrollLink
              to="helpsupport"
              smooth
              offset={-60}
              duration={500}
              // activeClass="underline"
              spy
              className="link link-hover"
            >
              Help & Support
            </ScrollLink>
          </nav>
          <nav className="flex-1">
            <h6 className="footer-title">Legal</h6>
            <ScrollLink
              to="term"
              smooth
              offset={-60}
              duration={500}
              // activeClass="underline"
              spy
              className="link link-hover"
            >
              Terms of use
            </ScrollLink>
            <ScrollLink
              to="privacy"
              smooth
              offset={-60}
              duration={500}
              // activeClass="underline"
              spy
              className="link link-hover"
            >
              Privacy policy
            </ScrollLink>
            <ScrollLink
              to="cookie"
              smooth
              offset={-60}
              duration={500}
              // activeClass="underline"
              spy
              className="link link-hover"
            >
              Cookie policy
            </ScrollLink>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
