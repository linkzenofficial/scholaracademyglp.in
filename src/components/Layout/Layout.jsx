import React from 'react';
import TopBar from '../Header/TopBar';
import MainHeader from '../Header/MainHeader';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden mesh-gradient">
      {/* Creative Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/20 rounded-full blob-shape animate-blob"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-purple/20 rounded-full blob-shape animate-blob [animation-delay:2s]"></div>
      <div className="fixed top-[40%] left-[60%] w-[20%] h-[20%] bg-blue-400/10 rounded-full blob-shape animate-blob [animation-delay:4s]"></div>
      
      <TopBar />
      <MainHeader />
      <Navbar />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
