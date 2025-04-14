import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoNav from '/hancockswhite.png';

export default function Nav() {
  return (
    <header className="bg-[#004059] text-white py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* Logo + Nav */}
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src={logoNav} alt="Logo" className="h-10" />
          </Link>

          <nav>
            <ul className="flex gap-6 text-white text-sm">
              <li>
                <Link to="/" className="">Home</Link>
              </li>
              <li>
                <Link to="/about" className="">About</Link>
              </li>
              <li>
                <Link to="/community" className="">Community Board</Link>
              </li>
              
            </ul>
          </nav>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center bg-white rounded overflow-hidden w-64">
          <input
            type="text"
            placeholder="Search Dr. JMG's AI"
            className="flex-1 px-3 py-2 text-black focus:outline-none placeholder:text-black"
          />
          <button className="px-3 bg-white text-black hover:bg-gray-200 transition">
            <FiSearch size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
