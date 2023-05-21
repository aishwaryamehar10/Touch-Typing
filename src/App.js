import React from 'react';
import TypingBox from './TypingBox';
import './App.css';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <TypingBox />
      <Footer />
    </div>
  );
}

export default App;
