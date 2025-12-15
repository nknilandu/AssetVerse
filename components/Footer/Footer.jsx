import React from "react";
import logo from "../../src/assets/logo.png";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { TiSocialFacebookCircular } from "react-icons/ti";
import { TfiFacebook } from "react-icons/tfi";

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
            <a href="">
              <div className="bg-base-200 p-2 rounded-full">
                <TfiFacebook />
              </div>
            </a>
            <a href="">
              <div className="bg-base-200 p-2 rounded-full">
                <GrInstagram />
              </div>
            </a>
            <a href="">
              <div className="bg-base-200 p-2 rounded-full">
                <FaXTwitter />
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
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav className="flex-1">
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      </div>
    </div>
  );
};

export default Footer;
