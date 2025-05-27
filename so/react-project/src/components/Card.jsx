import React from 'react';

const Card = () => {
  return (
   
   <div className='desplay flex '>
     <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:scale-105">
    {/* Card Image */}
    <div className="relative h-48 overflow-hidden">
      <img 
        className="w-full h-full object-cover"
        src="src/components/IMG_20210408_185429.jpg"
        alt="Beautiful landscape"
      />
      {/* Image overlay badge */}
      <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
        New
      </span>
    </div>

    {/* Card Content */}
    <div className="px-6 py-4">
      <div className="flex items-center mb-2">
        <span className="text-xs text-gray-500 mr-2">Category</span>
        <span className="text-xs text-gray-500">• 3 min read</span>
      </div>
      <h3 className="font-bold text-xl mb-2 text-gray-800">Beautiful Landscape Photography</h3>
      <p className="text-gray-600 text-base">
        Discover breathtaking views from around the world captured by professional photographers.
      </p>
    </div>

    </div>

   
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:scale-105">
    {/* Card Image */}
    <div className="relative h-48 overflow-hidden">
      <img 
        className="w-full h-full object-cover"
        src="src/components/IMG_20210408_185429.jpg"
        alt="Beautiful landscape"
      />
      {/* Image overlay badge */}
      <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
        New
      </span>
    </div>

    {/* Card Content */}
    <div className="px-6 py-4">
      <div className="flex items-center mb-2">
        <span className="text-xs text-gray-500 mr-2">Category</span>
        <span className="text-xs text-gray-500">• 3 min read</span>
      </div>
      <h3 className="font-bold text-xl mb-2 text-gray-800">Beautiful Landscape Photography</h3>
      <p className="text-gray-600 text-base">
        Discover breathtaking views from around the world captured by professional photographers.
      </p>
    </div>

    </div>

   

   </div>
     

    



    
       
        
 
     
     
  );
};

export default Card;