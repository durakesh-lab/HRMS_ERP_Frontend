import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';

import Recruitment from './pages/Recruitment/Recruitment';
import Employees from './pages/Employees/Employees';
import CandidateEmployees from './pages/Employees/CandidateEmployees'; // Import Profile View
import Leave from './pages/Leave/Leave';
import Training from './pages/Training/Training';
import Payroll from './pages/Payroll/Payroll';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="recruitment" element={<Recruitment />} />
          <Route path="employees" element={<Employees />} />
          <Route path="leave" element={<Leave />} />
          <Route path="training" element={<Training />} />
          <Route path="payroll" element={<Payroll />} />
          {/* Candidate-specific routes mapping to same modules but potentially different paths if needed */}
          <Route path="applications" element={<div>My Applications (Coming Soon)</div>} />
          <Route path="profile" element={<CandidateEmployees />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
