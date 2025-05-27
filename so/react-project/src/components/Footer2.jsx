import React from 'react';
import droneLogo from '../assets/🦆 icon _drone bold_.png';

const Footer2 = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white py-8 md:py-12 relative overflow-hidden" id="footer">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and first column */}
          <div className="space-y-4 md:space-y-6">
            <a href="/" className="inline-block">
              <div className="flex items-center">
                <img src={droneLogo} alt="Dronova Logo" className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                <span className="text-xl md:text-2xl font-bold">
                  <span className="text-[#1895F0]">DRO</span>
                  <span className="text-white">NOVA</span>
                </span>
              </div>
            </a>

            <nav className="flex flex-col space-y-2 md:space-y-3 text-sm md:text-base">
              <a href="/how-it-works" className="hover:text-[#1895F0] transition-colors">
                How it Works
              </a>
              <a href="/cookie-policy" className="hover:text-[#1895F0] transition-colors">
                Cookie Policy
              </a>
              <a href="/terms-of-service" className="hover:text-[#1895F0] transition-colors">
                Terms of Service
              </a>
              <a href="/privacy-policy" className="hover:text-[#1895F0] transition-colors">
                Privacy Policy
              </a>
              <a href="/data-processing-agreement" className="hover:text-[#1895F0] transition-colors">
                Data Processing Agreement
              </a>
            </nav>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2 md:space-y-3 text-sm md:text-base">
              <a href="/" className="hover:text-[#1895F0] transition-colors">
                Home
              </a>
              <a href="/about" className="hover:text-[#1895F0] transition-colors">
                About DRONOVA
              </a>
              <a href="/product" className="hover:text-[#1895F0] transition-colors">
                Dronova's Product
              </a>
            </nav>
          </div>

          {/* More */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">More</h3>
            <nav className="flex flex-col space-y-2 md:space-y-3 text-sm md:text-base">
              <a href="/blog" className="hover:text-[#1895F0] transition-colors">
                Our Blog
              </a>
              <a href="/help" className="hover:text-[#1895F0] transition-colors">
                Help Center
              </a>
              <a href="/contact" className="hover:text-[#1895F0] transition-colors">
                Contact Us
              </a>
            </nav>
          </div>

          {/* Social Media and Mobile Apps */}
          <div className="space-y-6 md:space-y-8 relative">
            {/* Social Media */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-xl font-bold">Follow us on social media</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="bg-[#1877F2] rounded-full p-2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 hover:opacity-90 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4 md:w-5 md:h-5 fill-white">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-black rounded-full p-2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 hover:opacity-90 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 md:w-5 md:h-5 fill-white">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-gradient-to-r from-[#fd5949] via-[#d6249f] to-[#285AEB] rounded-full p-2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 hover:opacity-90 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 md:w-5 md:h-5 fill-white">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-[#FF0000] rounded-full p-2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 hover:opacity-90 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-4 h-4 md:w-5 md:h-5 fill-white">
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-[#0A66C2] rounded-full p-2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 hover:opacity-90 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 md:w-5 md:h-5 fill-white">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Mobile Apps */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-xl font-bold">Learn on the go</h3>
              <p className="text-sm md:text-base text-gray-300">
                Learn wherever and whenever you want with Dronova's mobile application!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#" className="inline-block">
                  <div className="bg-black border border-gray-700 rounded-lg px-3 py-2 flex items-center space-x-2 w-36">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 md:w-6 md:h-6 fill-white">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-400">GET IT ON</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </div>
                </a>
                <a href="#" className="inline-block">
                  <div className="bg-black border border-gray-700 rounded-lg px-3 py-2 flex items-center space-x-2 w-36">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 md:w-6 md:h-6 fill-white">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                    </svg>
                    <div>
                      <div className="text-xs text-gray-400">Download on the</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-gray-800 text-xs md:text-sm text-gray-400 flex flex-wrap gap-2">
          <span>© 2025 Dronova</span>
          <span className="mx-2">•</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer2;