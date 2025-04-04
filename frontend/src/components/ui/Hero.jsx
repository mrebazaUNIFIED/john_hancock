import React from 'react';
import { motion } from 'framer-motion';
import heroImg from '/heroBuy.png';
import heroImgAzul from '/hancocks_azul.png';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full bg-[#E6E6E6] overflow-hidden grid grid-cols-4">
      
      {/* Image Section (3/4 width) */}
      <motion.div className="relative col-span-3 h-full">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="John Hancock"
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>
      
      {/* Text Section (1/4 width) */}
      <div className="relative z-10 flex items-center px-6 md:px-10 py-12 col-span-1 text-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#1e1e1e] text-center">
            <img src={heroImgAzul} alt="" /> Papers
          </h1>
          <p className=" text-[#333] text-start text-3xl">Access Thousands of Letters</p>
          <p className="text-2xl text-[#333] ">
            Authored and Received by <br /><b className='text-[#004059]'>John Hancock</b>
          </p>
          <p className="text-2xl italic text-[#555] font-bold my-10">Dr. Jeffrey Griffith</p>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px #004059' }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#004059] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-[#004059] transition-all cursor-pointer "
          >
            SEARCH NOW
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
