import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaImage, FaSpinner, FaSearchPlus } from 'react-icons/fa';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('https://scholaracademyglp.in/api/frontend/gallery?branch_id=37');
        if (!response.ok) throw new Error('Gallery fetch failed');
        const result = await response.json();
        if ((result.status === 'success' || result.status === 'Success') && result.data) {
          setImages(result.data);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = ['All', ...new Set(images.map(img => img.category || 'School'))];

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => (img.category || 'School') === activeCategory);

  return (
    <section className="py-10 md:py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-bold uppercase tracking-widest mb-6"
          >
            <FaImage />
            Visual Journey
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white mb-8 uppercase tracking-tighter">
            Our <span className="gradient-text">Gallery</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl font-bold transition-all ${
                  activeCategory === cat 
                    ? 'gradient-bg text-white shadow-[0_10px_25px_rgba(0,0,0,0.15)] scale-105' 
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-5xl text-brand-blue mb-4" />
            <p className="text-slate-500 font-bold">Capturing moments...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 glass rounded-[3rem]">
            <p className="text-xl text-slate-500 font-medium">No images found in the gallery.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative group rounded-[2.5rem] overflow-hidden aspect-square shadow-premium hover-lift transition-all duration-500"
                >
                  <img 
                    src={image.thumb_image_url || image.images_url?.[0]} 
                    alt={image.title || 'Gallery Image'} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-brand-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
                      {image.category || 'School'}
                    </p>
                    <h4 className="text-white text-xl font-bold mb-4 line-clamp-1">
                      {image.title || 'Scholar Academy Moment'}
                    </h4>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-blue transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                      <FaSearchPlus size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
