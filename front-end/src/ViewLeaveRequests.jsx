import React, { useState, useEffect } from 'react';

function ViewLeaveRequests() {
  const [requests, setRequests] = useState([]);

  const handleStatusChange = (requestId, e) => {
    const updatedRequests = requests.map(request =>
      request.leaveRequestId === requestId ? { ...request, status: e.target.value } : request
    );
    setRequests(updatedRequests);
  };

  const handleSaveStatus = requestId => {
    const request = requests.find(request => request.leaveRequestId === requestId);
    
    fetch(`http://localhost:5000/leave-requests/${requestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save status for request');
        }
        console.log(`Saved status for request ${requestId}: ${request.status}`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    
    fetch('https://localhost:7140/api/LeaveRequestEmployees')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch leave requests from server');
        }
        return response.json();
      })
      .then(data => {
        setRequests(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Leave Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={request.leaveRequestId}>
              <td>{request.leaveRequestId}</td>
              <td>{request.employeeId}</td>
              <td>{request.leaveDate}</td>
              <td>{request.leaveReason}</td>
              <td>
                <select value={request.status} onChange={e => handleStatusChange(request.leaveRequestId, e)}>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleSaveStatus(request.leaveRequestId)}>Save Status</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewLeaveRequests;