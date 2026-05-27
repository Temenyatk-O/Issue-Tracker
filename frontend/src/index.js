// src/index.js — React entry point. Do not modify unless changing
// the root render strategy (e.g. switching to hydrateRoot for SSR).
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
