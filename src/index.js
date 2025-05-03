import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App';
import Content from './pages/content';
import Settings from './pages/settings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/content" element={<Content />} />
      <Route path="/account/settings" element={<Settings />} />
    </Routes>
  </Router>
);
