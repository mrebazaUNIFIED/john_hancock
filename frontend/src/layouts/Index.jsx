import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/nav/Nav'
import Footer from '../components/footer/Footer'

const Index = () => {
  return (
    <div className='flex flex-col min-h-screen bg-[#f6f4ee]'>
      <Navbar />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Index