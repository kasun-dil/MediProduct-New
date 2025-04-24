import React from 'react';

const Hero = () => {
  return (
    <div className="relative w-full h-72 sm:h-96 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
        <button className="bg-white p-2 rounded-full shadow">‹</button>
        <button className="bg-white p-2 rounded-full shadow">›</button>
      </div>
      <img
        src="" // Replace with actual image or carousel logic
        alt="Slideshow"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Hero;
