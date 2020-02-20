import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import NotFound from './pages/NotFound';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/errorBoudaries/ErrorBoundary';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider>
          <ErrorBoundary>
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
          </ErrorBoundary>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
