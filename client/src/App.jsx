import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Reports from './pages/Reports';
import InspectionForm from './components/InspectionForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/report" element={<Reports />} />
      <Route path="/inspection/:reportId" element={<InspectionForm />} />
    </Routes>
  );
}

export default App;
