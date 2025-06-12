"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const getLinkStyle = (path) => {
    const isActive = pathname === path;
    return isActive 
      ? "bg-black text-white px-2 py-1 rounded-md font-bold" 
      : "text-gray-700 px-2 py-1 rounded-md font-bold";
  };

  return (
    <nav className="bg-white border-b-2 border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image 
                src="/logo.png" 
                alt="Pokemon Logo" 
                width={120} 
                height={40}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className={getLinkStyle('/')}>
              Home
            </Link>
            <Link href="/pokemons" className={getLinkStyle('/pokemons')}>
              Pokemons
            </Link>
            <Link href="/about" className={getLinkStyle('/about')}>
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className={getLinkStyle('/')}>
            Home
          </Link>
          <Link href="/pokemons" className={getLinkStyle('/pokemons')}>
            Pokemons
          </Link>
          <Link href="/about" className={getLinkStyle('/about')}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


