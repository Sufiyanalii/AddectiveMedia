import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InputPage from './pages/InputPage';
import Layout from './pages/Layout';
import ListingPage from './pages/ListingPage';
import NoPage from './pages/NoPage';

function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<InputPage />} />
          <Route path="/list" element={<ListingPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
