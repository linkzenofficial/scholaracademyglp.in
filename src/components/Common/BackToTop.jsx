import React, { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 z-50 w-12 h-12 gradient-bg text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <FaChevronUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
