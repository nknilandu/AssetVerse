import React, { useContext } from "react";
import Logo from "../Logo/Logo";
import { Link as ScrollLink } from "react-scroll";
import { Link, NavLink, useLocation } from "react-router";
import { AuthContext } from "../../provider/AuthProvider.jsx";
import NavDrawer from "./components/NavDrawer/NavDrawer.jsx";


const Navbar = () => {
  const { user, loading, logout, userRole } = useContext(AuthContext);

const { pathname } = useLocation();
const isRoot = pathname === "/";


  const navList = (userRole) => (
    <ul className="flex flex-col lg:flex-row gap-3 lg:gap-10">
      {userRole && (
        <li className="hover:text-secondary">
          <Link
            to={userRole === "hr" ? "/hr-dashboard" : "/employee-dashboard"}
          >
            Dashboard
          </Link>
        </li>
      )}
      {
        isRoot ? (
          <>
            <li className="hover:text-secondary">
        <ScrollLink
          to="features"
          smooth
          offset={-60}
          duration={500}
          activeClass="lg:text-secondary rounded-lg lg:rounded-xs bg-secondary lg:bg-transparent text-base-100 lg:border-b-2 lg:border-w-[2px]"
          spy
        >
          Features
        </ScrollLink>
      </li>
      <li className="hover:text-secondary">
        
        <ScrollLink
          to="pricing"
          smooth
          offset={-60}
          duration={500}
          activeClass="lg:text-secondary rounded-lg lg:rounded-xs bg-secondary lg:bg-transparent text-base-100 lg:border-b-2 lg:border-w-[2px]"
          spy
        >
          Pricing

        </ScrollLink>
      </li>
      <li className="hover:text-secondary">
        <ScrollLink
          to="testimonials"
          smooth
          offset={-60}
          duration={500}
          activeClass="lg:text-secondary rounded-lg lg:rounded-xs bg-secondary lg:bg-transparent text-base-100 lg:border-b-2 lg:border-w-[2px]"
          spy
        >
          Testimonials
        </ScrollLink>
      </li>
      <li className="hover:text-secondary">
        <ScrollLink
          to="faq"
          smooth
          offset={-60}
          duration={500}
          activeClass="lg:text-secondary rounded-lg lg:rounded-xs bg-secondary lg:bg-transparent text-base-100 lg:border-b-2 lg:border-w-[2px]"
          spy
        >
          FAQ
        </ScrollLink>
      </li>
      
          </>
        ) : (
          <li className="hover:text-secondary">
          <Link
            to='/'
          >
            Home
          </Link>
        </li>
        )
      }
    </ul>
  );

  return (
    <div>
      <div className="fixed w-full shadow-sm top-0 bg-white/10 backdrop-blur-xl z-50 ">
        <div className="navbar max-w-7xl mx-auto px-4 flex  justify-between">
          <div className="flex items-center">
            <div to="/" className="lg:hidden w-6 mr-4">
              {/* ====================== */}
              <NavDrawer list={navList(userRole)}></NavDrawer>
            </div>

            <div to="/" className=" w-8">
              <Logo></Logo>
            </div>
            <NavLink to="/">
              <h1 className="m-3 text-xl font-bold text-primary">AssetVerse</h1>
            </NavLink>
          </div>

          <div className="hidden lg:block">{navList(userRole)}</div>

          {user ? (
            userRole ? (
            <div className="flex justify-center items-center">
              <div className="text-right leading-0.5 hidden sm:block">
                <div className="flex gap-1 items-center justify-end">
                  <h3 className="font-semibold text-sm">{user.displayName}</h3>
                  <div className={`badge badge-xs ${userRole==='hr'?'badge-secondary':'badge-primary'} `}> {userRole.toUpperCase()}</div>
                </div>

                <p className="text-xs ">{user.email}</p>
              </div>

              <div className="avatar ml-3">
                <div className={`${userRole==="hr"?"ring-secondary":"ring-primary"} ring-offset-base-100 w-7 rounded-full ring-2 ring-offset-2`}>
                  <img src={user.photoURL} alt={user.displayName} />
                </div>
              </div>
            </div>
            ) : (
              <span className="loading loading-spinner loading-sm  text-primary"></span>
            )
          ) : 
            
            loading ? (
              <span className="loading loading-spinner loading-sm  text-primary"></span>
            ) : (
              <div className="flex gap-2">
                <Link to="/employee-registration">
                  <button className="btn hidden md:block btn-soft btn-primary rounded-lg">
                    Join as Employee
                  </button>
                </Link>
                <Link to="/hr-registration">
                  <button className="btn hidden md:block btn-md btn-primary rounded-lg">
                    Join as HR Manager
                  </button>
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
