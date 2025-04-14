import React from 'react';
import logoNav from '/hancockswhite.png';

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Row 3: Bottom Bar */}
        <div className=" border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
        <img src={logoNav} alt="Logo" className="h-10" />
          <p className="text-lg text-[#b9b9b8]">&copy; 2025 John Hancock | All Rights Reserved | Privacy & Policy</p>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <span className="w-4 h-4 bg-gray-600 rounded-full"></span>
            <span className="w-4 h-4 bg-red-600 rounded-full"></span>
            <span className="w-4 h-4 bg-gray-600 rounded-full"></span>
          </div>
        </div>

      </div>
    </footer>
  );
}
