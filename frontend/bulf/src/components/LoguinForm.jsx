import { useState } from 'react';
import './RegisterForm.css'; // Import the same CSS file
import { getApiUrl } from '../config';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

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
        const loguinUrl = getApiUrl('/login')
        const response = await fetch(loguinUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            // Leer el mensaje de error del servidor
            const errorMessage = await response.text();
            alert(errorMessage); // Mostrar el mensaje de error en un alert
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
          // Aquí puedes almacenar el token o los detalles del usuario según sea necesario
        } catch (error) {
          console.error('Login failed:', error.message);
          // Manejar el error (por ejemplo, mostrar un mensaje de error)
        }
      };
    
      return (
        <form className="register-form" onSubmit={handleSubmit}> {/* Use the same class here */}
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username-loguin"
              name="username"
              value={formData.username}
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
          <button type="submit">Login</button>
        </form>
      );
    };
    
    export default LoginForm;