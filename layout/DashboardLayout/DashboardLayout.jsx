import { useContext, useEffect } from "react";
import { FaListUl } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { LuBox, LuGitPullRequestArrow, LuUserRound } from "react-icons/lu";
import { MdAddCircleOutline } from "react-icons/md";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { BiPlanet } from "react-icons/bi";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  const { user, userRole } = useContext(AuthContext);

  // for theme control
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const html = document.querySelector("html");
    html.setAttribute("data-theme", savedTheme);
  }, []);

  const drawerList = () =>
    userRole === "hr" ? (
      <>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `${isActive && "text-secondary"}`}
          >
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2 items-center"
              data-tip="Asset List"
            >
              <FaListUl size={14} className="my-2" />
              <span className="is-drawer-close:hidden">Asset List</span>
            </button>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/add-asset"
            className={({ isActive }) => `${isActive && "text-secondary"}`}
          >
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2 items-center"
              data-tip="Add Asset"
            >
              <MdAddCircleOutline size={18} className="my-2" />

              <span className="is-drawer-close:hidden">Add Asset</span>
            </button>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/all-request"
            className={({ isActive }) => `${isActive && "text-secondary"}`}
          >
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2 items-center"
              data-tip="All Requests"
            >
              <LuGitPullRequestArrow size={16} className="my-2" />

              <span className="is-drawer-close:hidden">All Requests</span>
            </button>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/employee-list"
            className={({ isActive }) => `${isActive && "text-secondary"}`}
          >
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2 items-center"
              data-tip=" Employee List"
            >
              <HiOutlineUsers size={18} className="my-2" />

              <span className="is-drawer-close:hidden">Employee List</span>
            </button>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/upgrade-package"
            className={({ isActive }) => `${isActive && "text-secondary"}`}
          >
            <button
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2 items-center"
              data-tip="Upgrade Package"
            >
              <LuBox size={18} className="my-2" />

              <span className="is-drawer-close:hidden">Upgrade Package</span>
            </button>
          </NavLink>
        </li>
      </>
    ) : (
      userRole === "employee" && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `${isActive && "text-secondary"}`}
            >
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2 items-center"
                data-tip="My Assets"
              >
                <BiPlanet size={18} className="my-2" />
                <span className="is-drawer-close:hidden">My Assets</span>
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/request-asset"
              className={({ isActive }) => `${isActive && "text-secondary"}`}
            >
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2 items-center"
                data-tip="Request an Assets"
              >
                <LuGitPullRequestArrow size={16} className="my-2" />
                <span className="is-drawer-close:hidden">
                  Request an Assets
                </span>
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-team"
              className={({ isActive }) => `${isActive && "text-secondary"}`}
            >
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2 items-center"
                data-tip="My Team"
              >
                <HiOutlineUsers size={18} className="my-2" />
                <span className="is-drawer-close:hidden">My Team</span>
              </button>
            </NavLink>
          </li>
        </>
      )
    );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Dashboard</div>
        </nav>
        {/* Page content here */}
        {/* ==================================================================================== */}

        <Outlet></Outlet>
        <Toaster></Toaster>

        {/* ==================================================================================== */}
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink to="/">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4 mr-2"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </button>
              </NavLink>
            </li>

            {drawerList()}

            {/* List item */}
            {user && userRole && (
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `${isActive && "text-secondary"}`
                  }
                >
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex gap-2 items-center"
                    data-tip="My Profile"
                  >
                    {/* Settings icon */}
                    <LuUserRound size={18} className="my-2" />

                    <span className="is-drawer-close:hidden">My Profile</span>
                  </button>
                </NavLink>
              </li>
            )}
          </ul>
          {/* ================================= */}
          <div className="divider"></div>

          {user && userRole && (
            <div className="flex items-center gap-3 mb-5">
              <div className="avatar ml-3">
                <div
                  className={`${
                    userRole === "hr" ? "ring-secondary" : "ring-primary"
                  } ring-offset-base-100 w-7  rounded-full ring-2 ring-offset-2`}
                >
                  <img src={user.photoURL} alt={user.displayName} />
                </div>
              </div>

              <div className="is-drawer-close:hidden">
                <div className="flex gap-1 items-center">
                  <h3 className="font-semibold text-sm">{user.displayName}</h3>
                  <div
                    className={`badge badge-xs ${
                      userRole === "hr" ? "badge-secondary" : "badge-primary"
                    } `}
                  >
                    {userRole.toUpperCase()}
                  </div>
                </div>

                <p className="text-xs ">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
