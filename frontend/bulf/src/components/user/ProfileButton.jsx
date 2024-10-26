import { useState } from 'react';
import { useUser } from './UserContext';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './ProfileButton.css';
import CartView from './CartView';
import Modal from 'react-modal';

const ProfileButton = () => {
  const { user, logout } = useUser();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const closeModal = () => {
    setIsCartModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className="profile-button">
      {user ? (
        <div className="user-menu">
          <button className="dropdown-button" onClick={toggleMenu}>
            {user.username} ▼
            {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
          </button>
          {isMenuOpen && (
            <div className="dropdown-content">
              <button onClick={() => { setIsCartModalOpen(true); setIsMenuOpen(false); }} className="logout-button">Cart</button>
              <button onClick={() => { setIsLogoutModalOpen(true); setIsMenuOpen(false); }} className="logout-button">Logout</button>
            </div>
          )}
          <Modal
            isOpen={isLogoutModalOpen}
            onRequestClose={() => setIsLogoutModalOpen(false)}
            contentLabel="Confirm Logout"
            className="modal"
            overlayClassName="modal-overlay"
          >
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout} className="confirm-button">Yes</button>
            <button onClick={() => setIsLogoutModalOpen(false)} className="cancel-button">No</button>
          </Modal>
          <Modal
            isOpen={isCartModalOpen}
            onRequestClose={closeModal}
            contentLabel="Cart"
            className="modal"
            overlayClassName="modal-overlay"
          >
            <button onClick={closeModal} className="close-modal">X</button>
            <CartView />
          </Modal>
        </div>
      ) : (
        <button className="login-button" onClick={() => navigate('/signin')}>Sign In</button>
      )}
    </div>
  );
};

export default ProfileButton;
