import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ProductFilterContext = createContext();

export const ProductFilterProvider = ({ children }) => {
  const [selectedGenderId, setSelectedGenderId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleGenderSelect = (genderId) => {
    setSelectedGenderId(genderId);
    setSelectedCategoryId(null);
    console.log(`Género seleccionado: ${genderId}`);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setSelectedGenderId(null);
    console.log(`Categoría seleccionada: ${categoryId}`);
  };

  return (
    <ProductFilterContext.Provider
      value={{
        selectedGenderId,
        selectedCategoryId,
        handleGenderSelect,
        handleCategorySelect,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
};

ProductFilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
