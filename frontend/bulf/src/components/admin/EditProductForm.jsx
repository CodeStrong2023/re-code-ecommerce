import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ProductForm.css';

const EditProductForm = ({ product, onClose }) => {
  const [genders, setGenders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedGender, setSelectedGender] = useState(product.genderId || '');
  const [selectedCategory, setSelectedCategory] = useState(product.categoryId || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState(product.subcategoryId || '');

  const [name, setName] = useState(product.name || '');
  const [mainImage, setMainImage] = useState(product.mainImage || '');
  const [images, setImages] = useState(product.images || ['']);
  const [description, setDescription] = useState(product.description || '');
  const [price, setPrice] = useState(product.price || 0);
  const [stock, setStock] = useState(product.stock || 0);

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

  useEffect(() => {
    if (selectedGender) {
      const selectedGenderObj = genders.find(gender => gender.id === parseInt(selectedGender));
      if (selectedGenderObj) {
        setCategories(selectedGenderObj.categories || []);
      }
    }
  }, [selectedGender, genders]);

  useEffect(() => {
    if (selectedCategory) {
      const selectedCategoryObj = categories.find(category => category.id === parseInt(selectedCategory));
      if (selectedCategoryObj) {
        setSubcategories(selectedCategoryObj.subcategories || []);
      }
    }
  }, [selectedCategory, categories]);

  const handleGenderChange = (e) => {
    const genderId = e.target.value;
    setSelectedGender(genderId);
    setCategories([]);
    setSubcategories([]);
    setSelectedCategory('');
    setSelectedSubcategory('');
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleAddImage = () => {
    setImages([...images, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      genderId: selectedGender,
      categoryId: selectedCategory,
      subcategoryId: selectedSubcategory,
      mainImage,
      images: images.filter(url => url),
      description,
      price,
      stock,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/auth/admin/product/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        alert('Producto actualizado exitosamente');
        onClose(); 
      } else {
        alert('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud');
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="column">
        <div className="form-group">
          <label htmlFor="name">Nombre del Producto:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Género:</label>
          <select
            id="gender"
            value={selectedGender}
            onChange={handleGenderChange}
            required
          >
            <option value="">Selecciona un género</option>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
            disabled={!categories.length}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subcategory">Subcategoría:</label>
          <select
            id="subcategory"
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            required
            disabled={!subcategories.length}
          >
            <option value="">Selecciona una subcategoría</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mainImage">Imagen principal:</label>
          <input
            type="text"
            id="mainImage"
            value={mainImage}
            onChange={(e) => setMainImage(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="column">
        <div className="form-group">
          <label>Imágenes adicionales:</label>
          {images.map((image, index) => (
            <div key={index} className="image-input-group">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="URL de la imagen"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddImage} className="add-image-btn">
            Agregar otra imagen
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(parseFloat(e.target.value))}
            required
          />
        </div>
      </div>
      <button type="submit" className="submit-btn">Guardar Cambios</button>
    </form>
  );
};

EditProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditProductForm;
