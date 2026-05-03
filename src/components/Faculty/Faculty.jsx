import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const teachers = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Principal',
    subject: 'Education Management',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Prof. David Miller',
    role: 'Vice Principal',
    subject: 'Advanced Mathematics',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Ms. Emily White',
    role: 'Senior Teacher',
    subject: 'English Literature',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Mr. Robert Wilson',
    role: 'HOD Science',
    subject: 'Physics & Astronomy',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
  },
];

const Faculty = () => {
  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Meet Our <span className="gradient-text">Expert Faculty</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Our teachers are more than just instructors; they are mentors dedicated to 
            guiding students towards their highest potential.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow group border border-white/10"
            >
              <div className="relative overflow-hidden h-72">
                <img 
                  src={teacher.image} 
                  alt={teacher.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <div className="flex gap-4">
                    {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, i) => (
                      <a key={i} href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-colors">
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                  {teacher.name}
                </h4>
                <p className="text-brand-blue font-semibold text-sm mb-2">{teacher.role}</p>
                <div className="h-px w-12 bg-slate-200 dark:bg-slate-700 mx-auto mb-3"></div>
                <p className="text-slate-500 dark:text-slate-300 text-xs uppercase tracking-widest font-bold">
                  {teacher.subject}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faculty;
