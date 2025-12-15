import React from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-scroll";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div>
      <div className="fixed w-full shadow-sm top-0 backdrop-blur-xl z-50 ">
        <div className="navbar max-w-7xl mx-auto px-4 flex justify-between">
          <div className="flex items-center">
            <div to="/" className="w-8">
              <Logo></Logo>
            </div>
            <NavLink to="/">
              <h1 className="m-3 text-xl font-bold text-primary">AssetVerse</h1>
            </NavLink>
            
          </div>

          <div>
            <ul className="flex gap-10">
              <li>
                <Link
                  to="features"
                  smooth
                  offset={-60}
                  duration={500}
                  activeClass="text-secondary border-b-2 border-w-[2px]"
                  spy
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="pricing"
                  smooth
                  offset={-60}
                  duration={500}
                  activeClass="text-secondary border-b-2 border-w-[2px]"
                  spy
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="testimonials"
                  smooth
                  offset={-60}
                  duration={500}
                  activeClass="text-secondary border-b-2 border-w-[2px]"
                  spy
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to="faq"
                  smooth
                  offset={-60}
                  duration={500}
                  activeClass="text-secondary border-b-2 border-w-[2px]"
                  spy
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* login */}
          <div className="flex gap-2">
            <Link to="/employee-registration">
              <button className="btn btn-soft btn-primary rounded-lg">
                Join as Employee
              </button>
            </Link>
            <Link to="/hr-registration">
              <button className="btn btn-primary rounded-lg">
                Join as HR Manager
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
