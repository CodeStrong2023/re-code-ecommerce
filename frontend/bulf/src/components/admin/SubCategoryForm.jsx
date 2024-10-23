import { useState, useEffect } from 'react';
import './FormStyles.css';

const SubcategoryForm = () => {
    const [name, setName] = useState('');
    const [genders, setGenders] = useState([]);
    const [selectedGenderId, setSelectedGenderId] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

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

    const handleGenderChange = (e) => {
        const genderId = e.target.value;
        setSelectedGenderId(genderId);
        
        const selectedGender = genders.find(gender => gender.id === parseInt(genderId));
        setCategories(selectedGender ? selectedGender.categories : []);
        setSelectedCategoryId('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/admin/subcategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    
                    category: {
                        'id':selectedCategoryId
                    } 
                }),
            });
            if (response.ok) {
                alert('Subcategoría creada exitosamente');
                setName('');
                setSelectedGenderId('');
                setSelectedCategoryId('');
            } else {
                alert('Error al crear la subcategoría');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud');
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nombre de la Subcategoría:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="gender">Seleccionar Género:</label>
                <select
                    id="gender"
                    value={selectedGenderId}
                    onChange={handleGenderChange}
                    required
                >
                    <option value="">Seleccionar Género</option>
                    {genders.map((gender) => (
                        <option key={gender.id} value={gender.id}>
                            {gender.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="category">Seleccionar Categoría:</label>
                <select
                    id="category"
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    required
                    disabled={!selectedGenderId}
                >
                    <option value="">Seleccionar Categoría</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="submit-btn">Crear Subcategoría</button>
        </form>
    );
};

export default SubcategoryForm;
