import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login'; 
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import LeaveRequest from './LeaveRequest';
import DailyReport from './DailyReport';
import ViewLeaveRequests from './ViewLeaveRequests';
import ViewReports from './ViewReports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard/:role' element={<Dashboard />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;