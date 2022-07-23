import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import SingleMovie from './pages/SingleMovie';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies/:id" element={<SingleMovie />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
