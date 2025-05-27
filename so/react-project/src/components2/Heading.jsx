import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/🦆 icon _drone bold_.png'

const Heading = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Blue radial glow background */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[900px] bg-[#1895F0] opacity-20 blur-3xl rounded-full z-0" />
      <div className="relative z-10">
        {/* Navigation */}
        <header className="container mx-auto px-4 pt-6">
          <nav className="flex items-center justify-between">
            {/* Logo with icon */}
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#181f2a] border border-[#1e293b] mr-2">
                <img src={logo} alt="Dronova Logo" className="w-5 h-5" />
              </span>
              <span className="text-2xl font-bold tracking-tight select-none">
                <span className="text-white">DRO</span>
                <span className="text-[#1895F0]">NOVA</span>
              </span>
            </div>
            {/* Navigation links */}
            <div className="flex items-center space-x-8">
              <a href="#" className="text-white hover:text-[#1895F0] font-medium transition-colors">Product</a>
              <a href="#" className="text-white hover:text-[#1895F0] font-medium transition-colors">Features</a>
              <Link to="/login" className="px-5 py-1 border border-[#1895F0] rounded-full text-white font-medium hover:bg-[#181f2a] transition-colors" style={{fontSize:'15px'}}>Login</Link>
              <Link to="/signup" className="px-5 py-1 bg-[#1895F0] rounded-full text-white font-medium hover:bg-[#1478c0] transition-colors ml-1" style={{fontSize:'15px'}}>Registre Now!</Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 pt-16 pb-8 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
          {/* Left: Text */}
          <div className="flex-1 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6" style={{letterSpacing: '-1px'}}>
              Unlock the <span className="font-bold italic">power</span> of<br/>
              The <span className="font-bold">Drones</span> with<br/>
              <span className="font-bold">DRO<span className="text-[#1895F0]">NOVA</span></span>!
            </h1>
            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-xl">
              A smart platform that offers drone services for agriculture, security, and industry. Users can easily book a service, monitor operations, and get fast,accurate results<br/>with advanced drone technology.
            </p>
            <button className="bg-[#1895F0] hover:bg-[#1478c0] text-white font-medium px-7 py-2 rounded-lg text-base transition-colors shadow-md">
              Get started
            </button>
          </div>
          {/* Right: Drone image with floating tags and blue glow */}
          <div className="flex-1 relative flex items-center justify-center w-full md:w-auto mt-8 md:mt-0">
            {/* Blue radial glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#1895F0] opacity-40 blur-3xl z-0" />
            {/* Drone image */}
            <img 
              src="https://res.cloudinary.com/dqeh7epyi/image/upload/v1716129642/drone-hero.png" 
              alt="Drone" 
              className="relative z-10 w-[370px] h-auto object-contain select-none" 
              draggable="false"
            />
            {/* Floating tags */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
              <span className="bg-[#232b36] text-white/90 px-4 py-2 rounded-full text-base font-normal border border-[#3a4a5e] shadow-md">
                The Future of <span className="font-semibold text-[#1895F0]">Aerial Intelligence</span>
              </span>
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 z-20">
              <span className="bg-[#232b36] text-white/90 px-4 py-2 rounded-full text-base font-normal border border-[#3a4a5e] shadow-md">
                Precision , Efficiency , <span className="font-semibold text-[#1895F0]">Innovation</span>
              </span>
            </div>
            <div className="absolute bottom-4 right-0 z-20">
              <span className="bg-[#232b36] text-white/90 px-4 py-2 rounded-full text-base font-normal border border-[#3a4a5e] shadow-md">
                Precision from <span className="font-semibold text-[#1895F0]">Above</span>
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Heading;