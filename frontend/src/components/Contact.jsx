import React, { useState } from 'react';
import { Mail, MapPin, Phone, Globe, FacebookIcon } from 'lucide-react'; // using Globe as placeholder for Facebook

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert("Thank you for contacting us!");
  };

  return (
    <div className="text-gray-800 font-sans">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[70vh]"
        style={{ backgroundImage: `url('https://img.freepik.com/free-photo/business-people-communication-colleagues-working-concept_53876-13891.jpg?semt=ais_hybrid&w=740')` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 md:px-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Contact Us</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Reach out to Mediproduct — we're here to assist you with your questions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section with Form + Office Info */}
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side: Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6">We’d Love to Hear from You</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-lg font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side: Contact Info */}
          <div className="text-left">
            <h2 className="text-3xl font-bold mb-6">More Contact to Us</h2>
            <p className="text-lg text-gray-600 mb-8">
              Feel free to reach out or visit us for more inquiries.
            </p>
            <div className="space-y-6 text-gray-700">
              <div className="flex items-start gap-4">
                <MapPin className="text-green-600 w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p>MedPortal, Pitipana North, Homagama</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-green-600 w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p>medportal.lk@gmail.com.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-green-600 w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p>+94 (76) 469-4845</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FacebookIcon className="text-green-600 w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-lg">Facebook</h3>
                  <a href="https://facebook.com/mediproduct" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    facebook.com/mediproduct
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-3">Still have questions? What is counselling</h2>
        <p className="mb-6 text-lg">You can channel Counsellors and get the more information browse this web</p>
        <a href="https://medportal-project.netlify.app/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
        <button className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
          Go to MedPortal
        </button>
        </a>
       
      </section>
    </div>
  );
};

export default ContactUs;
