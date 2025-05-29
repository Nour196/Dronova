import React from 'react';
import bgHeader from '../assets/1d0844155cbcf6a79425ad6221070a88467f8183.png';

export default function DronovaLanding() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-cover from-gray-600 to-gray-700 text-white" style={{backgroundImage: `url(${bgHeader})`}} id='Header'>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Navigation */}
        <div className="bg-[#3a3a3a]/70 backdrop-blur-md rounded-full px-6 py-2 flex items-center justify-between mx-4 mt-4">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-white text-2xl font-bold">DRO</span>
            <span className="text-[#1895F0] text-2xl font-bold">NOVA</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-12">
            <a 
              href="#slides" 
              className="hover:text-[#1895F0] transition-colors cursor-pointer text-sm md:text-base"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('slides');
              }}
            >
              Product
            </a>
            <a 
              href="#about" 
              className="hover:text-[#1895F0] transition-colors cursor-pointer text-sm md:text-base"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
            >
              Features
            </a>
            <a 
              href="#drone" 
              className="hover:text-[#1895F0] transition-colors cursor-pointer text-sm md:text-base"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('drone');
              }}
            >
              Pricing
            </a>
            <a 
              href="#footer" 
              className="hover:text-[#1895F0] transition-colors cursor-pointer text-sm md:text-base"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('footer');
              }}
            >
              Support
            </a>
            <a 
              href="/formulaire" 
              className="hover:text-[#1895F0] transition-colors cursor-pointer text-sm md:text-base"
            >
              Client Form
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <section className="text-center mt-8 md:mt-20">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Transform your vision
            <br className="hidden md:block" />
            with drones
          </h1>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 md:mt-12">
            <a 
              href="#slides" 
              className="bg-[#1895F0] hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors cursor-pointer text-sm md:text-base"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('slides');
              }}
            >
              services
            </a>
            <a 
              href="#footer" 
              className="bg-[#1895F0] hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors cursor-pointer text-sm md:text-base"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('footer');
              }}
            >
              contact us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}