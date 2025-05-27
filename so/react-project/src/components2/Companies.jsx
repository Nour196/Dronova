import React from 'react';

const companies = [
  {
    name: 'DJI',
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-8">
        <text x="0" y="30" fontFamily="Arial Black, Arial, sans-serif" fontWeight="bold" fontSize="32" fill="#111">DJI</text>
      </svg>
    ),
  },
  {
    name: 'Skydio',
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-8">
        <g>
          <rect x="10" y="10" width="24" height="12" fill="#111" />
          <text x="40" y="28" fontFamily="Arial Black, Arial, sans-serif" fontWeight="bold" fontSize="22" fill="#111">Skydio</text>
        </g>
      </svg>
    ),
  },
  {
    name: 'Autel Robotics',
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-8">
        <text x="0" y="28" fontFamily="Arial Black, Arial, sans-serif" fontWeight="bold" fontSize="28" fill="#FF3A2D">AUTEL</text>
        <text x="0" y="38" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="10" fill="#222">ROBOTICS</text>
      </svg>
    ),
  },
  {
    name: 'Delair',
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-8">
        <g>
          <rect x="10" y="10" width="10" height="10" rx="2" fill="#1895F0" />
          <text x="28" y="28" fontFamily="Arial Black, Arial, sans-serif" fontWeight="bold" fontSize="22" fill="#fff">DELAIR</text>
        </g>
      </svg>
    ),
  },
];

const Companies = () => {
  return (
    <div className="relative min-h-[60vh] flex flex-col items-center justify-center bg-black overflow-hidden py-16">
      {/* Blue radial glow background */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[900px] bg-[#1895F0] opacity-20 blur-3xl rounded-full z-0" />
      <div className="relative z-10 w-full">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Partnerships with Leading <br />
          <span className="text-[#1895F0]">Companies</span>
        </h2>
        {/* Logos */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {companies.map((company, idx) => (
            <div
              key={company.name}
              className="w-48 h-48 bg-gradient-to-b from-[#232b36] to-[#181f2a] rounded-full flex items-center justify-center border-2 border-[#1895F0] shadow-lg relative group transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 40px 0 #1895F0, 0 2px 8px 0 #0008' }}
            >
              {company.svg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
