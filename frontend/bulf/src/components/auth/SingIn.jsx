import { useState } from 'react';
import './Sing.css';
import { getApiUrl } from '../../config';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoginForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginUrl = getApiUrl('/auth/login');
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        alert(errorMessage);
        throw new Error('Login failed');
      }
      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      console.log('Login successful:', data);
      closeModal();
      navigate('/home');

    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
    closeModal();
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email-loguin"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password-loguin"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Sing In</button>
      <br />
      <p>do not have an account?</p>
      <button type="button" onClick={handleSignUpClick} className="signup-button">
        Signup
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default LoginForm;
