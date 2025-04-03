import React from 'react';
import logoNav from '/hancockswhite.png';

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Row 1: Newsletter */}
        <div className='flex items-center justify-between'>
          <h3 className="text-2xl font-semibold mb-4 ">
            Sign now for offers <br /> and keep yourself informed!
          </h3>
          <div className="flex w-full max-w-xl">
            <input
              type="email"
              placeholder="Enter your email..."
              className="p-4 flex-1 bg-[#323230] text-white placeholder-amber-50 rounded-l text-lg h-14"
            />
            <button className="bg-white text-black px-6 h-14 rounded-r hover:bg-gray-200 transition text-lg">Send</button>
          </div>
        </div>

        {/* Separator */}
        <div className="border-b border-[#2E2E2B] w-full"></div>

        {/* Row 2: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-3">

          {/* Column 1 */}
          <div className='font-bold'>
            <button className="bg-red-600 text-white px-4 py-2 mb-4 rounded w-60 h-16">Apply Now</button>
            <button className="border border-white px-4 py-2 mb-4 w-60 rounded h-16">Contact Us</button>
            <button className="border border-white px-4 py-2 w-60 rounded h-16">Visit Us</button>
          </div>
        
          {/* Column 2 */}
          <div className='border-t border-b py-5 border-[#2E2E2B]'>
            <ul className="space-y-8 list-disc pl-5">
              <li>Home</li>
              <li>About</li>
              <li>Community Board</li>
              <li>Contact Dr.JMG</li>
            </ul>
          </div>
        
          {/* Column 3 */}
          <div className='border-t border-b py-5 border-[#2E2E2B]'>
            <ul className="space-y-8 list-disc pl-5">
              <li>Students</li>
              <li>Admission</li>
              <li><a href="#" className="underline">Faculty & Staffs</a></li>
              <li>Tuition & Fees</li>
              <li>Dress Code</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className='border-t border-b border-[#2E2E2B] py-5'>
            <p>Germany —</p>
            <p>785 15h Street, Office 478<br /> Berlin, DE 81566</p>
            <p className="mt-2 underline">info@email.com</p>
            <p className="mt-2 font-semibold text-2xl">+(402) 763 282 46</p>
          </div>
        </div>

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
