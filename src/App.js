import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './pages/NotFound';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/errorBoudaries/ErrorBoundary';
import Footer from './components/Footer';
import Header from './components/Header';

const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));

function App() {
  return (
    <Router>
      <div className="container">
        <ThemeProvider>
          <ErrorBoundary>
            <Header />
            <main className="content">
              <Suspense fallback={<div>Loading. . .</div>}>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/about">
                    <AboutUs />
                  </Route>
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </Suspense>
            </main>
            <Footer />
          </ErrorBoundary>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
