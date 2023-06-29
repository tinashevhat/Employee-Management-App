import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';


function Signup() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    employeeId: yup.string().required('Employee ID is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    department: yup.string().required('Department is required'),
    startDate: yup.string().required('Start Date is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
    role: yup.string().required('Role is required'),
  });
    
  

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      await schema.validate(data, { abortEarly: false });

      const response = await fetch('https://localhost:7140/api/DetailsEmployees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="d-flex vh-350 justify-content-center align-items-center bg-primary">
      <div className="p-3 bg-white rounded w-25">
        <h2>Sign Up</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">You have successfully signed up!</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="EmployeeId">Employee ID</label>
            <input type="text" name="EmployeeId" placeholder="Employee ID" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" placeholder="First Name" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" placeholder="Last Name" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="department">Department</label>
            <input type="text" name="department" placeholder="Department" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="startDate">Start Date</label>
            <input type="date" name="startDate" placeholder="Start Date" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="role">Role</label>
            <select name="role" className="form-control">
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
          <p className="mt-3">
            Already have an account? <Link to="/login" onClick={() => navigate('/login')}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;