import { useState } from 'react';
import './AdminPanel.css';
import Modal from 'react-modal';
import ProductForm from './ProductForm';
import GenderForm from './GenderForm';
import CategoryForm from './CategoryForm';
import SubcategoryForm from './SubcategoryForm';

const AdminPanel = () => {
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [isGenderFormOpen, setIsGenderFormOpen] = useState(false);
    const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
    const [isSubcategoryFormOpen, setIsSubcategoryFormOpen] = useState(false);

    const toggleProductFormModal = () => {
        setIsProductFormOpen(!isProductFormOpen);
    };

    const toggleGenderFormModal = () => {
        setIsGenderFormOpen(!isGenderFormOpen);
    };

    const toggleCategoryFormModal = () => {
        setIsCategoryFormOpen(!isCategoryFormOpen);
    };

    const toggleSubcategoryFormModal = () => {
        setIsSubcategoryFormOpen(!isSubcategoryFormOpen);
    };


    return (
        <div className="admin-panel">
            <h1 className="admin-title">Admin Panel</h1>
            <div className="admin-buttons">
                <button className="admin-button" onClick={toggleGenderFormModal}>Crear Género</button>
                <button className="admin-button" onClick={toggleCategoryFormModal}>Crear Categoría</button>
                <button className="admin-button" onClick={toggleSubcategoryFormModal}>Crear Subcategoría</button>
                <button className="admin-button" onClick={toggleProductFormModal}>Crear Producto</button>
            </div>

            <Modal
                isOpen={isGenderFormOpen}
                onRequestClose={toggleGenderFormModal}
                contentLabel="Gender Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <button onClick={toggleGenderFormModal} className="close-modal">X</button>
                <GenderForm />
            </Modal>

            <Modal
                isOpen={isCategoryFormOpen}
                onRequestClose={toggleCategoryFormModal}
                contentLabel="Category Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <button onClick={toggleCategoryFormModal} className="close-modal">X</button>
                <CategoryForm />
            </Modal>

            <Modal
                isOpen={isSubcategoryFormOpen}
                onRequestClose={toggleSubcategoryFormModal}
                contentLabel="Subcategory Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <button onClick={toggleSubcategoryFormModal} className="close-modal">X</button>
                <SubcategoryForm />
            </Modal>

            <Modal
                isOpen={isProductFormOpen}
                onRequestClose={toggleProductFormModal}
                contentLabel="Product Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <button onClick={toggleProductFormModal} className="close-modal">X</button>
                <ProductForm />
            </Modal>
        </div>
    );
};

export default AdminPanel;
