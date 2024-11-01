import { useState, useEffect } from "react";
import "./FormStyles.css";

const DeleteGenderForm = () => {
  const [genders, setGenders] = useState([]);
  const [selectedGenderId, setSelectedGenderId] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/admin/gender/${selectedGenderId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Género eliminado exitosamente");
        setSelectedGenderId("");
      } else {
        const errorMessage = await response.text();
        setError(`Error al eliminar el género: ${errorMessage}`);
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
          onChange={(e) => setSelectedGenderId(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          {genders.map((gender) => (
            <option key={gender.id} value={gender.id}>
              {gender.name}
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

export default DeleteGenderForm;
