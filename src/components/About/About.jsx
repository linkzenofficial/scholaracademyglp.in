import React from 'react';
import { motion } from 'framer-motion';
import mainBuilding from '../../assets/main bulding.jpg';

const About = () => {
  return (
    <section className="py-20 bg-transparent overflow-hidden">
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
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-premium border-4 border-white/10">
              <img 
                src={mainBuilding} 
                alt="Scholar Academy Main Building" 
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 gradient-bg rounded-2xl -z-0 opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-blue rounded-full -z-0 opacity-10 blur-2xl"></div>
            
            {/* Experience Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 right-[-20px] glass p-6 rounded-2xl shadow-premium z-20 hidden md:block border border-white/10"
            >
              <h4 className="text-4xl font-bold gradient-text">10+</h4>
              <p className="text-slate-600 dark:text-slate-200 font-medium">Years of Excellence</p>
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
            <span className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-4 block">
              About Our School
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6 leading-tight text-balance">
              Preparing Students for <span className="gradient-text">Success</span> in Life.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              At Scholar Academy, we believe that education is more than just academic achievement. 
              Our holistic approach focuses on developing critical thinking, creativity, and 
              character. Founded in 2014, we have consistently ranked among the top 
              educational institutions globally.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                { title: 'Global Curriculum', desc: 'Standardized and updated yearly.' },
                { title: 'Expert Faculty', desc: 'Masters and PhD qualified teachers.' },
                { title: 'Modern Labs', desc: 'Advanced STEM and computer facilities.' },
                { title: 'Sports Excellence', desc: 'Professional coaching and large grounds.' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-2 h-full gradient-bg rounded-full shrink-0"></div>
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-white">{item.title}</h5>
                    <p className="text-sm text-slate-500 dark:text-slate-300">{item.desc}</p>
                  </div>
                </div>
              ))}
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
