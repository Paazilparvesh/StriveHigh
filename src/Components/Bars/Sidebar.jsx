import React from "react";
import { NavLink } from "react-router-dom"
import homeicons from "../../assets/image/user-square.png";
import Quizicons from "../../assets/image/flash-circle.png";
import Aifeedicons from "../../assets/image/mobile-programming.png";
import settingsicons from "../../assets/image/setting-2.png";

const Sidebar = ({ open }) => {
  const linkClasses = ({ isActive }) =>
    `flex items-center text-lg px-5 py-2 rounded-full transition-all duration-300 ${
      isActive
        ? "bg-[#239CD3] text-white" 
        : "text-black border border-[#239CD3] hover:bg-[#72b8e7] hover:text-white"
    }`;

  return (
    <nav
      className={`h-screen bg-[#D0F2FF] fixed top-0 left-0 pt-5 transition-all duration-300
        ${open ? "w-[200px]" : "w-16"} 
        md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full md:w-16"} 
        z-50`}
    >
      <ul className="list-none p-2 mt-[70px]">
        <li className="my-5">
          <NavLink to="/" className={linkClasses}>
            <span className="mr-2 w-5 h-5">
              <img src={homeicons} alt="home" className="w-full h-full" />
            </span>
            <span className={`${open ? "inline" : "hidden"} md:inline`}>
              Home
            </span>
          </NavLink>
        </li>

        <li className="my-5">
          <NavLink to="/quizcreate" className={linkClasses}>
            <span className="mr-2 w-5 h-5">
              <img src={Quizicons} alt="quiz" className="w-full h-full" />
            </span>
            <span className={`${open ? "inline" : "hidden"} md:inline`}>
              Create Quiz
            </span>
          </NavLink>
        </li>

        <li className="my-5">
          <NavLink to="/aifeed" className={linkClasses}>
            <span className="mr-2 w-5 h-5">
              <img src={Aifeedicons} alt="ai feed" className="w-full h-full" />
            </span>
            <span className={`${open ? "inline" : "hidden"} md:inline`}>
              Ai Feed
            </span>
          </NavLink>
        </li>

        {/* <li className="my-5">
          <NavLink to="/settings" className={linkClasses}>
            <span className="mr-2 w-5 h-5">
              <img src={settingsicons} alt="settings" className="w-full h-full" />
            </span>
            <span className={`${open ? "inline" : "hidden"} md:inline`}>
              Settings
            </span>
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default Sidebar;
