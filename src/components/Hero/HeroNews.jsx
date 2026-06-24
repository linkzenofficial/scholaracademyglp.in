import React from 'react';
import { FaBell, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const newsItems = [
  {
    id: 1,
    title: "Admission Going On",
    date: "March 9, 2026",
    // Import real image like: import admissionImg from '../../assets/admission.jpg';
    image: "https://placehold.co/150x150/4d88ff/ffffff?text=Admission", 
  },
  {
    id: 2,
    title: "Digital Attendance System with ID Cards",
    date: "June 21, 2025",
    image: "https://placehold.co/150x150/a155ff/ffffff?text=ID+Card",
  },
  {
    id: 3,
    title: "Annual Sports Week Scheduled for Next Month",
    date: "July 10, 2026",
    image: "https://placehold.co/150x150/1e233a/ffffff?text=Sports",
  }
];

const HeroNews = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/blog');
  };

  return (
    <div className="w-full h-full bg-[#f8f9fc] flex flex-col relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4d88ff] to-[#a155ff] p-6 lg:p-8 xl:p-10 text-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 lg:p-4 rounded-2xl backdrop-blur-md">
            <FaBell className="text-white text-2xl lg:text-3xl" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-wide m-0">LATEST NEWS</h2>
            <p className="text-white/90 text-sm font-medium mt-1">Important announcements</p>
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="p-6 lg:p-8 xl:p-10 flex-grow overflow-hidden bg-white">
        <Swiper
          direction="vertical"
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="h-full w-full"
        >
          {newsItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div 
                className="bg-[#f8f9fc] p-4 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100 h-full"
                onClick={() => navigate('/blog')}
              >
                <img src={item.image} alt={item.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[#4d88ff] text-xs font-bold mb-2">
                    <FaCalendarAlt />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-gray-900 font-bold text-base leading-tight line-clamp-2">{item.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Footer */}
      <div className="p-6 bg-white flex items-center justify-center shrink-0 border-t border-gray-100">
        <button 
          onClick={handleViewAll}
          className="bg-gradient-to-r from-[#4d88ff] to-[#a155ff] text-white px-8 py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/30 w-full"
        >
          View All News <FaArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default HeroNews;
