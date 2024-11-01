import { useState, useEffect } from "react";
import "./FormStyles.css";

const DeleteCategoryForm = () => {
  const [genders, setGenders] = useState([]);
  const [selectedGenderId, setSelectedGenderId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/genders");
        const data = await response.json();
        setGenders(data);
      } catch (error) {
        setError("Error al obtener los géneros");
        console.error("Error al obtener los géneros:", error);
      }
    };
    fetchGenders();
  }, []);

  const handleGenderChange = (e) => {
    const genderId = e.target.value;
    setSelectedGenderId(genderId);

    const selectedGender = genders.find(
      (gender) => gender.id === parseInt(genderId)
    );
    setCategories(selectedGender ? selectedGender.categories : []);
    setSelectedCategoryId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/admin/category/${selectedCategoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Categoría eliminada exitosamente");
        setSelectedGenderId("");
        setSelectedCategoryId("");
        setCategories([]);
      } else {
        const errorMessage = await response.text();
        setError(`Error al eliminar la categoría: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Error en la solicitud");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={selectedGenderId}
          onChange={handleGenderChange}
          required
        >
          <option value="">Select gender</option>
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
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          required
          disabled={!selectedGenderId}
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
};

export default DeleteCategoryForm;
