import { useState } from 'react';
import './AdminPanel.css';
import Modal from 'react-modal';
import ProductForm from './ProductForm';
import GenderForm from './GenderForm';
import CategoryForm from './CategoryForm';
import SubcategoryForm from './SubcategoryForm';
import GenderDeleteForm from './GenderDeleteForm.jsx'
import CategoryDeleteForm from './CategoryDeleteForm.jsx'
import SubcategoryDeleteForm from './SubcategoryDeleteForm.jsx'
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [isGenderFormOpen, setIsGenderFormOpen] = useState(false);
    const [isGenderDeleteFormOpen, setIsGenderDeleteFormOpen] = useState(false);
    const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
    const [isCategoryDeleteFormOpen, SetIsCategoryDeleteFormOpen] = useState(false);
    const [isSubcategoryFormOpen, setIsSubcategoryFormOpen] = useState(false);
    const [isSubcategoryDeleteFormOpen, setIsSubcategoryDeleteFormOpen] = useState(false);

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

    const handleDeleteGender = () => {
        setIsGenderDeleteFormOpen(!isGenderDeleteFormOpen)
        console.log('Borrar Género');
    };

    const handleDeleteCategory = () => {
        SetIsCategoryDeleteFormOpen(!isCategoryDeleteFormOpen)
        console.log('Borrar Categoría');
    };

    const handleDeleteSubcategory = () => {
        setIsSubcategoryDeleteFormOpen(!isSubcategoryDeleteFormOpen)
        console.log('Borrar Subcategoría');
    };
    const handlePurchaseOrders = () => {
        navigate('/admin/purchase-orders')
    };


    return (
        <div >
            <h1 className="admin-title">Admin Panel</h1>
            <div className="admin-buttons">
                <button className="admin-button" onClick={toggleGenderFormModal}>Crear Género</button>
                <button className="admin-button" onClick={toggleCategoryFormModal}>Crear Categoría</button>
                <button className="admin-button" onClick={toggleSubcategoryFormModal}>Crear Subcategoría</button>
                <button className="admin-button" onClick={toggleProductFormModal}>Crear Producto</button>
            </div>

            <div className="admin-delete-buttons">
                <button className="delete-button" onClick={handleDeleteGender}>Borrar Género</button>
                <button className="delete-button" onClick={handleDeleteCategory}>Borrar Categoría</button>
                <button className="delete-button" onClick={handleDeleteSubcategory}>Borrar Subcategoría</button>
                <button className="admin-button" onClick={handlePurchaseOrders}>Purchases Orders</button>
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
                isOpen={isGenderDeleteFormOpen}
                onRequestClose={handleDeleteGender}
                contentLabel="GenderDelete Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <button onClick={handleDeleteGender} className="close-modal">X</button>
                <GenderDeleteForm />
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
                isOpen={isCategoryDeleteFormOpen}
                onRequestClose={handleDeleteCategory}
                contentLabel="CategoryDelete Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <button onClick={handleDeleteCategory} className="close-modal">X</button>
                <CategoryDeleteForm />
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
                isOpen={isSubcategoryDeleteFormOpen}
                onRequestClose={handleDeleteSubcategory}
                contentLabel="SubcategoryDelete Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <button onClick={handleDeleteSubcategory} className="close-modal">X</button>
                <SubcategoryDeleteForm />
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
