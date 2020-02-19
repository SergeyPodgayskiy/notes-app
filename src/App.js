import React, { useState } from 'react';
import Home from './pages/Home';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/errorBoudaries/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </ThemeProvider>
    </div>
  );
}

export default App;
