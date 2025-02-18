import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mainurl } from "./commonfile";
import { useTheme } from "../themeprovider";
import { Sun, Moon, Menu, X } from "lucide-react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { profile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        `${mainurl}/userroute21/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Logout Successful!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error("Logout failed, please try again.");
    }
  };

  return (
    <nav className="relative w-full shadow-lg bg-blue-50 dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-900 dark:text-white">
              Task<span className="text-blue-600">Box</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-semibold text-blue-800 dark:text-white hover:text-blue-600 dark:hover:text-gray-300 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/addtodo"
              className="text-sm font-semibold text-blue-800 dark:text-white hover:text-blue-600 dark:hover:text-gray-300 transition-colors duration-300"
            >
              Add Todo
            </Link>
          </div>

          {/* Desktop Right Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {profile?.role === "admin" && (
              <Link
                to="/dashboard"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300"
              >
                Dashboard
              </Link>
            )}
            {profile ? (
              <button
                onClick={logout}
                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 transition-colors duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors duration-300"
              >
                Login
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-800" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-blue-800 dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden absolute w-full bg-white dark:bg-gray-800 shadow-lg z-50"
        >
          <div className="flex flex-col items-center py-4">
            {/* Navigation Links */}
            <div className="flex flex-col items-center w-full mb-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-base font-semibold text-blue-800 dark:text-white hover:text-blue-600 dark:hover:text-gray-300"
              >
                Home
              </Link>
              <Link
                to="/addtodo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-base font-semibold text-blue-800 dark:text-white hover:text-blue-600 dark:hover:text-gray-300"
              >
                Add Todo
              </Link>
            </div>

            {/* Action Buttons Container */}
            <div className="w-full px-4 space-y-2">
              <div className="flex justify-between gap-2">
                {profile?.role === "admin" && (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 text-center rounded-md bg-blue-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    Dashboard
                  </Link>
                )}
                {profile ? (
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 rounded-md bg-red-500 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 text-center rounded-md bg-blue-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 rounded-md bg-gray-200 dark:bg-gray-700 py-2 text-sm font-semibold text-blue-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-5 h-5 text-gray-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 text-blue-800" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;