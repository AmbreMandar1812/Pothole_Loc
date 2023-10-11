import React from 'react';
import Analytics from './components/Analytics';
import Cards from './components/Cards';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import Maps from './components/Maps';
import All from './components/All';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import About from './components/About';

function App() {
  return (
    <div>
      {/* <Navbar />
      <Hero />
      <Analytics />
      <Newsletter />
      <Cards />
      <Footer /> */}
      <Router>
        <Routes>
          <Route path="/" element={<All />}></Route>
          <Route path="/maps" element={<Maps />}></Route>
          <Route path="/about" element={<About />}></Route>

        </Routes>
      </Router>
      {/* <Maps /> */}
    </div>
  );
}

export default App;
