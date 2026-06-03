import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Faculty = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('https://scholaracademyglp.in/api/frontend/teachers?branch_id=37');
        const result = await response.json();
        console.log('API Response:', result);
        if (result.status === 'success' && result.data?.teachers) {
          setTeachers(result.data.teachers);
        } else {
          setTeachers([]);
        }
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

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

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(Array.isArray(teachers) ? teachers : []).map((teacher, index) => {
              const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}&background=random&size=400`;
              const imageUrl = teacher.photo_url || fallbackImage;
                
              return (
                <motion.div
                  key={teacher.id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-3xl overflow-hidden shadow-premium hover-lift transition-all group border border-white/10"
                >
                  <div className="relative overflow-hidden h-72">
                    <img 
                      src={imageUrl} 
                      alt={teacher.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                      }}
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
                    <p className="text-brand-blue font-semibold text-sm mb-2">{teacher.designation_name || 'Teacher'}</p>
                    <div className="h-px w-12 bg-slate-200 dark:bg-slate-700 mx-auto mb-3"></div>
                    <p className="text-slate-500 dark:text-slate-200 text-xs uppercase tracking-widest font-bold">
                      {teacher.department_name || 'General'}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Faculty;
