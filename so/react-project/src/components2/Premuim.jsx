import React from 'react';

const Premuim = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#181f2a] to-black p-4">
      <div className="w-[1184px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 relative">
          <span className="text-white">The </span>
          <span className="text-[#1895F0] relative">
            Premium
            <span className="absolute inset-0 rounded-full bg-[#1895F0]/40 blur-md -z-10 justify-center"></span>
          </span>
          <span className="text-white"> Choice</span>
        </h1>

        <div className="relative group h-[570px]">
          <div className="absolute inset-0 rounded-[151px] bg-[#1895F0]/30 blur-lg group-hover:bg-[#1895F0]/40 transition-all duration-500 -z-10"></div>
          
          <div className="rounded-[151px] p-[2px] bg-gradient-to-br from-[#1895F0]/80 via-[#1895F0]/50 to-[#1895F0]/30 h-full">
            <div className="flex flex-col md:flex-row rounded-[151px] overflow-hidden bg-gradient-to-b from-gray-900/90 to-[#1895F0]/20 backdrop-blur-sm border border-[#1895F0]/40 h-full">
              <div className="md:w-1/2 h-full relative">
                <div className="absolute inset-0 rounded-l-[151px] border-l-2 border-t-2 border-b-2 border-[#1895F0]/50 pointer-events-none"></div>
                <img
                  src="https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="DJI AGRAS T50 agricultural drone"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative">
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#1895F0]/60 rounded-tr-[151px]"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#1895F0]/60 rounded-bl-[151px]"></div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative">
                  DJI AGRAS T50
                  <span className="absolute bottom-0 left-0 h-[2px] w-16 bg-[#1895F0]/90 rounded-full"></span>
                </h2>

                <div className="space-y-4 text-white/90">
                  <p className="relative pl-4 border-l-2 border-[#1895F0]/50">
                    is an <span className="font-semibold text-[#1895F0]">advanced agricultural drone</span> designed for high{" "}
                    <span className="font-semibold">stability</span> with a powerful{" "}
                    <span className="font-semibold">propulsion</span> system and{" "}
                    <span className="font-semibold">torque-resistant</span> structure.
                  </p>

                  <p className="relative pl-4 border-l-2 border-[#1895F0]/40">
                    It can spray 40 kg or spread 50 kg with precision, leveraging a dual atomizing spraying system, advanced
                    radars, and a <span className="font-semibold">binocular vision</span> system.
                  </p>

                  <p className="relative pl-4 border-l-2 border-[#1895F0]/30">
                    It excels in surveying, spraying, and spreading, ensuring reliable and{" "}
                    <span className="font-semibold text-[#1895F0]">efficient</span> performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premuim;