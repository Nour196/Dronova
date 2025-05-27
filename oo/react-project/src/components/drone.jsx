import React from 'react'
import imgDrone2 from '../assets/drone2.jfif';
import imgT25 from '../assets/6599894fc678c2c6e0baf3f634d6496ffc55d073.jpg';
import imgFlyCart from '../assets/c8b8d4b2a2243557298f3e740fddfd102002737d.jpg';
import imgAnafi from '../assets/2881a0127948c5c785299400ad4d9410529d2caf.jpg';
import imgAnafi2 from '../assets/856e9c8730079fff1075bb99d3ecb0c0df59a839.jpg';

const Drone = () => {
  return (
    <div className="bg-[#0a0a0a] text-white py-12 md:py-20" id="drone">
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1895F0]/20 p-4 md:p-6" id='Drones'>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <header className="text-center mb-8 md:mb-12 pt-4 md:pt-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Explore Our <span className="text-[#1895F0]">Drones</span> With More
              <br className="hidden md:block" />
              Options Ahead!
            </h1>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6">
            {/* DJI AGRAS T50 Card */}
            <div className="relative rounded-xl overflow-hidden bg-[#1895F0]/10 backdrop-blur-sm border border-[#1895F0]/30">
              <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">1111$</div>
              <div className="h-48 overflow-hidden">
                <img src={imgDrone2} alt="DJI AGRAS T50" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2">DJI AGRAS T50</h3>
                <p className="text-teal-100 text-sm leading-tight">
                  It can spray 40 kg or spread 50 kg with precision, leveraging a self-developing spraying system,
                  advanced radars, and a binocular vision system for centimeter-level navigation accuracy, ensuring
                  reliable and efficient performance.
                </p>
              </div>
            </div>

            {/* DJI AGRAS T25 Card */}
            <div className="relative rounded-xl overflow-hidden bg-[#1895F0]/10 backdrop-blur-sm border border-[#1895F0]/30">
              <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">1111$</div>
              <div className="h-48 overflow-hidden">
                <img 
                  src={imgT25}
                  alt="DJI AGRAS T25 drone"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2">DJI AGRAS T25</h3>
                <p className="text-teal-100 text-sm leading-tight">
                  The DJI AGRAS T25 is a lightweight agricultural drone with up to 25 kg payload capacity, advanced
                  sensors, and FPV camera, ideal for surveying, spraying, and spreading.
                </p>
              </div>
            </div>

            {/* DJI FlyCart 30 Card */}
            <div className="relative rounded-xl overflow-hidden bg-[#1895F0]/10 backdrop-blur-sm border border-[#1895F0]/30">
              <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">1111$</div>
              <div className="h-48 overflow-hidden">
                <img src={imgFlyCart} alt="DJI FlyCart 30" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2">DJI FlyCart 30</h3>
                <p className="text-teal-100 text-sm leading-tight">
                  DJI FlyCart 30 is a powerful heavy-lift drone with long-range capability, supporting Cargo and Winch
                  modes for safe and efficient air transport.
                </p>
              </div>
            </div>

            {/* Parrot Anafi USA Card */}
            <div className="relative rounded-xl overflow-hidden bg-[#1895F0]/10 backdrop-blur-sm border border-[#1895F0]/30">
              <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">1111$</div>
              <div className="h-48 overflow-hidden">
                <img src={imgAnafi} alt="Parrot Anafi USA" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2">Parrot Anafi USA</h3>
                <p className="text-teal-100 text-sm leading-tight">
                  The Parrot Anafi USA is a compact, high-performance surveillance drone with 32x zoom, thermal imaging,
                  and encrypted communication, designed for security, rescue, and inspection.
                </p>
              </div>
            </div>
          </div>

          {/* Fifth Card - Parrot Anafi USA drone */}
          <div className="relative rounded-xl overflow-hidden bg-[#1895F0]/10 backdrop-blur-sm border border-[#1895F0]/30 mx-auto max-w-sm md:max-w-md">
            <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">1111$</div>
            <div className="h-48 overflow-hidden">
              <img 
                src={imgAnafi2}
                alt="Parrot Anafi USA drone" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold text-lg mb-2">Parrot Anafi USA</h3>
              <p className="text-teal-100 text-sm leading-tight">
                The Parrot Anafi USA is a compact, high-performance surveillance drone with 32x zoom, thermal imaging,
                and encrypted communication, designed for security, rescue, and inspection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Drone