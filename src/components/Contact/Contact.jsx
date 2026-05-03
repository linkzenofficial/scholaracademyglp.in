import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelopeOpenText } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:w-1/3"
          >
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10">
              Have questions? We're here to help. Reach out to us via phone, 
              email, or visit our campus.
            </p>
            
            <div className="space-y-8">
              {[
                { icon: FaMapMarkerAlt, title: 'Visit Us', content: 'Moriom Nagar, P.O: Baladamari, PS :Goalpara, Dist: Goalpara, (Assam) Pin 783101' },
                { icon: FaPhoneAlt, title: 'Call Us', content: '+91 9707628100' },
                { icon: FaEnvelopeOpenText, title: 'Email Us', content: 'scholaracademyglp@gmail.com' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:w-2/3 glass-card p-10"
          >
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Full Name</label>
                <input type="text" placeholder="John Doe" className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Email Address</label>
                <input type="email" placeholder="john@example.com" className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Subject</label>
                <input type="text" placeholder="Inquiry about Admission" className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-600 dark:text-slate-300">Message</label>
                <textarea rows="5" placeholder="How can we help you?" className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="w-full py-4 gradient-bg text-white font-bold rounded-xl shadow-xl hover:scale-[1.02] transition-transform active:scale-95">
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
        
        {/* Map Placeholder */}
        <div className="mt-20 h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.6581660729526!2d90.6306709!3d26.1426864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3759b3e5c4da3a0d%3A0xe5322c165cac8483!2sScholar%20Academy!5e0!3m2!1sen!2sin!4v1777834438034!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
