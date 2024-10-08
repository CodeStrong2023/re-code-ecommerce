import { useEffect, useState } from 'react';
import './NatVar.css'; // Asegúrate de tener la ruta correcta
import logo from '../images/logo-removebg-preview.png'; // Importa tu logo

function NatVar() {
  const [genders, setGenders] = useState([]);
  const [activeGender, setActiveGender] = useState(null); // Estado para el género activo

  useEffect(() => {
    // Realizar el fetch para obtener géneros
    const fetchGenders = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/genders'); // Cambia esto por la URL correcta de tu API
        if (!response.ok) {
          throw new Error('Error al cargar los géneros');
        }
        const data = await response.json();
        setGenders(data); // Suponiendo que el JSON tiene una estructura de [{name: "bebes"}, ...]
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenders();
  }, []);

  const handleMouseEnter = (gender) => {
    setActiveGender(gender); // Establece el género activo
  };

  const handleMouseLeave = () => {
    setActiveGender(null); // Limpia el género activo
  };

  return (
    <div className="natvar">
      <div className="natvar-header">
        <img src={logo} alt="Logo de la tienda" className="logo" />
        
        <div className="genders-container">
          {genders.map((gender) => (
            <div
              key={gender.id}
              className="gender-button"
              onMouseEnter={() => handleMouseEnter(gender)}
              onMouseLeave={handleMouseLeave}
            >
              {gender.name}
              {activeGender && activeGender.id === gender.id && (
                <div className="dropdown">
                  {/* Aquí asumiendo que cada género tiene categorías asociadas */}
                  {gender.categories && gender.categories.length > 0 ? (
                    <ul>
                      {gender.categories.map((category) => (
                        <li key={category.id}>{category.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No hay categorías disponibles</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <h1 className="store-name">Nombre de la Tienda</h1>
      </div>
    </div>
  );
}

export default NatVar;