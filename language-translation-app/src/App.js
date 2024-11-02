import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TranslateForm from './components/TranslateForm';
import './App.css';

function App() {
  return (
    <div className="relative min-h-screen">
      <div className="animate-gradient"></div>
      <div className="relative z-10">
        <Header />
        <TranslateForm />
        <Footer />
      </div>
    </div>
  );
}

export default App;
