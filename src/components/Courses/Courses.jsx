import React from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen, FaFlask, FaLaptopCode, FaPalette } from 'react-icons/fa';

const courses = [
  {
    title: 'Primary Education',
    desc: 'Foundational learning with a focus on core literacy and numeracy skills.',
    icon: FaBookOpen,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop',
    color: 'bg-blue-500',
  },
  {
    title: 'Science & Technology',
    desc: 'Advanced STEM programs covering Physics, Chemistry, and Biology.',
    icon: FaFlask,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop',
    color: 'bg-purple-500',
  },
  {
    title: 'Computer Science',
    desc: 'Coding, AI, and digital literacy to prepare for the future economy.',
    icon: FaLaptopCode,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
    color: 'bg-indigo-500',
  },
  {
    title: 'Arts & Humanities',
    desc: 'Creative expression through painting, music, and literary studies.',
    icon: FaPalette,
    image: 'https://images.unsplash.com/photo-1460661419201-fd4ce186860d?q=80&w=600&auto=format&fit=crop',
    color: 'bg-pink-500',
  },
];

const Courses = () => {
  return (
    <section className="py-10 md:py-12 bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4"
          >
            Our Popular <span className="gradient-text">Courses</span>
          </motion.h2>
          <p className="text-slate-500 dark:text-slate-300 max-w-2xl mx-auto">
            We offer a wide range of academic and extra-curricular programs designed to 
            foster excellence and innovation in every student.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group overflow-hidden border border-white/10 hover-lift shadow-premium"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className={`absolute bottom-4 right-4 p-3 rounded-xl text-white ${course.color} shadow-lg`}>
                  <course.icon size={24} />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                  {course.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-200 text-sm mb-6 line-clamp-3">
                  {course.desc}
                </p>
                <button className="text-brand-blue font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Read More <span>&rarr;</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-brand-blue text-brand-blue rounded-full font-bold hover:bg-brand-blue hover:text-white transition-all">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
