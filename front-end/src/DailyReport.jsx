import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DailyReport({ userId }) {
  const [formData, setFormData] = useState({
    date: '',
    hoursWorked: '',
    taskExecuted: '',
  });
  const [reports, setReports] = useState([]);
  const [daysSinceJoining, setDaysSinceJoining] = useState(0);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const reportData = {
      employeeId: userId,
      reportId: reports.length + 1,
      date: formData.date,
      hoursWorked: formData.hoursWorked,
      taskExecuted: formData.taskExecuted,
    };
   
    axios.post('https://localhost:7140/api/Employeereport', reportData)
      .then(response => {
        console.log(response.data);
        setReports([...reports, response.data]);
        setFormData({
          date: '',
          hoursWorked: '',
          taskExecuted: '',
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Fetch the previously entered reports from the server using an HTTP request
    axios.get('https://localhost:7140/api/Employeereport')
      .then(response => {
        setReports(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Fetch the user's join date from the server using an HTTP request
    axios.get(`https://localhost:7140/api/Employeereport/${userId}`)
      .then(response => {
        const joinDate = new Date(response.data.joinDate);
        const today = new Date();
        const diffTime = Math.abs(today - joinDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysSinceJoining(diffDays);
      })
      .catch(error => {
        console.error(error);
      });
  }, [userId]);

  const handleAddDay = () => {
    setDaysSinceJoining(daysSinceJoining + 1);
  };

  return (
    <div className='d-flex flex-column align-items-center bg-primary'>
      <h1>Daily Report</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='date'>Date:</label>
          <input
            type='date'
            id='date'
            name='date'
            value={formData.date}
            onChange={handleChange}
            className='form-control'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='hoursWorked'>Number of Hours Worked:</label>
          <input
            type='number'
            id='hoursWorked'
            name='hoursWorked'
            value={formData.hoursWorked}
            onChange={handleChange}
            className='form-control'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='taskExecuted'>Task Executed:</label>
          <textarea
            id='taskExecuted'
            name='taskExecuted'
            value={formData.taskExecuted}
            onChange={handleChange}
            className='form-control'
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>

      <button className='btn btn-primary mt-3' onClick={handleAddDay}>
        Add Day
      </button>

      <p className='mt-3'>
        You have been working here for {daysSinceJoining} days.
      </p>

      <h2 className='mt-3'>Reports</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Date</th>
            <th>Hours Worked</th>
            <th>Task Executed</th>
            <th>Manager Report</th>
          </tr>
        </thead>
        <tbody>
          {reports
            .filter(report => report.employeeId === userId)
            .map(report => (
              <tr key={report.reportId}>
                <td>{report.reportId}</td>
                <td>{report.date}</td>
                <td>{report.hoursWorked}</td>
                <td>{report.taskExecuted}</td>
                <td>{report.managerReport || '-'}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default DailyReport;