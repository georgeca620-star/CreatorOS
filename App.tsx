
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import BrandDeals from './pages/BrandDeals';
import Invoices from './pages/Invoices';
import Scheduler from './pages/Scheduler';
import AITools from './pages/AITools';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/brand-deals" element={<BrandDeals />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
