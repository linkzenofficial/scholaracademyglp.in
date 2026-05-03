import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaNewspaper, FaSpinner, FaBell } from 'react-icons/fa';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://scholaracademyglp.in/api/frontend/news?branch_id=37');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        if ((result.status === 'success' || result.status === 'Success') && result.data) {
          setNews(result.data);
        } else {
          setError(result.message || 'Failed to load news');
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('An error occurred while fetching news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 mesh-gradient">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-bold uppercase tracking-widest mb-6">
            <FaBell className="animate-bounce" />
            Stay Updated
          </div>
          <h1 className="text-4xl md:text-7xl font-black gradient-text mb-6 uppercase tracking-tighter">
            News & Notifications
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto text-lg">
            Keep track of the latest happenings, academic announcements, and special events at Scholar Academy.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-5xl text-brand-blue mb-4" />
            <p className="text-slate-500 font-bold animate-pulse">Fetching latest updates...</p>
          </div>
        ) : error ? (
          <div className="glass rounded-3xl p-12 text-center max-w-2xl mx-auto border-red-200/30">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaNewspaper size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Oops! Something went wrong</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 gradient-bg text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all"
            >
              Try Again
            </button>
          </div>
        ) : news.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center max-w-2xl mx-auto">
            <FaNewspaper className="text-slate-300 dark:text-slate-700 text-6xl mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">No news available yet</h2>
            <p className="text-slate-500 dark:text-slate-500 mt-2">Check back later for exciting updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-full"
              >
                <div className="glass h-full rounded-[2.5rem] overflow-hidden border border-white/20 dark:border-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image_url || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop'} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 right-4 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white text-xs font-bold flex items-center gap-2">
                      <FaCalendarAlt className="text-brand-blue" />
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 line-clamp-2 group-hover:text-brand-blue transition-colors leading-tight">
                      {item.title}
                    </h3>
                    
                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                      <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        Scholar Academy
                      </span>
                      <button className="p-3 rounded-full bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white transition-all">
                        <FaBell size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
