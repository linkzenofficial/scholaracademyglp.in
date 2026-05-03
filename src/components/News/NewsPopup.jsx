import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaNewspaper, FaCalendarAlt, FaArrowRight, FaBell } from 'react-icons/fa';

const NewsPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://scholaracademyglp.in/api/frontend/news?branch_id=37');
        const result = await response.json();
        if ((result.status === 'success' || result.status === 'Success') && result.data && result.data.length > 0) {
          // Sort by date (newest first) and take the top 3
          const sortedNews = result.data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
          setNews(sortedNews);
          
          // Show popup after a short delay if there is news
          setTimeout(() => setIsOpen(true), 1500);
        }
      } catch (error) {
        console.error('Error fetching news for popup:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 dark:border-slate-800"
          >
            {/* Header */}
            <div className="gradient-bg p-8 text-white relative">
              <div className="absolute top-0 right-0 p-4">
                <button 
                  onClick={closePopup}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                  <FaBell className="text-3xl animate-bounce" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight uppercase">Latest News</h2>
                  <p className="text-white/80 font-medium">Important announcements & updates</p>
                </div>
              </div>
            </div>

            {/* News List */}
            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto mesh-gradient">
              {news.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="group flex gap-6 p-4 rounded-3xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                >
                  <div className="shrink-0 w-24 h-24 rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={item.image_url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=200&auto=format&fit=crop'} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-brand-blue text-xs font-bold mb-1">
                      <FaCalendarAlt size={10} />
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-tight group-hover:text-brand-blue transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
              <button 
                onClick={closePopup}
                className="text-slate-500 font-bold hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  closePopup();
                  window.location.href = '/blog';
                }}
                className="flex items-center gap-2 px-8 py-3 gradient-bg text-white font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                View All News <FaArrowRight />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewsPopup;
