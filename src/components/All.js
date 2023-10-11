import React from 'react'
import Navbar from './Navbar';
import Hero from './Hero';
import Analytics from './Analytics';
import Cards from './Cards';
import Newsletter from './Newsletter';
import Footer from './Footer';

const All = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Analytics />
      <Newsletter />
      {/* <Cards /> */}
      <Footer />
    </>
  );
}

export default All