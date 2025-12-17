import React, { useContext, useEffect } from "react";
import { FiLogOut, FiMoon } from "react-icons/fi";
import { HiMenuAlt1 } from "react-icons/hi";
import { LuMoonStar, LuUserRound } from "react-icons/lu";
import { TbSettings2 } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../provider/AuthProvider";
import Logo from "../../../Logo/Logo";

const NavDrawer = ({ list }) => {
  const { user, loading, userRole, setUserRole, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Log out?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        // log out user
        logOut()
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: "Successfully loged out",
              icon: "success",
            });

            // set user role null
            setUserRole(null);

            //navigate to login page (optional)
            navigate("/login");
          })
          .catch((error) => {
            Swal.fire("Error", error.message, "error");
          });
      }
    });
  };

  // +++++++++++ control theme +++++++++++++++++
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const html = document.querySelector("html");
    html.setAttribute("data-theme", savedTheme);

  }, []);

      const handleTheme = (e) => {
    const isChecked = e.target.checked;
    // console.log(isChecked)
    const html = document.querySelector("html");
    const theme =  isChecked ? 'dark' : 'light'

      html.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    
  };



  return (





    <div>
      <div className="drawer">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-1">
            <HiMenuAlt1 size={20} />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-base-200 min-h-full w-80 p-4">
            {/* ========================== */}


<div className="flex items-center mb-4">
            

            <div to="/" className=" w-8">
              <Logo></Logo>
            </div>
            <Link to="/">
              <h1 className="m-3 text-xl font-bold text-primary">AssetVerse</h1>
            </Link>
          </div>





            {list}

            <div className="divider"></div>

            <ul className="space-y-2">
              {user && (
                <li className="hover:text-secondary">
                  <NavLink to="/profile" className={({ isActive }) =>
      `flex items-center gap-2 ${isActive && "text-secondary"}`
    }>
                    <div className="flex items-center gap-2">
                      <LuUserRound />
                      <p>Profile</p>
                    </div>
                  </NavLink>
                </li>
              )}
              <li className="hover:text-secondary flex ">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FiMoon />
                  <p>Dark mode</p>
                  </div>
                  <div>
                    <input 
                        type="checkbox" 
                        onClick={handleTheme}
                        defaultChecked={
                    localStorage.getItem('theme') === 'dark'
                  } 
                  className="toggle toggle-xs" />
                </div>
                </div>
                
              </li>
              {user && (
                <li className="hover:text-secondary">
                  <div
                    className="flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <FiLogOut />
                    <p>Log out</p>
                  </div>
                </li>
              )}
            </ul>

            <div className="divider"></div>

            {/* profile */}
            {user ? (
                userRole ? (
              <div className="flex items-center gap-4 ml-2">
                <div className="avatar">
                  <div className={`${userRole==="hr"?"ring-secondary":"ring-primary"} ring-offset-base-100 w-7 rounded-full ring-2 ring-offset-2`}>
                    <img src={user.photoURL} alt={user.displayName} />
                  </div>
                </div>
                <div className=" leading-0.5 block">
                  <div className="flex gap-1 items-center justify-start">
                    <h3 className="font-semibold">{user.displayName}</h3>
                    <div className={`badge badge-xs ${userRole==='hr'?'badge-secondary':'badge-primary'} `}>
                      {userRole.toUpperCase()}
                    </div>
                  </div>

                  <p className="text-xs ">{user.email}</p>
                </div>
              </div>
                ) : (
                    <span className="ml-2 loading loading-spinner loading-sm  text-base-content "></span>
                )
            ) : 
                loading ? (
              <span className="loading loading-spinner loading-sm  text-base-content"></span>
            ) : (
              <div className="flex flex-col gap-2">
                <button className=" btn  btn-primary rounded-lg">
                  <Link to="/hr-registration">Join as HR Manager</Link>
                </button>
                <button className=" btn  btn-soft btn-primary rounded-lg">
                  <Link to="/employee-registration">Join as Employee</Link>
                </button>
              </div>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavDrawer;
