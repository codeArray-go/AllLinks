import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Dropdown({ user, logout }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Dropdown button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                Welcome @{user}
                <svg
                    className="w-3 h-3 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white border border-gray-200 z-20">
                    <ul className="py-2 text-sm text-gray-700">
                        <li>
                            <Link
                                href="/generate"
                                className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                            >
                                Generate Link
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${user}`}
                                target="_blank"
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Your Creation
                            </Link>
                        </li>
                    </ul>
                    <div>
                        <p
                            onClick={logout}
                            className="cursor-pointer block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg"
                        >
                            Log Out
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
