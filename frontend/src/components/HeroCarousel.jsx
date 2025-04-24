// HeroCarousel.jsx
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import col1 from '../assets/col1.jpeg';
import col2 from '../assets/col2.jpg';
import col3 from '../assets/col3.jpg';

const slides = [
  {
    image: col1,
    title: 'Trusted Counselling MediProduct Supplies',
    subtitle: 'Explore our wide range of Counselling medical products.',
    button: { label: 'Shop Now', color: 'bg-green-700 text-white' },
  },
  {
    image: 'https://img.freepik.com/free-photo/black-delivery-woman-with-packages-standing-mini-van-reading-shipment-schedule-list_637285-2124.jpg',
    title: 'Available COD & Card Payment',
    subtitle: 'Quick and safe Cash on Delivery',
    button: { label: 'View More', color: 'bg-green-700 text-white' },
  },
  {
    image: 'https://dy7glz37jgl0b.cloudfront.net/advice/images/0d179cf157769c86fce7c3cb67130215-man-sits-at-a-desk-while-looking-into-the-distance-in-front-of-a-computer_l.jpg',
    title: 'Check our Counseling Info',
    subtitle: 'All types of counselors listed on our site.',
    button: { label: 'Go to MedPortal', color: 'bg-green-700 text-white' },
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000); // auto change every 8s
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-20' : 'opacity-0 z-10'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            
          }}
        >
          <div className="h-full w-full flex flex-col justify-center px-6 md:px-20 bg-opacity-30 text-black">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-2xl">{slide.title}</h1>
            <p className="text-md md:text-xl mb-6">{slide.subtitle}</p>
            <button className={`px-6 py-2 rounded-lg w-max ${slide.button.color}`}>
              {slide.button.label}
            </button>
          </div>
        </div>
      ))}

      {/* Dot Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${
              current === idx ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>

     {/* Prev Button */}
<div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30">
  <button
    onClick={handlePrev}
    className="p-3 bg-white/50 hover:bg-white text-black rounded-full shadow-md"
  >
    <FaChevronLeft size={20} />
  </button>
</div>

{/* Next Button */}
<div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30">
  <button
    onClick={handleNext}
    className="p-3 bg-white/50 hover:bg-white text-black rounded-full shadow-md"
  >
    <FaChevronRight size={20} />
  </button>
</div>

    </div>
  );
}
