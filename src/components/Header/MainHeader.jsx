import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/logo-small-37.png';

const MainHeader = () => {
  return (
    <div className="bg-white/70 dark:bg-slate-900/80 py-6 px-4 relative overflow-hidden backdrop-blur-md border-b border-white/20">

      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center gap-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex items-center justify-center gap-4 md:gap-12 w-full"
        >
          {/* Left Logo */}
          <div className="relative shrink-0">
            <div className="absolute -inset-1 md:-inset-2 border border-brand-blue/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-xl animate-float overflow-hidden">
              <img src={logo} alt="Scholar Academy Logo" className="w-full h-full object-contain p-1" />
            </div>
          </div>

          <div className="flex flex-col items-center flex-grow max-w-[60%] md:max-w-none">
            <h1 className="text-2xl sm:text-5xl md:text-6xl font-black gradient-text leading-none tracking-tighter mb-2 md:mb-3">
              SCHOLAR ACADEMY
            </h1>
            <div className="flex items-center gap-2 md:gap-6 w-full justify-center">
              <div className="hidden sm:block h-px flex-grow max-w-[150px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"></div>
              <div className="flex flex-col items-center">
                <p className="text-xs sm:text-sm md:text-xl text-slate-500 dark:text-slate-300 font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase whitespace-nowrap">
                  Udise Code : 18030425505
                </p>
                <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase mt-1">
                  Estd : 2014
                </p>
              </div>
              <div className="hidden sm:block h-px flex-grow max-w-[150px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"></div>
            </div>
          </div>

          {/* Right Logo */}
          <div className="relative shrink-0">
            <div className="absolute -inset-1 md:-inset-2 border border-brand-purple/20 rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-xl animate-float [animation-delay:0.5s] overflow-hidden">
              <img src={logo} alt="Scholar Academy Logo" className="w-full h-full object-contain p-1" />
            </div>
          </div>
        </motion.div>
        

      </div>
    </div>
  );
};

export default MainHeader;
