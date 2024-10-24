import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductView.css';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/product/item/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener el producto');
        }
        const productData = await response.json();
        setProduct(productData);
        setActiveImage(productData.mainImage);
      } catch (error) {
        console.error('Error en la petición:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    console.log('Comprar ahora', product);
  };

  const handleAddToCart = () => {
    console.log('Agregar al carrito', product);
  };

  const handleImageClick = (img) => {
    setActiveImage(img);
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="product-view">
      <div className="product-container">
        <div className="image-section">
          <img src={activeImage} alt={product.name} className="main-image" />

          <div className="thumbnail-carousel">
            <img
              src={product.mainImage}
              alt={product.name}
              className={`thumbnail ${activeImage === product.mainImage ? 'active' : ''}`}
              onClick={() => handleImageClick(product.mainImage)}
            />
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Imagen ${index + 1}`}
                className={`thumbnail ${activeImage === img ? 'active' : ''}`}
                onClick={() => handleImageClick(img)}
              />
            ))}
          </div>
        </div>
        <div className="details-section">
          <h2 className="product-name">{product.name}</h2>
          <div className="description-section">
            <h3>Details</h3>
            <p>{product.description}</p>
          </div>
          <div className="price-section">
            <span className="current-price">ARS{product.price.toFixed(2)}</span>
            <span className="old-price">ARS22,170.83</span>
            <span className="discount">-39% dto.</span>
          </div>
          <div className="additional-details">
            <p className="shipping-info">Envío: ARS9,938.09</p>
            <p className="delivery-info">Entrega: 22 de DIC.</p>
            <p className="security-info">Seguridad y Privacidad: Pagos seguros, sin compartir datos con terceros.</p>
          </div>
          <div className="buttons-section">
            <button onClick={handleBuyNow} className="buy-button">Comprar Ahora</button>
            <button onClick={handleAddToCart} className="add-to-cart-button">Agregar al Carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
