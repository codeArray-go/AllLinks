"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Image from "next/image";
import UseLoader from "@/store/loaderStore";
import useThemeStore from "@/store/themeStore";

const Navbar = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const pathname = usePathname();
  const { showLoader } = UseLoader();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const loginKaro = () => {
    showLoader();
    router.push("/login");
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    showLoader();
    await logout();
    router.push("/");
    setIsMenuOpen(false);
  };

  const showNavBar = ["/", "/generate", "/login"].includes(pathname);
  if (!showNavBar) return null;

  const Dark = "🌙";
  const Light = "💡";

  return (
    <div className="h-[100px] w-full flex items-center justify-center z-10 bg-transparent">
      <nav className="w-full justify-between h-[70px] px-6 sm:px-10 flex items-center relative">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/Logo.png"
            className={`${
              isDarkMode
                ? "drop-shadow-[0_10px_20px_rgba(255,255,255,0.3)]"
                : "drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
            } mt-5`}
            height={90}
            width={90}
            alt="Logo"
          />
        </Link>

        {/* Desktop Controls */}
        <div className="hidden sm:flex items-center justify-between gap-10 h-auto">
          {/* Theme toggle */}
          <div className="flex flex-col items-center justify-center cursor-pointer">
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="toggle-theme"
              className={`relative z-50 rounded-full w-14 h-7 ${
                isDarkMode
                  ? "bg-gray-200 shadow-white"
                  : "bg-gray-500 shadow-black"
              } flex items-center px-1 shadow-sm`}
            >
              <div
                className={`duration-300 transition-transform ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-200"
                } rounded-full w-5 h-5 ${
                  isDarkMode ? "translate-x-7" : "translate-x-0"
                } flex items-center justify-center `}
              >
                {isDarkMode ? Dark : Light}
              </div>
            </button>
          </div>

          {isAuthenticated ? (
            <div className="NunitoEB text-green-500 flex items-center justify-center gap-3">
              <Dropdown logout={handleLogout} user={user} />
              <div className="hidden sm:block">
                <Button text="LogOut" click={handleLogout} />
              </div>
            </div>
          ) : (
            <Button text="LogIn" click={loginKaro} />
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col justify-between w-6 h-5 focus:outline-none"
          >
            <span
              className={`block h-0.5 w-full ${
                isDarkMode ? "bg-white" : "bg-black"
              } transition-transform ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full ${
                isDarkMode ? "bg-white" : "bg-black"
              } transition-opacity ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`block h-0.5 w-full ${
                isDarkMode ? "bg-white" : "bg-black"
              } transition-transform ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-[60px] w-48 bg-gray-800/95 backdrop-blur-md rounded-lg shadow-lg flex flex-col py-3 px-4 gap-3 z-50">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
                <span>{isDarkMode ? Dark : Light}</span>
              </button>

              {/* Auth Links */}
              {isAuthenticated ? (
                <>
                  <Dropdown logout={handleLogout} user={user} />
                  <Button text="LogOut" click={handleLogout} />
                </>
              ) : (
                <Button text="LogIn" click={loginKaro} />
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

Navbar.displayName = "Navbar";

export default Navbar;
