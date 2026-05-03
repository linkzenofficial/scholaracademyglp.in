import React from 'react';
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TopBar = () => {
  return (
    <div className="hidden md:block bg-brand-dark text-white py-2 px-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center text-sm">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 hover:text-brand-blue transition-colors cursor-pointer">
            <FaPhone size={14} />
            <span>+91 9707628100</span>
          </div>
          <div className="flex items-center gap-2 hover:text-brand-blue transition-colors cursor-pointer">
            <FaEnvelope size={14} />
            <span>scholaracademyglp@gmail.com</span>
          </div>
        </div>
        
        <div className="flex gap-4 items-center">
          {[FaFacebook, FaInstagram, FaYoutube, FaTwitter].map((Icon, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ scale: 1.2, color: '#3b82f6' }}
              className="hover:text-brand-blue transition-colors"
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
