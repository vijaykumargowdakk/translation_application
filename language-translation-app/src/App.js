import React from 'react';
import TranslateForm from './components/TranslateForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Language Translator</h1>
      </header>
      <TranslateForm />
      <Footer />
    </div>
  );
}

export default App;
