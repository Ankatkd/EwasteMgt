import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    role: 'individual'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    const { fullname, phone, email, password, confirmPassword, location } = formData;

    if (fullname.length < 4) {
      setError('Full name must be at least 4 characters long');
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError('Phone number must be exactly 10 digits');
      return false;
    }

    if (!email.includes('@')) {
      setError('Email must contain "@" symbol');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (location.trim() === '') {
      setError('Location is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:8082/api/register', {
        fullname: formData.fullname,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        location: formData.location,
        role: formData.role
      });

      const { userId } = response.data;

      setSuccess('Registration successful!');
      localStorage.setItem('userId', userId);

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Register</h2>

      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Input Fields */}
        {[
          { label: 'Full Name', name: 'fullname', type: 'text' },
          { label: 'Phone Number', name: 'phone', type: 'tel' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Location', name: 'location', type: 'text' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'Confirm Password', name: 'confirmPassword', type: 'password' }
        ].map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <label className="block text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={`Enter your ${label.toLowerCase()}`}
              required
            />
          </div>
        ))}

        {/* Role Selector */}
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="individual">Individual</option>
            <option value="commercial">Commercial</option>
            <option value="charity">Charity</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white p-2 rounded hover:bg-green-800"
        >
          Register
        </button>
      </form>

      {/* Login Redirect */}
      <p className="mt-4 text-sm text-gray-600 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-green-700 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default Register;
