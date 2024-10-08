
import { useState, useEffect } from 'react';
import './formproducto.css'; // Importa los estilos

const ProductForm = () => {
  const [genders, setGenders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [name, setName] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  // Fetch para obtener los géneros (y categorías asociadas)
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

  // Manejar cambio de género seleccionado
  const handleGenderChange = (e) => {
    const genderId = e.target.value;
    setSelectedGender(genderId);

    // Encuentra las categorías asociadas con el género seleccionado
    const selectedGenderObj = genders.find(gender => gender.id === parseInt(genderId));
    if (selectedGenderObj) {
      setCategories(selectedGenderObj.categories || []);
      setSubcategories([]); // Resetear subcategorías al cambiar de categoría
    }
  };

  // Manejar cambio de categoría seleccionada
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    // Encuentra las subcategorías asociadas con la categoría seleccionada
    const selectedCategoryObj = categories.find(category => category.id === parseInt(categoryId));
    if (selectedCategoryObj) {
      setSubcategories(selectedCategoryObj.subcategories || []);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      genderId: selectedGender,
      categoryId: selectedCategory,
      subCategoryId: subcategories.length ? subcategories[0].id : '',
      mainImage,
      images,
      description,
      price,
      stock,
    };

    try {
      const response = await fetch('http://localhost:8080/api/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert('Producto creado exitosamente');
        // Resetea el formulario si es necesario
      } else {
        alert('Error al crear el producto');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud');
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files].map(file => URL.createObjectURL(file)));
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
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
          disabled={!categories.length} // Desactivar si no hay categorías
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
          required
          disabled={!subcategories.length} // Desactivar si no hay subcategorías
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
        <label htmlFor="images">Imágenes adicionales:</label>
        <input
          type="file"
          id="images"
          multiple
          onChange={handleImageChange}
        />
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
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
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

      <button type="submit" className="submit-btn">Crear Producto</button>
    </form>
  );
};

export default ProductForm;