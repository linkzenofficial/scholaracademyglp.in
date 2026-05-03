import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPaperPlane } from 'react-icons/fa';
import logo from '../../assets/logo-small-37.png';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden p-1">
                <img src={logo} alt="Scholar Academy Logo" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tighter">Scholar Academy</h3>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Moriom Nagar, P.O: Baladamari, PS :Goalpara, Dist: Goalpara, (Assam) Pin 783101
            </p>
            <div className="text-slate-400 mb-8 space-y-2 text-sm">
              <p className="flex items-center gap-2 font-medium"><span className="text-brand-blue">P:</span> +91 9707628100</p>
              <p className="flex items-center gap-2 font-medium"><span className="text-brand-blue">E:</span> scholaracademyglp@gmail.com</p>
            </div>
            <div className="flex gap-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:gradient-bg">
              Quick Links
            </h4>
            <ul className="space-y-4 text-slate-400">
              {['Home', 'About Us', 'Our Courses', 'Faculty', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-brand-blue transition-colors flex items-center gap-2">
                    <span className="text-xs">&raquo;</span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:gradient-bg">
              Resources
            </h4>
            <ul className="space-y-4 text-slate-400">
              {['Admissions', 'Academic Calendar', 'School Portal', 'Library', 'E-Learning', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-brand-blue transition-colors flex items-center gap-2">
                    <span className="text-xs">&raquo;</span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:gradient-bg">
              Newsletter
            </h4>
            <p className="text-slate-400 mb-6">
              Subscribe to get the latest news and updates from our school.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 gradient-bg rounded-lg">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Scholar Academy (Estd: 2014). All rights reserved. Developed by <a href="https://linkzen.in" className="text-brand-blue hover:underline">Linkzen Technology</a></p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
