import React from 'react';

const AboutUs = () => {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[70vh]" style={{ backgroundImage: `url('about.jpg')` }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 md:px-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Delivering trusted medical solutions for healthier communities.
            </p>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            At <span className="font-semibold text-green-600">Mediproduct</span>, we specialize in delivering high-quality medical products to healthcare providers, pharmacies, and individuals. With a strong commitment to safety, reliability, and innovation, we ensure that our customers receive only the best in healthcare essentials.
          </p>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="bg-gray-50 py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To empower healthcare systems and communities by providing accessible, top-tier medical supplies that support wellness and life-saving care.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To be a leading force in transforming healthcare through innovative supply solutions, trusted partnerships, and unwavering integrity.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-green-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Essential Medical Supplies</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                From PPE to basic care kits, we ensure top-quality essentials for clinics, hospitals, and homes — always in stock and ready to ship.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Affordable & Reliable</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We believe healthcare should be affordable. Our pricing is transparent, fair, and crafted for long-term partnerships and trust.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Quick Delivery & Support</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We work around the clock to deliver your orders on time, and our support team is just a message away for all your needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
