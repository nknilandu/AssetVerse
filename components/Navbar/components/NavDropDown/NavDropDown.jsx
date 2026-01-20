import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
import { LuUserRound } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router";
import { FiLogOut, FiMoon } from "react-icons/fi";
import Swal from "sweetalert2";

const NavDropDown = () => {
  const { user, userRole, setUserRole, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  //++++++++++++++++ log out ++++++++++++++++++

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
    const theme = isChecked ? "dark" : "light";

    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 mt-2 p-3 shadow-sm">
      <ul className="">
        {userRole ? (
          userRole === "hr" ? (
            <>
              <li className="hover:text-secondary">
                <NavLink to="/dashboard">
                  <p>Asset List</p>
                </NavLink>
              </li>
              <li className="hover:text-secondary">
                <NavLink to="/all-request">
                  <p>All Requests</p>
                </NavLink>
              </li>
              <li className="hover:text-secondary">
                <NavLink to="/add-asset">
                  <p>Add Asset</p>
                </NavLink>
              </li>

              <li className="hover:text-secondary">
                <NavLink to="/employee-list">
                  <p>Employee List</p>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-secondary">
                <NavLink to="/dashboard">
                  <p>My Assets</p>
                </NavLink>
              </li>
              <li className="hover:text-secondary">
                <NavLink to="/request-asset">
                  <p>Request Asset</p>
                </NavLink>
              </li>
              <li className="hover:text-secondary">
                <NavLink to="/my-team">
                  <p>My Team</p>
                </NavLink>
              </li>
            </>
          )
        ) : (
          <li>
            <span className="loading loading-spinner loading-sm"></span>
          </li>
        )}
      </ul>
      {/* ================== divider ==================== */}
      <div className="divider my-1"></div>
      <ul>
        {user && (
          <li className="hover:text-secondary">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 ${isActive && "text-secondary"}`
              }
            >
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
                defaultChecked={localStorage.getItem("theme") === "dark"}
                className="toggle toggle-xs"
              />
            </div>
          </div>
        </li>
        {user && (
          <li className="hover:text-secondary">
            <div className="flex items-center gap-2" onClick={handleLogout}>
              <FiLogOut />
              <p>Log out</p>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavDropDown;
