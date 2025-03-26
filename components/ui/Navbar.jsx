"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { user } = useUser(); // Fetch the user object to check authentication
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  return (
    <nav className="bg-[#0F0F0F] shadow-[0px_2px_17.7px_0px_#2F2F7E] w-full h-[80px] flex items-center justify-between px-4 md:px-10">
      {/* Show back button only if the route is not "/" */}
      {pathname !== "/" && (
        <button
          onClick={() => router.back()}
          className="text-white font-bold text-base md:text-lg hover:text-gray-400 transition"
        >
          ⬅
        </button>
      )}

      {/* Middle - Logo */}
      <div className="flex items-center justify-center mx-auto">
        <h1
          className="text-2xl md:text-4xl font-normal leading-[47.52px] text-left group hover:scale-105 transition-all duration-500"
          style={{
            fontFamily: "Nasalization, sans-serif",
            letterSpacing: "-0.05em",
          }}
        >
          <span className="text-white">Prep</span>
          <i
            className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text animate-gradient-move"
            style={{ display: "inline-block" }}
          >
            Mate
          </i>
        </h1>
      </div>

      {/* Right - Login/Sign Up Button or User Profile */}
      <div className="flex justify-end">
        {user ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">
            <button
              className="w-[100px] h-[40px] text-[14px] md:w-[140px] md:h-[50px] md:text-[18px] font-semibold rounded-full bg-[#535DAB] hover:bg-[#6b76d1] transition-all text-white"
              style={{ fontFamily: "Open Sans, sans-serif" }}
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
