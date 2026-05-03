import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const defaultSlides = [
  {
    image_url: 'https://images.unsplash.com/photo-1523050853063-915894098232?q=80&w=1920&auto=format&fit=crop',
    title: 'Nurturing Minds, Building Futures',
    subtitle: 'Join Scholar Academy for a world-class educational experience.',
    position: 'c-left'
  },
  {
    image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1920&auto=format&fit=crop',
    title: 'Excellence in Academic Standards',
    subtitle: 'Providing cutting-edge curriculum and dedicated mentorship.',
    position: 'c-center'
  }
];

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch('https://scholaracademyglp.in/api/frontend/slider?branch_id=37');
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const result = await response.json();
        if (result.status === 'success' && result.data && result.data.length > 0) {
          setSlides(result.data);
        } else {
          setSlides(defaultSlides);
        }
      } catch (error) {
        console.error('Error fetching sliders:', error);
        setSlides(defaultSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  const getAlignmentClasses = (position) => {
    switch (position) {
      case 'c-center':
        return 'text-center items-center mx-auto';
      case 'c-right':
        return 'text-right items-end ml-auto';
      case 'c-left':
      default:
        return 'text-left items-start';
    }
  };

  if (loading) {
    return (
      <div className="h-[80vh] min-h-[600px] w-full bg-slate-100 dark:bg-slate-900 animate-pulse flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Creative Background Shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border-4 border-white/10 rounded-full animate-float pointer-events-none z-10"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 border-4 border-brand-purple/20 rounded-3xl rotate-45 animate-float pointer-events-none z-10 [animation-delay:1s]"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-brand-blue/10 rounded-full blur-xl animate-pulse pointer-events-none z-10"></div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="relative h-full w-full bg-cover bg-center flex items-center px-4"
              style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url(${slide.image_url})` }}
            >
              <div className="container mx-auto px-4 md:px-6">
                <motion.div
                  initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`max-w-3xl text-white flex flex-col ${getAlignmentClasses(slide.position)}`}
                >
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-block px-4 py-1 rounded-full bg-brand-blue/20 border border-white/20 backdrop-blur-md text-sm md:text-base font-bold tracking-widest uppercase mb-6"
                  >
                    Welcome to Scholar Academy
                  </motion.span>
                  <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tighter text-balance">
                    {slide.title.split(' ').map((word, i) => (
                      <span key={i} className={i % 2 === 1 ? 'gradient-text' : ''}>{word} </span>
                    ))}
                  </h2>
                  <p className="text-xl md:text-2xl mb-10 text-white/80 font-light max-w-xl text-balance">
                    {slide.subtitle || 'Empowering students to achieve excellence and personal growth through innovative learning.'}
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <button className="px-10 py-4 gradient-bg rounded-2xl font-bold shadow-[0_20px_50px_rgba(59,130,246,0.4)] hover-lift transition-all active:scale-95 text-lg">
                      Learn More
                    </button>
                    <button className="px-10 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl font-bold hover:bg-white hover:text-brand-blue hover-lift transition-all text-lg">
                      Contact Us
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Creative Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
        <span className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-bold">Scroll</span>
      </motion.div>
    </div>
  );
};

export default Hero;
