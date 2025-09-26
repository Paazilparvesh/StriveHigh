import { Link, useLocation } from 'react-router-dom';
import logo from "/src/assets/Logo/logo.png";

const Navbar = () => {
    const location = useLocation();

    // Check if we are on the admin page
    const isAdminPage = location.pathname.startsWith("/admin");

    return (
        <nav
            className={`
                bg-white text-white px-5 flex justify-center items-center
                ${isAdminPage ? "absolute" : "sticky"} 
                top-0 w-full h-15 shadow-md z-30
            `}
        >
            <Link to="/">
                <img src={logo} alt="Logo" className="size-30 object-contain" />
            </Link>
        </nav>
    );
};

export default Navbar;
