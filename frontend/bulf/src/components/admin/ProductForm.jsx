import { useState, useEffect } from "react";
import "./ProductForm.css";

const ProductForm = () => {
  const [genders, setGenders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [name, setName] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [images, setImages] = useState([""]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/genders");
        const data = await response.json();
        setGenders(data);
      } catch (error) {
        console.error("Error al obtener los géneros:", error);
      }
    };
    fetchGenders();
  }, []);

  const handleGenderChange = (e) => {
    const genderId = e.target.value;
    setSelectedGender(genderId);

    const selectedGenderObj = genders.find(
      (gender) => gender.id === parseInt(genderId)
    );
    if (selectedGenderObj) {
      setCategories(selectedGenderObj.categories || []);
      setSubcategories([]);
      setSelectedCategory("");
      setSelectedSubcategory("");
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    const selectedCategoryObj = categories.find(
      (category) => category.id === parseInt(categoryId)
    );
    if (selectedCategoryObj) {
      setSubcategories(selectedCategoryObj.subcategories || []);
      setSelectedSubcategory("");
    }
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
    setImages([...images, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      genderId: selectedGender,
      categoryId: selectedCategory,
      subcategoryId: selectedSubcategory,
      mainImage,
      images: images.filter((url) => url),
      description,
      price,
      stock,
    };
    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/admin/product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      if (response.ok) {
        alert("Producto creado exitosamente");
        setName("");
        setMainImage("");
        setImages([""]);
        setDescription("");
        setPrice(0);
        setStock(0);
        setSelectedGender("");
        setSelectedCategory("");
        setSelectedSubcategory("");
      } else {
        alert("Error al crear el producto");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error en la solicitud");
    }
  };
  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="column">
        <div className="form-group">
          <label htmlFor="name">Product name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={selectedGender}
            onChange={handleGenderChange}
            required
          >
            <option value="">Select Gender:</option>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
            disabled={!categories.length}
          >
            <option value="">Select Category:</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="subcategory">Subcategory:</label>
          <select
            id="subcategory"
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            required
            disabled={!subcategories.length}
          >
            <option value="">Select Subcategory:</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="mainImage">Main Image:</label>
          <input
            type="text"
            id="mainImage"
            value={mainImage}
            onChange={(e) => setMainImage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
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
          <label>Images:</label>
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
          <button
            type="button"
            onClick={handleAddImage}
            className="add-image-btn"
          >
            Add Image
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
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
      <button type="submit" className="submit-btn">
        Create Product
      </button>
    </form>
  );
};

export default ProductForm;
