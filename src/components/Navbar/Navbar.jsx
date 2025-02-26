import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, handleLogout } = useContext(authContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark", !isDarkMode);
  };

  return (
    <div className="navbar flex fixed z-10 bg-opacity-30 items-center justify-between bg-black text-white px-2 md:px-7 lg:px-16 py-3">
      {/* Logo Section */}
      <div className="flex gap-4 items-center navbar-start">
        <h3 className="text-2xl font-bold text-white">Task Management</h3>
      </div>

      {/* Navigation Links (Add Task Route) */}
      <div className="hidden md:flex navbar-center">
        <ul className="flex gap-4">
          <li>
            <NavLink 
              to={user ? "/tasks" : "/login"} 
              className={({ isActive }) => (isActive ? "text-[#bfdbfe]" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-task" className={({ isActive }) => (isActive ? "text-[#bfdbfe]" : "")}>
              Add Task
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-task" className={({ isActive }) => (isActive ? "text-[#bfdbfe]" : "")}>
              Manage Task
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Hamburger menu for small screens */}
      <div className="dropdown md:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow text-black"
        >
          <li>
            <NavLink 
              to={user ? "/tasks" : "/login"} 
              className={({ isActive }) => (isActive ? "text-[#bfdbfe]" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-task" className={({ isActive }) => (isActive ? "text-[#bfdbfe]" : "")}>
              Add Task
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-task" className={({ isActive }) => (isActive ? "text-[#bfdbfe]" : "")}>
              Manage Task
            </NavLink>
          </li>
        </ul>
      </div>

      {/* User Profile and Logout */}
      <div className="navbar-end">
        {user?.email ? (
          <div className="dropdown dropdown-end text-black">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="text-center menu menu-sm dropdown-content bg-[#F6FCDF] rounded-box z-[100] mt-3 w-52 p-2 shadow"
            >
              <p>{user.email}</p>
              <h3>{user.displayName ? user.displayName : "No name"}</h3>
            </ul>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="btn px-7 font-bold bg-[#f6fcdf] rounded-md hover:bg-[#bdcd90] text-black"
          >
            Log In
          </NavLink>
        )}
        {user?.email && (
          <button
            onClick={handleLogout}
            className="ml-4 p-2 bg-[#859F3D] rounded-md hover:bg-[#758c35] text-black"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;