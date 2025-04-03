import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom'
import { MdCategory } from "react-icons/md";
import {
    FiMenu,
    FiX,
    FiChevronDown,
    FiLayout,
} from 'react-icons/fi';

import { TbTimelineEvent } from "react-icons/tb";
import { BsEnvelopeFill } from "react-icons/bs";
import { FaPenNib,FaUniversity, FaMapMarkerAlt, FaRegNewspaper } from "react-icons/fa";


import logo from '/hancocks.png'
import Avatar from '@mui/material/Avatar';

export default function Dashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#e6e6e6]">
            {/* Sidebar */}
            <aside className={`bg-[#f6f4ee] fixed top-0 left-0 h-full shadow-lg w-64 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between w-full">
                        <img
                            src={logo}
                            className="max-w-[200px] w-auto h-auto object-contain"
                            alt="Logo"
                        />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2  rounded-lg flex items-center justify-center cursor-pointer"
                        >
                            {isMenuOpen
                                ? <FiX className="text-xl max-w-[24px] max-h-[24px]" />
                                : <FiMenu className="text-xl max-w-[24px] max-h-[24px]" />}
                        </button>
                    </div>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        <a href='/admin/statics' className="flex items-center p-2 hover:bg-[#d4d3cf] rounded cursor-pointer">
                            <FiLayout className="text-lg mr-3" />
                            <span className="font-semibold">Dashboard</span>
                        </a>
                        <a href='/admin/author' className="flex items-center p-2 hover:bg-[#d4d3cf] rounded cursor-pointer">
                            <FaPenNib className="text-lg mr-3" />
                            <span className="font-semibold">Author</span>
                        </a>
                        <a href='/admin/recipient' className="flex items-center p-2 hover:bg-[#d4d3cf] rounded cursor-pointer">
                            <BsEnvelopeFill className="text-lg mr-3" />
                            <span className="font-semibold">Recipient</span>
                        </a>
                        <a href='/admin/period' className="flex items-center p-2 hover:bg-[#d4d3cf] rounded cursor-pointer">
                            <TbTimelineEvent className="text-lg mr-3" />
                            <span className="font-semibold">Period</span>
                        </a>
                        <a href='/admin/institution' className="flex items-center p-2 hover:bg-[#d4d3cf] rounded cursor-pointer">
                            <FaUniversity className="text-lg mr-3" />
                            <span className="font-semibold">Institution</span>
                        </a>
                        <a href='/admin/location' className="flex items-center p-2 hover:bg-[#d4d3cf] rounded cursor-pointer">
                            <FaMapMarkerAlt className="text-lg mr-3" />
                            <span className="font-semibold">Location</span>
                        </a>
                        <a href='/admin/type' className="flex items-center p-2 hover:bg-[#d4d3cf] rounded cursor-pointer">
                            <MdCategory className="text-lg mr-3" />
                            <span className="font-semibold">Type</span>
                        </a>
                        <a href='/admin/post' className="flex items-center p-2 hover:bg-[#d4d3cf] rounded cursor-pointer">
                            <FaRegNewspaper className="text-lg mr-3" />
                            <span className="font-semibold">Post</span>
                        </a>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={`p-6 transition-all duration-300 ${isMenuOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className={`${!isMenuOpen ? 'block' : 'hidden'}`}
                    >
                        <FiMenu className="text-2xl" />
                    </button>

                    <div className="relative ml-auto">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center space-x-2 cursor-pointer"
                        >
                            <Avatar alt="J" src="/static/images/avatar/1.jpg" />
                            <span>Admin</span>
                            <FiChevronDown />
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 ">
                                <Link to={"/logout"} className="block w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer">Logout</Link>
                            </div>
                        )}
                    </div>
                </header>

                <div>
                    <Outlet />
                </div>

            </main>
        </div>
    );
}