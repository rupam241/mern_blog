import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 p-5 ">
      <div className=" container mx-auto flex justify-between items-center">
        {/*logo design  */}

        <Link
          to=""
          className="self-center whitespace-nowrap text-sm sm:text-text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Rupam's
          </span>
          Blog
        </Link>

        {/* for searching*/}

        <form className="hidden lg:inline">
          <div className="relative flex items-center ">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 pr-10 rounded border border-gray-300 outline" // Add padding to the right to avoid overlap
      />
      {/* Icon positioned absolutely to the right */}
      <AiOutlineSearch className="absolute right-2 text-gray-400 cursor-pointer w-6 h-6 " />
      </div>
    </form>

    {}




        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-gray-400" : "hover:text-gray-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-gray-400" : "hover:text-gray-400"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "text-gray-400" : "hover:text-gray-400"
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-gray-400" : "hover:text-gray-400"
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Hamburger Icon */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-800 p-4`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "block py-2 text-gray-400"
              : "block py-2 text-gray-200 hover:text-gray-400"
          }
          onClick={toggleMenu}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "block py-2 text-gray-400"
              : "block py-2 text-gray-200 hover:text-gray-400"
          }
          onClick={toggleMenu}
        >
          About
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive
              ? "block py-2 text-gray-400"
              : "block py-2 text-gray-200 hover:text-gray-400"
          }
          onClick={toggleMenu}
        >
          Services
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "block py-2 text-gray-400"
              : "block py-2 text-gray-200 hover:text-gray-400"
          }
          onClick={toggleMenu}
        >
          Contact
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
