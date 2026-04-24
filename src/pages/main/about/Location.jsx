import { useState } from 'react';
import { FiMapPin, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { Media_link } from '../../../assets/media';

const LocationsSection = () => {
  const [activeTab, setActiveTab] = useState('Asia Pacific');

  return (
    <section id="locations" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-20 font-['Rajdhani']">
          Where we operate
        </h2>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Side: Accordion Menu */}
          <div className="lg:w-1/4 space-y-4">
            <div className="border-b border-gray-100">
              <button className="flex justify-between items-center w-full py-4 text-gray-400 font-bold">
                North America <FiChevronDown />
              </button>
            </div>
            <div className="border-b border-gray-100">
              <button className="flex justify-between items-center w-full py-4 text-gray-400 font-bold">
                Europe <FiChevronDown />
              </button>
            </div>
            <div className="border-b border-blue-600">
              <button className="flex justify-between items-center w-full py-4 text-blue-600 font-bold">
                Asia Pacific <FiChevronDown className="rotate-180" />
              </button>
              <div className="pl-4 pb-4 space-y-3 mt-2">
                <p className="text-slate-900 font-bold cursor-pointer">Lahore</p>
                <p className="text-gray-400 hover:text-slate-900 cursor-pointer">Karachi</p>
                <p className="text-gray-400 hover:text-slate-900 cursor-pointer">Islamabad</p>
                <p className="text-gray-400 hover:text-slate-900 cursor-pointer">Dubai</p>
              </div>
            </div>
          </div>

          {/* Right Side: Image & Details */}
          <div className="lg:w-3/4">
            <div className="rounded-2xl overflow-hidden shadow-2xl mb-8">
              <img 
                src={Media_link.company}
                alt="Traxio Lahore Office" 
                className="w-full h-[450px] object-cover"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900">Lahore</h3>
              <div className="flex items-center gap-2 text-blue-600 font-bold">
                <FiMapPin />
                <address className="not-italic underline">
                  Main Boulevard, Gulberg III, Lahore, Pakistan 54000
                </address>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                Lahore is the regional headquarters and tech hub of Traxio in South Asia, serving 
                all major logistics and operations industries in Pakistan. We are committed to 
                fostering local innovation in one of the most vibrant cities in Asia.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all mt-4">
                Explore open positions <FiArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;