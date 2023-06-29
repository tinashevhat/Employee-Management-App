import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DailyReport from './DailyReport';
import LeaveRequest from './LeaveRequest';
import ViewLeaveRequests from './ViewLeaveRequests';
import ViewReports from './ViewReports';

function Dashboard() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [showDailyReport, setShowDailyReport] = useState(false);
  const [showLeaveRequest, setShowLeaveRequest] = useState(false);
  const [showViewLeaveRequests, setShowViewLeaveRequests] = useState(false);
  const [showViewReports, setShowViewReports] = useState(false);


  const handleLogout = () => {
    navigate('/login');
  };

  const handleViewReports = () => {
    setShowViewReports(true);
  };

  const handleViewLeaveRequests = () => {
    setShowViewLeaveRequests(true);
  };

  const handleDailyReport = () => {
    setShowDailyReport(true);
  };
  
  const handleLeaveRequest = () => {
    setShowLeaveRequest(true);
  };


  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
      <div className='p-3 bg-white w-25'>
        <h1 className='text-center'>Welcome!</h1>
        {role === 'employee' && (
          <div className='mb-3'>
            <div className='d-flex flex-column'>
              <button className='btn btn-primary btn-block my-3' onClick={handleDailyReport}>Daily Report</button>
              <button className='btn btn-primary btn-block my-3' onClick={handleLeaveRequest}>Leave Request</button>
            </div>
          </div>
        )}
        {role === 'manager' && (
          <div className='mb-3'>
            <div className='d-flex flex-column'>
              <button className='btn btn-primary btn-block my-3' onClick={handleViewReports}>View Reports</button>
              <button className='btn btn-primary btn-block my-3' onClick={handleViewLeaveRequests}>View Leave Requests</button>
            </div>
          </div>
        )}
        <button className='btn btn-danger btn-block my-3' onClick={handleLogout}>Logout</button>
      </div>
      {showDailyReport && <DailyReport userId={1} />}
      {showLeaveRequest && <LeaveRequest userId={1} />}
      {showViewReports && <ViewReports userId={2} />}
      {showViewLeaveRequests && <ViewLeaveRequests userId={2} />}
    </div>
  );
}

export default Dashboard;