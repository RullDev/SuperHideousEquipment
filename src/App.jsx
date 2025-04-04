import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GhibliImageConverter from './components/GhibliImageConverter';
import './App.css';

function App() {
  const [stats, setStats] = useState({
    requests: Math.floor(Math.random() * 9000) + 1000,
    visitors: Math.floor(Math.random() * 1000) + 100
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '/');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="stats-card">
            <div className="stats-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </div>
            <div className="stats-info">
              <div className="stats-title">REQUEST</div>
              <div className="stats-number">{stats.requests.toLocaleString()}</div>
              <div className="stats-date">{formatDate(currentTime)} - {formatTime(currentTime)}</div>
            </div>
          </div>

          <div className="stats-card">
            <div className="stats-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="stats-info">
              <div className="stats-title">VISITOR</div>
              <div className="stats-number">{stats.visitors.toLocaleString()}</div>
              <div className="stats-date">{formatDate(currentTime)} - {formatTime(currentTime)}</div>
            </div>
          </div>
        </div>

        <GhibliImageConverter />
        <Footer />
      </div>
    </div>
  );
}

export default App;