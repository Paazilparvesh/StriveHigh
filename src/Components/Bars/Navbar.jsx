import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/Logo/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white text-white px-5 flex justify-center items-center sticky top-0 w-full h-20 shadow-md z-50">
     <Link to="/"><img src={logo} alt="Logo" className="h-full object-contain" /></Link>
    </nav>
  );
};

export default Navbar;
