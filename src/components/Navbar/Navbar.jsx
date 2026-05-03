import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      setCurrentHash(window.location.hash);
    };
    
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
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
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Spacer to push links to middle */}
        <div className="hidden lg:block flex-1"></div>

        {/* Desktop Links - CENTERED */}
        <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 flex-[2]">
          {navLinks.map((link) => {
            const isHash = link.path.startsWith('/#');
            const hash = isHash ? link.path.split('#')[1] : null;
            
            return (
              <div key={link.name} className="relative group">
                <NavLink
                  to={link.path}
                  className={({ isActive }) => {
                    const isActuallyActive = isHash 
                      ? currentHash === `#${hash}` || (currentHash === '' && hash === 'home')
                      : isActive;
                    
                    return `
                      px-4 py-2 text-sm font-bold flex items-center gap-1 transition-all rounded-full whitespace-nowrap
                      ${isActuallyActive 
                        ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30' 
                        : isScrolled 
                          ? 'text-slate-700 dark:text-slate-200 hover:bg-brand-blue/10 hover:text-brand-blue' 
                          : 'text-slate-600 dark:text-slate-300 hover:bg-white/20 hover:text-white'
                      }
                    `;
                  }}
                >
                  {link.name}
                  {link.dropdown && <FaChevronDown size={8} className="group-hover:rotate-180 transition-transform" />}
                </NavLink>
              
              {link.dropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block pt-2">
                  <div className="glass shadow-premium rounded-2xl overflow-hidden min-w-[220px] border border-white/20 p-2">
                    {link.dropdown.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className="block px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-brand-blue/10 hover:text-brand-blue rounded-xl transition-all"
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
              </div>
            );
          })}
        </div>

        {/* Right side: Dark Mode Toggle & CTA */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all ${
              isScrolled ? 'hover:bg-slate-100 dark:hover:bg-slate-800' : 'hover:bg-white/20'
            }`}
          >
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className={isScrolled ? 'text-slate-600' : 'text-white'} />}
          </button>
          
          <button 
            onClick={() => window.location.href = 'https://scholaracademyglp.in/authentication'}
            className={`hidden sm:block px-6 py-2.5 rounded-full font-bold text-sm transition-all active:scale-95 shadow-premium ${
              isScrolled 
                ? 'gradient-bg text-white shadow-brand-blue/30' 
                : 'bg-white text-brand-blue hover:bg-brand-blue hover:text-white'
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
