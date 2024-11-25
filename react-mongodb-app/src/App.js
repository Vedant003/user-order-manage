import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import PublicClientPage from './components/PublicClientPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicClientPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;