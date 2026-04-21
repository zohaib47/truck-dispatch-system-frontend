import { FiAward } from 'react-icons/fi';
import brand from '../../../config/brand';

import cert1 from '../../../assets/images/cert1.webp'

const AwardsSection = () => {
  // 9 awards ka array (Aap images ke links yahan change kar saktay hain)
  const awards = [
    { id: 1, img: " https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop" , title: "Best Companies" },
    { id: 2, img: "https://images.unsplash.com/photo-1578496479914-7235024c1121?w=400&h=400&fit=crop", title: "Best Places" },
    { id: 3, img: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=400&h=400&fit=crop", title: "Built In 2024" },
    { id: 4, img: "https://images.unsplash.com/photo-1589330273594-fade1ee91647?w=400&h=400&fit=crop", title: "Great Place" },
    { id: 5, img: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=400&h=400&fit=crop", title: "AI Award" },
    { id: 6, img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&h=400&fit=crop", title: "Frost & Sullivan" },
    { id: 7, img: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=400&h=400&fit=crop", title: "AI Award" },
    { id: 8, img: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=400&h=400&fit=crop", title: "Built In 2024" },
    { id: 9, img: "https://images.unsplash.com/photo-1589330273594-fade1ee91647?w=400&h=400&fit=crop", title: "Great Place" },
  ];

  return (
    <section id="awards" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Content */}
        <div className="lg:w-2/5">
          <div className="flex items-center gap-3 mb-4">
            <FiAward size={24} className="text-blue-600" />
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">
              Award winning
            </p>
          </div>
          <h2 className="text-5xl md:text-5xl font-bold text-[#0A1628] mb-8 leading-tight font-['Rajdhani']">
            A leader in Physical Operations technology
          </h2>
          <p className="text-gray-600 text-xl leading-relaxed">
            We are helping our customers build for tomorrow. Forbes Cloud 100 aur 
            Glassdoor Best Places to Work mein shamil.
          </p>
        </div>

        {/* Right Side: Grid with Hover Effect */}
        <div className="lg:w-3/5 grid grid-cols-2 md:grid-cols-3 gap-4">
          {awards.map((award) => (
            <div 
              key={award.id} 
              className="bg-[#F8FAFC] rounded-2xl p-6 flex items-center justify-center group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-gray-100"
            >
              <img 
                src={award.img} 
                alt={award.title}
                className="w-full h-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AwardsSection;