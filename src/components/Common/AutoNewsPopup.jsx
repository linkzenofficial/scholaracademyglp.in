import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaTimes, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const newsItems = [
  {
    id: 1,
    title: "Admission Going On",
    date: "March 9, 2026",
    // To use your real images:
    // 1. Move them to src/assets
    // 2. Import them at the top: import admissionImg from '../../assets/admission.jpg';
    // 3. Set image: admissionImg (without quotes)
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

const AutoNewsPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show popup after 1.5 seconds of page load
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleViewAll = () => {
    setIsOpen(false);
    navigate('/blog');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1e233a]/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-lg bg-[#f8f9fc] rounded-[2rem] shadow-2xl overflow-hidden relative"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4d88ff] to-[#a155ff] p-8 pb-10 text-white relative">
              <button 
                onClick={handleClose}
                className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors"
                aria-label="Close"
              >
                <FaTimes size={20} />
              </button>
              
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                  <FaBell size={28} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-wide m-0">LATEST NEWS</h2>
                  <p className="text-white/90 text-sm font-medium mt-1">Important announcements & updates</p>
                </div>
              </div>
            </div>

            {/* Content List - positioned slightly over the header */}
            <div className="px-6 pb-6 -mt-6 relative z-10">
              <Swiper
                direction="vertical"
                slidesPerView={2}
                spaceBetween={16}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="h-[224px]"
              >
                {newsItems.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div 
                      className="bg-white p-3 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow border border-gray-50 h-full"
                      onClick={() => {
                        setIsOpen(false);
                        navigate('/blog');
                      }}
                    >
                      <img src={item.image} alt={item.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-[#4d88ff] text-xs font-bold mb-1.5">
                          <FaCalendarAlt />
                          <span>{item.date}</span>
                        </div>
                        <h3 className="text-gray-900 font-bold text-base leading-snug line-clamp-2">{item.title}</h3>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 bg-[#f8f9fc] flex items-center justify-between">
              <button 
                onClick={handleClose}
                className="text-gray-500 font-bold hover:text-gray-800 transition-colors text-sm"
              >
                Close
              </button>
              <button 
                onClick={handleViewAll}
                className="bg-gradient-to-r from-[#4d88ff] to-[#a155ff] text-white px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md shadow-blue-500/30"
              >
                View All News <FaArrowRight size={12} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AutoNewsPopup;
