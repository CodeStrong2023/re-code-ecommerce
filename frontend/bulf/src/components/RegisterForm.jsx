import { useState } from 'react';
import './RegisterForm.css';
import { getApiUrl } from '../config'; // Asegúrate de que esta función esté bien configurada

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerUrl = getApiUrl('/auth/register'); // Asegúrate de que esta URL sea correcta

      const response = await fetch(registerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
        
      });
      console.log(JSON.stringify(formData))
      if (!response.ok) {
        const errorData = await response.json(); // Intentamos obtener detalles del error
        throw new Error(errorData.message || 'Error submitting form data');
      }

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      console.log('Form data submitted successfully:', data);
      // Aquí puedes agregar lógica para mostrar un mensaje de éxito o redirigir al usuario
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Maneja el error (por ejemplo, mostrar un mensaje de error)
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
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
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;