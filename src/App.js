import React, { useState } from 'react';
import Home from './pages/Home';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </div>
  );
}

export default App;
