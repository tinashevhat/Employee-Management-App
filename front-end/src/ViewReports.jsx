import React, { useState, useEffect } from 'react';

function ViewReports() {
  const [reports, setReports] = useState([]);
  const [daysWorked, setDaysWorked] = useState(0);

  const handleCommentChange = (reportId, e) => {
    const updatedReports = reports.map(report =>
      report.reportId === reportId ? { ...report, managerReport: e.target.value } : report
    );
    setReports(updatedReports);
  };

  const handleSaveComment = reportId => {
    const report = reports.find(report => report.reportId === reportId);
    
    fetch(`https://localhost:7140/api/Employeereport/${reportId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(report)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save comment for report');
        }
        console.log(`Saved comment for report ${reportId}: ${report.managerReport}`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
   
    fetch('https://localhost:7140/api/Employeereport')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch reports from server');
        }
        return response.json();
      })
      .then(data => {
        setReports(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const joinDate = new Date('2023-06-01'); // Replace with the actual join date of the user fetched from the server
    const today = new Date();
    const diffTime = Math.abs(today - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysWorked(diffDays);
  }, []);

  return (
    <div>
      <h2>Employee Reports</h2>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Hours Worked</th>
            <th>Task Executed</th>
            <th>Manager Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={report.reportId}>
              <td>{report.reportId}</td>
              <td>{report.employeeId}</td>
              <td>{report.date}</td>
              <td>{report.hoursWorked}</td>
              <td>{report.taskExecuted}</td>
              <td>
                <textarea
                  value={report.managerReport}
                  onChange={e => handleCommentChange(report.reportId, e)}
                />
              </td>
              <td>
                <button onClick={() => handleSaveComment(report.reportId)}>Save Comment</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewReports;