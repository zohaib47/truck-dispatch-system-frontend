import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import brand from '../../../config/brand';

import pic1 from '../../../assets/images/Leadership-new.webp'
import pic2 from '../../../assets/images/Our_History_2020.webp'
import pic3 from '../../../assets/images/Our_History_2018.webp'

const HistorySection = () => {
  // Scroll container ka reference
  const scrollRef = useRef(null);

  // Scroll function: 400px left ya right move karega
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === 'left') {
      current.scrollBy({ left: -400, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <div>
    <section id="history" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        
        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-10 px-2 pointer-events-none">
  <button 
    onClick={() => scroll('left')}
    className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl pointer-events-auto hover:bg-blue-700 transition-all hover:scale-110 active:scale-95"
  >
    <FiChevronLeft size={32} strokeWidth={3} /> {/* Size bara aur strokeWidth se bold kiya */}
  </button>
  
  <button 
    onClick={() => scroll('right')}
    className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl pointer-events-auto hover:bg-blue-700 transition-all hover:scale-110 active:scale-95"
  >
    <FiChevronRight size={32} strokeWidth={3} /> {/* Size bara aur strokeWidth se bold kiya */}
  </button>
</div>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Card 1 (2020) */}
          <div className="min-w-[90%] md:min-w-[100%] snap-center">
            <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-sm flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <p className="text-blue-600 font-bold text-xs uppercase mb-4">Our history</p>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">2020: Adapting Fast</h2>
                <p className="text-gray-600 text-lg mb-8">
                  {brand.name} ne 2020 mein remote work aur digital fleet management solutions par focus kiya.
                </p>
                <div className="border-t border-gray-100 pt-6 font-bold text-blue-600">Active: 2020</div>
              </div>
              <div className="md:w-1/2">
                <img src={pic3} className="rounded-2xl shadow-lg" alt="2020" />
              </div>
            </div>
          </div>

          {/* Card 2 (2021) */}
          <div className="min-w-[90%] md:min-w-[100%] snap-center">
            <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-sm flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <p className="text-blue-600 font-bold text-xs uppercase mb-4">Our history</p>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">2021: Scaling Up</h2>
                <p className="text-gray-600 text-lg mb-8">
                  Naye markets mein expansion aur advanced sensor technology ka aaghaz kiya gaya.
                </p>
                <div className="border-t border-gray-100 pt-6 font-bold text-gray-400">Milestone: 2021</div>
              </div>
              <div className="md:w-1/2">
                <img src={pic2} className="rounded-2xl shadow-lg" alt="2021" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tailwind Style for hiding scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
    {/* SECTION 2: OUR PEOPLE */}
      <section id="people" className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">Our people</p>
            <h2 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-8 leading-tight">
              Meet our leaders
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed mb-10">
              {brand.name} prides itself not only on award-winning technology but also on the talent 
              of its people. The company thrives under the guidance and leadership of the brightest minds.
            </p>
            <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg">
              Learn more
            </button>
          </div>
          <div className="md:w-1/2">
            <img 
              src={pic1}
              className="rounded-2xl shadow-2xl w-full object-cover" 
              alt="Leaders" 
            />
          </div>
        </div>
      </section>
      </div>
  );
};

export default HistorySection;