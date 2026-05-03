import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Admission from './pages/Admission';
import News from './pages/News';

// Scroll to top on route change
import ScrollToTop from './components/Common/ScrollToTop';
import BackToTop from './components/Common/BackToTop';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <BackToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<News />} />
            <Route path="/admission" element={<Admission />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
