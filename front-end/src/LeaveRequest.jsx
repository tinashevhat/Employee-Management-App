import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LeaveRequest({ role }) {
  const [formData, setFormData] = useState({
    leaveRequestId: '',
    employeeId: role === 'employee' ? '123' : '',
    leaveDate: '',
    leaveReason: '',
    dateRequestSubmission: '',
    status: 'pending'
  });
  const [requests, setRequests] = useState([]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Send the data to the server using an HTTP request
    axios.post('http://localhost:5000/leave-requests', formData)
      .then(response => {
        console.log(response.data);
        setRequests([...requests, response.data]);
        setFormData({
          leaveRequestId: '',
          employeeId: role === 'employee' ? '123' : '',
          leaveDate: '',
          leaveReason: '',
          dateRequestSubmission: '',
          status: 'pending'
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    
    axios.get('https://localhost:7140/api/LeaveRequestEmployees')
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-primary'>
      <div className='p-3 bg-white w-75'>
        <h1 className='text-center mb-4'>Leave Request Form</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="leaveDate" className='form-label'>Leave Date:</label>
            <input
              type="date"
              id="leaveDate"
              name="leaveDate"
              value={formData.leaveDate}
              onChange={handleChange}
              className='form-control'
              required
            />
          </div>

          <div className='mb-3'>
            <label htmlFor="leaveReason" className='form-label'>Leave Reason:</label>
            <textarea
              id="leaveReason"
              name="leaveReason"
              value={formData.leaveReason}
              onChange={handleChange}
              className='form-control'
              required
            />
          </div>

          <button type='submit' className='btn btn-success w-100'>Submit</button>
        </form>

        <h2 className='text-center mt-5 mb-4'>Leave Requests</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Request ID</th>
              {role === 'manager' ? <th>Employee ID</th> : null}
              <th>Date</th>
              {role === 'manager' ? <th>Leave Reason</th> : null}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request.leaveRequestId}>
                <td>{request.leaveRequestId}</td>
                {role === 'manager' ? <td>{request.employeeId}</td> : null}
                <td>{request.leaveDate}</td>
                {role === 'manager' ? <td>{request.leaveReason}</td> : null}
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveRequest;