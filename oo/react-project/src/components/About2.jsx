import React from 'react'

const About2 = () => {
  return (
    <div className="relative min-h-screen py-12 md:py-20" style={{ background: '#11151a' }} id="about">
      {/* Blue radial glow effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full" style={{ background: 'radial-gradient(circle at center, rgba(24,149,240,0.25) 0%, rgba(17,21,26,1) 70%)' }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="text-white">our</span> <span className="text-[#1895F0]">Achievements</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Card 1 */}
          <div className="bg-[#223a4e] rounded-lg p-6 md:p-8 shadow-lg relative">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="bg-[#1a3532] p-3 rounded-full w-fit mx-auto md:mx-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1895F0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L4 8l8 6 8-6-8-6z" />
                  <path d="M4 16l8 6 8-6" />
                  <path d="M4 12l8 6 8-6" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Algeria's First Drone Customization Platform</h3>
                <p className="text-sm md:text-base text-gray-300">
                  We launched the first platform in Algeria that allows industries to customize drones for their
                  specific needs.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#223a4e] rounded-lg p-6 md:p-8 shadow-lg relative">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="bg-[#1a3532] p-3 rounded-full w-fit mx-auto md:mx-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1895F0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Advanced Custom Drones for Institutions</h3>
                <p className="text-sm md:text-base text-gray-300">
                  We developed and delivered high-tech prototype drones tailored for institutional and professional use.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#223a4e] rounded-lg p-6 md:p-8 shadow-lg relative">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="bg-[#1a3532] p-3 rounded-full w-fit mx-auto md:mx-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1895F0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Nationwide Service Coverage</h3>
                <p className="text-sm md:text-base text-gray-300">
                  Our solutions are accessible across all of Algeria, from northern cities to the southern deserts.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#223a4e] rounded-lg p-6 md:p-8 shadow-lg relative">
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
              <div className="bg-[#1a3532] p-3 rounded-full w-fit mx-auto md:mx-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1895F0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">95% Customer Satisfaction</h3>
                <p className="text-sm md:text-base text-gray-300">
                  We provide a seamless customization experience, ensuring top-quality drones that meet industry
                  demands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About2