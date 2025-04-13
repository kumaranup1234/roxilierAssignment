import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { useAuth} from "@/context/AuthContext";

const Navbar = () => {
    const { auth, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate("/login");
    }

    const handleTitleClick = (e) => {
        e.preventDefault();
        if (auth.user.role === "admin") {
            navigate("/admin");
        }else if (auth.user.role === "store_owner") {
            navigate("/owner/store");
        }else{
            navigate("/stores");
        }
    }

    return (
        <div className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 onClick={handleTitleClick} className="text-2xl font-bold text-gray-800 hover:cursor-pointer">Rating Management</h1>

                {auth?.token && auth?.user && (
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center justify-center bg-gray-200 text-black rounded-full w-10 h-10 hover:bg-gray-300 transition"
                        >
              <span className="font-semibold text-xs">
                {auth?.user?.name?.slice(0, 4)?.toUpperCase() || "U"}
              </span>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-52 rounded-md bg-white shadow-lg">
                                <div className="px-4 py-3 border-b text-sm text-gray-700 font-medium">
                                    {auth?.user?.name}
                                </div>
                                <Link
                                    to="/reset-password"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                                >
                                    Change Password
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="border-t border-gray-200"></div>
        </div>
    );
};

export default Navbar;
