import { useState } from "react";
import { Menu, X, User, LogIn, UserPlus, Link2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice.js";

export default function Header() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Link2 className="text-white" size={18} />
          </div>
          <span className="text-xl font-bold text-white">Shortify</span>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              className="text-gray-300 hover:text-white"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* AUTH */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-gray-300 hover:text-white flex items-center gap-2"
              >
                <LogIn size={16} /> Sign In
              </button>

              <button
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90"
              >
                <UserPlus size={16} /> Register
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="text-gray-300 hover:text-white flex items-center gap-2"
              >
                <User size={16} />
                {user?.name || "Profile"}
              </button>

              {profileMenuOpen && (
                <div className="absolute top-16 right-4 bg-gray-800 p-3 rounded-lg border border-gray-700">
                  <button
                    onClick={() => navigate("/")}
                    className="block w-full text-left p-2 text-gray-300 hover:bg-gray-700"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left p-2 text-red-400 hover:bg-red-900/40"
                  >
                    <LogOut size={16} className="mr-2 inline" />
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
