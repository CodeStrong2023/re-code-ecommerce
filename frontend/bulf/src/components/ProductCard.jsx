import 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Inicializa useNavigate

  if (!product) return null;

  const handleClick = async () => {
    try {
      navigate(`/item/${product.id}`);
    } catch (error) {
      console.error('Error en la redirección:', error);
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img src={product.mainImage} alt={product.name} className="product-image" />
      <div className="product-details">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <span className="product-price">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mainImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;