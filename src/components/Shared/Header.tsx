import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-gray-100 border-gray-200 px-6 py-3 ">
      {/* Logo + Name */}
      <div className="flex items-center gap-3 text-gray-900 font-semibold">
        <div className="size-6">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6_543)">
              <path
                d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_6_543">
                <rect width="48" height="48" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          ReviewCUI
        </h2>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-gray-700 text-sm">
        <a href="/" className="hover:text-black hover:font-semibold">
          Home
        </a>
        <a href="/faculty" className="hover:text-black hover:font-semibold">
          Faculty
        </a>
        <a
          href="/write-review"
          className="hover:text-black hover:font-semibold"
        >
          Write Review
        </a>
      </nav>

      {/* Sign In Button (Desktop) */}
      <button className="hidden md:block bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition cursor-pointer">
        <Link to="auth/sign-in">Sign In</Link>
      </button>

      {/* Mobile Menu Button */}
      <div className="relative z-50 md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="absolute z-50 top-12 left-0 w-full bg-white border-t border-gray-200 shadow-md md:hidden">
          <nav className="flex flex-col items-start px-8 border py-4 space-y-4 text-gray-700 text-sm">
            <a href="/" className="hover:text-black">
              Home
            </a>
            <a href="/faculty" className="hover:text-black ">
              Faculty
            </a>
            <a href="/write-review" className="hover:text-black">
              Write Review
            </a>
            <button className="bg-gray-900 text-white w-1/2 mx-auto px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition cursor-pointer">
              <Link to="auth/sign-in">Sign In</Link>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
