import { useState, useEffect, useContext } from 'react';
import GenderButton from './GenderButton';
import './NatVar.css';
import logo from '../../images/logo-removebg-preview.png';
import { ProductFilterContext } from '../product/ProductFilterContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../auth/SingIn';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function NatVar() {
  const navigate = useNavigate();
  const [genders, setGenders] = useState([]);
  const { handleGenderSelect, handleCategorySelect } = useContext(ProductFilterContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
    handleGenderSelect(null);
    handleCategorySelect(null);
    try {
      navigate('/home');
    } catch (error) {
      console.error('Error en la redirección:', error);
    }
  };

  const handleAdminClick = () => {
    try {
      navigate('/admin');
    } catch (error) {
      console.error('Error en la redirección:', error);
    }
  };

  const toggleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const closeModal = () => {
    setIsLoginOpen(false);
  };

  return (
    <div className="natvar">
      <div className="natvar-header">
        <img src={logo} alt="Logo de la tienda" className="logo" />
        <button className="home-button" onClick={handleHomeClick}>Home</button>
        <div className="genders-container">
          {genders.map((gender) => (
            <GenderButton key={gender.id} gender={gender} />
          ))}
        </div>
        <button className="home-button">Feature</button>
        <button className="home-button">Contact</button>
        <button className="home-button" onClick={handleAdminClick}>Admin</button>
        <button className="home-button" onClick={toggleLoginModal}>Sing In</button>
      </div>

      <Modal
        isOpen={isLoginOpen}
        onRequestClose={toggleLoginModal}
        contentLabel="Login Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <button onClick={toggleLoginModal} className="close-modal">X</button>
        <LoginForm closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default NatVar;
