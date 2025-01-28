"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { MdArrowDropDownCircle } from 'react-icons/md';
import { UserButton, useUser } from '@clerk/nextjs';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser(); // Fetch the user object to check authentication

  return (
    <nav className="bg-[#0F0F0F] shadow-[0px_2px_17.7px_0px_#2F2F7E] w-full h-[80px] flex items-center justify-between px-4 md:px-10">
      {/* Left - Dropdown Menu */}
      <div className="relative group">
        <button
          className="text-white font-bold text-base md:text-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdArrowDropDownCircle className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={30} />
        </button>
        {isOpen && (
          <ul className="absolute left-0 bg-[#0F0F0F] text-white shadow-lg transition-all duration-300">
            <li className="px-4 py-2 relative group hover:bg-gray-700 hover:font-bold">
              <Link href="/" className="relative">
                AI-Based Mock Interview
              </Link>
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-transparent group-hover:bg-[#2F2F7E] group-hover:shadow-[4px_4px_10px_rgba(47,47,126,1)] transition-all duration-500 transform group-hover:translate-x-0 translate-x-[-100%]" />
            </li>
            {/* Add more menu items as needed */}
          </ul>
        )}
      </div>

      {/* Middle - Logo */}
      <div className="flex items-center justify-center mx-auto">
        <h1
          className="text-2xl md:text-4xl font-normal leading-[47.52px] text-left group hover:scale-105 transition-all duration-500"
          style={{
            fontFamily: 'Nasalization, sans-serif',
            letterSpacing: '-0.05em',
          }}
        >
          <span className="text-white">Prep</span>
          <i
            className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text animate-gradient-move"
            style={{ display: 'inline-block' }}
          >
            Mate
          </i>
        </h1>
      </div>

      {/* Right - Login/Sign Up Button or User Profile */}
      <div className="flex justify-end">
        {user ? (
          // If the user is logged in, show the UserButton from Clerk
          <UserButton />
        ) : (
          // Otherwise, show a Login button
          <Link href="/sign-in">
            <button
              className="w-[100px] h-[40px] text-[14px] md:w-[140px] md:h-[50px] md:text-[18px] font-semibold rounded-full bg-[#535DAB] hover:bg-[#6b76d1] transition-all text-white"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
