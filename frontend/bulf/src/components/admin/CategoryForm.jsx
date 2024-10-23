import { useState, useEffect } from 'react';
import './FormStyles.css';

const CategoryForm = () => {
    const [name, setName] = useState('');
    const [genders, setGenders] = useState([]);
    const [selectedGenderId, setSelectedGenderId] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/auth/admin/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    gender: {
                        'id': selectedGenderId
                    }
                }),
            });
            if (response.ok) {
                alert('Categoría creada exitosamente');
                setName('');
                setSelectedGenderId('');
            } else {
                alert('Error al crear la categoría');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud');
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Nombre de la Categoría:</label>
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
                    onChange={(e) => setSelectedGenderId(e.target.value)}
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
            <button type="submit" className="submit-btn">Crear Categoría</button>
        </form>
    );
};

export default CategoryForm;