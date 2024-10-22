import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductView.css';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/product/item/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener el producto');
        }
        const productData = await response.json();
        setProduct(productData);
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

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="product-view">
      <h2>{product.name}</h2>
      <div className="carousel">
        {product.images.map((img, index) => (
          <img key={index} src={img} alt={`Imagen ${index + 1}`} className="carousel-image" />
        ))}
      </div>
      <img src={product.mainImage} alt={product.name} className="main-image" />
      <p>{product.description}</p>
      <span className="product-price">${product.price.toFixed(2)}</span>
      <div className="buttons">
        <button onClick={handleBuyNow} className="buy-button">Comprar Ahora</button>
        <button onClick={handleAddToCart} className="add-to-cart-button">Agregar al Carrito</button>
      </div>
    </div>
  );
};

export default ProductView;