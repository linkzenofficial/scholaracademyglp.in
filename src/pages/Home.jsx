import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Principal from '../components/About/Principal';
import Courses from '../components/Courses/Courses';
import Faculty from '../components/Faculty/Faculty';
import Gallery from '../components/Gallery/Gallery';
import Testimonials from '../components/Testimonials/Testimonials';
import Contact from '../components/Contact/Contact';

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <>
      <div id="home"><Hero /></div>
      <div id="about"><About /></div>
      <Principal />
      <div id="courses"><Courses /></div>
      <div id="faculty"><Faculty /></div>
      <div id="gallery"><Gallery /></div>
      <Testimonials />
      <div id="contact"><Contact /></div>
    </>
  );
};

export default Home;
