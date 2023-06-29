import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function Header() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container">
          <Link className="navbar-brand text-white" to="/">SybrinWorks Management</Link>
        </div>
      </nav>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch('https://localhost:7140/api/DetailsEmployees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedRole(data.role);
        navigate(`/dashboard/${data.role}`);
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      setError('Failed to log in');
    }
  }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
      <div className='p-3 bg-white w-25'>
      <Header />
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='employeeId'>Employee ID</label>
            <input
              type='text'
              placeholder='Enter Employee ID'
              className='form-control'
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='Enter Password'
              className='form-control'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='role'>Role</label>
            <select
              className='form-control'
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value=''>Select Role</option>
              <option value='employee'>Employee</option>
              <option value='manager'>Manager</option>
            </select>
          </div>
          {error && <div className='alert alert-danger'>{error}</div>}
          <Link to={`/dashboard/${selectedRole}`} className='btn btn-primary d-block my-3'>
            Login
          </Link>
          <p>You agree to our terms and policies</p>
          <Link to='/signup' className='text-decoration-none'>
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;