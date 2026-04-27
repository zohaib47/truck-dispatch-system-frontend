import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import brand from "../../../config/brand";
import { Media_link } from "../../../assets/media";

const HistorySection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      // scrollLeft ko container width ke barabar move karna responsive banata hai
      const scrollAmount = current.clientWidth; 
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const historyData = [
    {
      id: 1,
      tag: "Our History",
      yearTitle: "2020: Adapting Fast",
      description: `${brand.name} focused on remote work and digital fleet management solutions in 2020.`,
      activeYear: "Active: 2020",
      image: Media_link.leadership,
    },
    {
      id: 2,
      tag: "Our History",
      yearTitle: "2021: Scaling Up",
      description: "Expanded into new markets and introduced advanced sensor technology for real-time monitoring.",
      activeYear: "Active: 2021",
      image: Media_link.ourHistory2018,
    },
    {
      id: 3,
      tag: "Our History",
      yearTitle: "2022: Future Growth",
      description: "Achieved significant growth milestones by integrating AI-driven predictive maintenance.",
      activeYear: "Active: 2022",
      image: Media_link.leadership,
    },
  ];

  return (
    <div className="space-y-12 md:space-y-20">
      {/* SECTION 1: HISTORY */}
      <section id="history" className="py-12 md:py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative">
          
          {/* Navigation Buttons - Hidden on Mobile for better UX, or kept small */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 hidden md:flex justify-between z-10 px-2 pointer-events-none">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 bg-blue-600/90 rounded-full flex items-center justify-center text-white shadow-xl pointer-events-auto hover:bg-blue-700 transition-all"
            >
              <FiChevronLeft size={28} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 bg-blue-600/90 rounded-full flex items-center justify-center text-white shadow-xl pointer-events-auto hover:bg-blue-700 transition-all"
            >
              <FiChevronRight size={28} />
            </button>
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
            style={{ 
                scrollbarWidth: "none", 
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch" // iOS smooth momentum scroll
            }}
          >
            {historyData.map((item) => (
              <div
                key={item.id}
                className="w-full min-w-full flex-shrink-0 snap-center px-2"
              >
                {/* Card Design - Responsive Padding & Flex Direction */}
                <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-16 shadow-sm flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                  
                  {/* Image Content - Moves to top on Mobile */}
                  <div className="w-full md:w-1/2 order-1 md:order-2">
                    <img
                      src={item.image}
                      className="rounded-2xl shadow-md w-full h-[250px] md:h-[400px] object-cover"
                      alt={item.yearTitle}
                    />
                  </div>

                  {/* Text Content - Below image on Mobile */}
                  <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left">
                    <p className="text-blue-600 font-bold text-[10px] md:text-xs uppercase mb-2 md:mb-4 tracking-widest">
                      {item.tag}
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
                      {item.yearTitle}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="border-t border-gray-100 pt-4 md:pt-6 font-bold text-blue-600 text-sm md:text-base">
                      {item.activeYear}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Indicator Dots (Optional but good for UX) */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {historyData.map((_, index) => (
              <div key={index} className="w-2 h-2 rounded-full bg-blue-200" />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR PEOPLE (Already responsive in structure) */}
      <section id="people" className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">
              Our people
            </p>
            <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 mb-6 md:mb-8 leading-tight">
              Meet our leaders
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 md:mb-10">
              {brand.name} prides itself not only on award-winning technology
              but also on the talent of its people.
            </p>
            <button className="bg-blue-600 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-blue-700 transition-all shadow-lg active:scale-95">
              Learn more
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={Media_link.ourHistory2020}
              className="rounded-2xl shadow-xl w-full object-cover h-[300px] md:h-auto"
              alt="Leaders"
            />
          </div>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default HistorySection;