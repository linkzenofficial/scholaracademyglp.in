import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Jessica Adams',
    role: 'Alumni (2020 Batch)',
    text: 'Scholar Academy provided me with the solid foundation I needed for my career in Medicine. The teachers are incredibly supportive.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Michael Chen',
    role: 'Current Student',
    text: 'The STEM facilities here are top-notch. I love the hands-on approach to learning Physics and Robotics.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
  },
  {
    name: 'Sarah Thompson',
    role: 'Parent',
    text: 'We are very happy with the progress our children have made. The school focuses on character building as much as academics.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
];

const Testimonials = () => {
  return (
    <section className="py-10 md:py-12 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
            What People <span className="gradient-text">Say</span>
          </h2>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          className="pb-16"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl relative"
              >
                <div className="text-brand-blue/20 absolute top-6 right-8">
                  <FaQuoteLeft size={48} />
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full object-cover border-2 border-brand-blue" />
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">{item.name}</h4>
                    <p className="text-sm text-brand-blue">{item.role}</p>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed">
                  "{item.text}"
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
