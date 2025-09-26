
import { useState } from "react";
import {
  User,
  Zap,
  Smartphone,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Users", icon: <User size={20} /> },
    { label: "Quiz Details", icon: <Zap size={20} /> },
    { label: "AI Content", icon: <Smartphone size={20} /> },
    // { label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 bg-[#239CD3] rounded text-white shadow-lg"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`
          fixed top-10 left-0 h-screen bg-[#D0F2FF] pt-8 transition-all duration-300 z-20
          ${open ? "w-52" : "w-16"} 
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
          md:relative
        `}
      >
        {/* Collapse button for desktop */}
        <div
          className={`hidden md:flex ${open ? "justify-end" : "justify-center"
            } px-2 mb-5 transition-all duration-500`}
        >
          <button
            onClick={() => setOpen(!open)}
            className=" text-black hover:scale-110 transition-all duration-300"
          >
            {open ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>

        {/* Navigation links */}
        <ul className="list-none p-2">
          {navLinks.map((link) => (
            <li className="my-3" key={link.label}>
              <button
                onClick={() => setActiveTab(link.label)}
                className={`
                  flex items-center text-lg w-full ${open ? "px-5" : "px-3"
                  } py-2 rounded-full transition-all duration-300 ${activeTab === link.label
                    ? "bg-[#239CD3] text-white"
                    : "text-black border border-[#239CD3] hover:bg-[#72b8e7] hover:text-white"
                  }`}
              >
                <span className="w-6 h-6 flex items-center justify-center mr-3">
                  {link.icon}
                </span>
                <span
                  className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${open ? "w-auto opacity-100" : "w-0 opacity-0"
                    }`}
                >
                  {link.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
