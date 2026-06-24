import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaChalkboardTeacher, FaLaptop, FaTrophy } from 'react-icons/fa';
import mainBuilding from '../../assets/main bulding.jpg';

const About = () => {
  return (
    <section className="py-10 md:py-12 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 group">
              <img 
                src={mainBuilding} 
                alt="Scholar Academy Main Building" 
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#4d88ff] to-[#a155ff] rounded-3xl -z-0 opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-blue rounded-full -z-0 opacity-10 blur-3xl"></div>
            
            {/* Experience Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -bottom-8 -right-4 lg:-right-10 bg-white dark:bg-slate-800 p-5 pr-8 rounded-[2rem] shadow-xl z-20 hidden md:flex items-center gap-5 border border-slate-100 dark:border-slate-700"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4d88ff] to-[#a155ff] flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-blue-500/30">
                10+
              </div>
              <div>
                <p className="text-slate-800 dark:text-white font-black text-xl leading-tight">Years of<br/>Excellence</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-black uppercase tracking-widest mb-6 w-fit">
              About Our School
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-6 leading-tight tracking-tighter text-balance">
              Preparing Students for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4d88ff] to-[#a155ff]">Success</span> in Life.
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-medium">
              At Scholar Academy, we believe that education is more than just academic achievement. 
              Our holistic approach focuses on developing critical thinking, creativity, and 
              character. Founded in 2014, we have consistently ranked among the top 
              educational institutions globally.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 mb-10">
              {[
                { title: 'Global Curriculum', desc: 'Standardized and updated yearly.', icon: FaGlobe },
                { title: 'Expert Faculty', desc: 'Masters and PhD qualified teachers.', icon: FaChalkboardTeacher },
                { title: 'Modern Labs', desc: 'Advanced STEM and computer facilities.', icon: FaLaptop },
                { title: 'Sports Excellence', desc: 'Professional coaching and large grounds.', icon: FaTrophy },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-blue transition-colors duration-300">
                    <Icon className="text-brand-blue text-xl group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h5 className="font-black text-slate-800 dark:text-white text-lg mb-1">{item.title}</h5>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )})}
            </div>
            
            <button className="px-10 py-4 gradient-bg text-white rounded-full font-bold hover:shadow-lg transition-all active:scale-95">
              Read More About Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
