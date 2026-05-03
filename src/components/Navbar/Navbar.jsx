import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'About', path: '/#about' },
    { 
      name: 'Courses', 
      path: '/#courses',
      dropdown: [
        { name: 'Primary Education', path: '/courses/primary' },
        { name: 'Secondary Education', path: '/courses/secondary' },
        { name: 'Higher Secondary', path: '/courses/higher' },
        { name: 'Vocational Training', path: '/courses/vocational' },
      ]
    },
    { name: 'Faculty', path: '/#faculty' },
    { name: 'Gallery', path: '/#gallery' },
    { name: 'News', path: '/blog' },
    { name: 'Admission', path: '/admission' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <nav className={`sticky z-40 transition-all duration-500 mx-auto ${
      isScrolled 
        ? 'top-4 w-[95%] max-w-7xl rounded-full glass shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-2 border-white/40 mt-4' 
        : 'top-0 w-full bg-white/10 backdrop-blur-md py-3 border-white/10'
    } border-b lg:border-none`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-4">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <NavLink
                to={link.path}
                className={({ isActive }) => `
                  px-4 py-2 text-sm font-bold flex items-center gap-1 transition-all rounded-full
                  ${isScrolled 
                    ? isActive ? 'bg-brand-blue text-white shadow-lg' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    : isActive ? 'bg-brand-blue text-white shadow-lg' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                {link.name}
                {link.dropdown && <FaChevronDown size={8} className="group-hover:rotate-180 transition-transform" />}
              </NavLink>
              
              {link.dropdown && (
                <div className="absolute top-full left-0 hidden group-hover:block pt-2">
                  <div className="glass shadow-2xl rounded-xl overflow-hidden min-w-[200px] border border-white/20">
                    {link.dropdown.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className="block px-6 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-brand-blue/10 hover:text-brand-blue transition-colors"
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side: Dark Mode Toggle & CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              isScrolled ? 'hover:bg-slate-100 dark:hover:bg-slate-800' : 'hover:bg-white/10'
            }`}
          >
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className={isScrolled ? 'text-slate-600' : 'text-white'} />}
          </button>
          
          <button 
            onClick={() => window.location.href = 'https://scholaracademyglp.in/authentication'}
            className={`hidden sm:block px-6 py-2 rounded-full font-bold text-sm transition-all active:scale-95 ${
              isScrolled 
                ? 'gradient-bg text-white shadow-lg' 
                : 'bg-white text-brand-blue hover:shadow-xl'
            }`}
          >
            Login
          </button>
          
          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} className={isScrolled ? 'text-slate-700 dark:text-slate-200' : 'text-white'} /> : <FaBars size={24} className={isScrolled ? 'text-slate-700 dark:text-slate-200' : 'text-white'} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={() => !link.dropdown && setIsOpen(false)}
                    className="text-lg font-semibold text-slate-700 dark:text-slate-200 block"
                  >
                    {link.name}
                  </NavLink>
                  {link.dropdown && (
                    <div className="pl-4 mt-2 flex flex-col gap-2">
                      {link.dropdown.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className="text-slate-500 dark:text-slate-400 block py-1"
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={() => window.location.href = 'https://scholaracademyglp.in/authentication'}
                className="gradient-bg text-white w-full py-3 rounded-xl font-bold mt-4"
              >
                Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
