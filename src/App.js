import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/errorBoudaries/ErrorBoundary';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <ThemeProvider>
          <ErrorBoundary>
            <Header />
            <Switch>
              <Route exact path="/about">
                <AboutUs />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
            <Footer />
          </ErrorBoundary>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
