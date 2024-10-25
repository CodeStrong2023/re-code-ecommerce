import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductView.css';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [genders, setGenders] = useState([]);
  const [activeImage, setActiveImage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    const calculateDeliveryDate = () => {
      const today = new Date();
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(today.getDate() + 7);
      const options = { day: 'numeric', month: 'short' };
      const formattedDate = oneWeekLater.toLocaleDateString('es-ES', options).toUpperCase();
      setDeliveryDate(formattedDate);
    };

    calculateDeliveryDate();
  }, []);
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

  // Fetch de géneros, categorías y subcategorías
  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/genders');
        const data = await response.json();
        setGenders(data);
      } catch (error) {
        console.error('Error al obtener los géneros:', error);
      }
    };

    fetchGenders();
  }, []);

  // Mapeo para obtener los nombres de género, categoría y subcategoría
  const getCategoryAndSubcategory = (genderId, categoryId, subcategoryId) => {
    const gender = genders.find((g) => g.id === genderId);
    if (!gender) return { genderName: 'N/A', categoryName: 'N/A', subcategoryName: 'N/A' };

    const category = gender.categories.find((c) => c.id === categoryId);
    if (!category) return { genderName: gender.name, categoryName: 'N/A', subcategoryName: 'N/A' };

    const subcategory = category.subcategories.find((s) => s.id === subcategoryId);
    return {
      genderName: gender.name,
      categoryName: category.name,
      subcategoryName: subcategory ? subcategory.name : 'N/A'
    };
  };

  if (!product || genders.length === 0) return <div>Cargando...</div>;

  // Obtener los nombres de género, categoría y subcategoría
  const { genderName, categoryName, subcategoryName } = getCategoryAndSubcategory(
    product.genderId,
    product.categoryId,
    product.subcategoryId
  );

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
              onClick={() => setActiveImage(product.mainImage)}
            />
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Imagen ${index + 1}`}
                className={`thumbnail ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>
        <div className="details-section">
          <h2 className="product-name">{product.name}</h2>
          <div className="description-section">
            <p><b>Details:</b></p>
            <br />
            <p>{product.description}</p>
          </div>
          <div className="price-section">
            <span className="current-price">Price: {product.price.toFixed(2)} $</span>

          </div>

          <div className="publish-date-section">
            <p><strong>Fecha de publicación:</strong> {new Date(product.date).toLocaleDateString()}</p>
          </div>
          <div className="category-section">
            <br />
            <p><strong>Gender:</strong> {genderName}</p>
            <p><strong>Category:</strong> {categoryName}</p>
            <p><strong>Sub-category:</strong> {subcategoryName}</p>
            <br />
          </div>

          <div className="additional-details">
            <p className="shipping-info">Envío: ARS 9,938.09</p>
            <p className="delivery-info">Entrega estimada: {deliveryDate}</p>
            <p className="security-info">Seguridad y Privacidad: Pagos seguros, sin compartir datos con terceros.</p>
          </div>
          <p><strong>Stock:</strong> {product.stock}</p>

          <div className="buttons-section">
            <button className="buy-button">Comprar Ahora</button>
            <button className="add-to-cart-button">Agregar al Carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
