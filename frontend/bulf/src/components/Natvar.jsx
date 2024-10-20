import { useState, useEffect, useContext } from 'react';
import GenderButton from './GenderButton';
import './NatVar.css';
import logo from '../images/logo-removebg-preview.png';
import { ProductFilterContext } from './ProductFilterContext';

function NatVar() {
  const [genders, setGenders] = useState([]);
  const { handleGenderSelect, handleCategorySelect } = useContext(ProductFilterContext); // Importa el contexto

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/genders');
        if (!response.ok) {
          throw new Error('Error al cargar los géneros');
        }
        const data = await response.json();
        setGenders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenders();
  }, []);

  const handleHomeClick = () => {
    handleGenderSelect(null); // Restablece el género a null
    handleCategorySelect(null); // Restablece la categoría a null
  };

  return (
    <div className="natvar">
      <div className="natvar-header">
        <img src={logo} alt="Logo de la tienda" className="logo" />
        <button onClick={handleHomeClick} className="home-button">Home</button> {/* Botón Home */}
        <div className="genders-container">
          {genders.map((gender) => (
            <GenderButton
              key={gender.id}
              gender={gender}
            />
          ))}
        </div>
        <button  className="home-button">Feature</button> {/* Botón Home */}
        <button  className="home-button">Contact</button> {/* Botón Home */}
        <button  className="home-button">Admin</button> {/* Botón Home */}
        <button  className="home-button">LogIn</button> {/* Botón Home */}
      </div>
    </div>
  );
}

export default NatVar;
