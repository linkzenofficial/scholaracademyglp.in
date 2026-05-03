import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaSpinner } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Principal = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrincipal = async () => {
      try {
        const response = await fetch('https://scholaracademyglp.in/api/frontend/testimonial?branch_id=37');
        const result = await response.json();
        if ((result.status === 'success' || result.status === 'Success') && result.data) {
          const updatedData = result.data.map(item => {
            if (item.name.includes('Ahmed Hussain Mollah')) {
              return { ...item, designation: 'Principal' };
            }
            if (item.name.includes('Rofiqul Islam')) {
              return { ...item, designation: 'Secretary' };
            }
            return item;
          });
          setNews(updatedData);
        }
      } catch (error) {
        console.error('Error fetching principal data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrincipal();
  }, []);

  if (loading) return null;
  if (news.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          className="principal-swiper pb-16"
        >
          {news.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-[500px]">
                
                {/* Image Container */}
                <div className="w-full lg:w-1/3 relative shrink-0">
                  <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 group hover:rotate-2 transition-transform duration-700">
                    <img 
                      src={item.image_url || 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=800&auto=format&fit=crop'} 
                      alt={item.name} 
                      className="w-full aspect-[4/5] object-cover"
                    />
                  </div>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-purple/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-2/3 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-bold uppercase tracking-widest mb-8 w-fit">
                    {item.designation ? `Message from the ${item.designation}` : 'Message from the Principal'}
                  </div>
                  
                  <div className="relative mb-8">
                    <FaQuoteLeft className="text-6xl text-brand-blue/10 absolute -top-8 -left-8" />
                    <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white leading-tight mb-8 uppercase tracking-tighter">
                      Building a <span className="gradient-text">Legacy of Excellence</span> and Integrity.
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 italic leading-relaxed font-medium">
                      "{item.description}"
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-6 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <div>
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{item.name}</h4>
                      <p className="text-brand-blue font-bold tracking-wider uppercase text-sm mt-1">
                        {item.designation || 'Principal, Scholar Academy'}
                      </p>
                    </div>
                    <div className="hidden sm:block h-12 w-px bg-slate-200 dark:bg-slate-800 mx-4"></div>
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center border border-slate-100 dark:border-slate-700 shrink-0">
                      <span className="text-brand-blue font-black text-xl">SA</span>
                    </div>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Principal;
