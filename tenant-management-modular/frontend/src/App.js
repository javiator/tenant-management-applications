import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard';
import Tenants from './components/Tenants';
import Properties from './components/Properties';
import Transactions from './components/Transactions';
import Navigation from './components/Navigation';


function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
