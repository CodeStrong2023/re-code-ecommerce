import { useContext } from 'react';
import PropTypes from 'prop-types';
import './CategoryButton.css';
import { ProductFilterContext } from './ProductFilterContext';

const CategoryButton = ({ category }) => {
  const { handleCategorySelect } = useContext(ProductFilterContext);

  return (
    <button
      className="category-button"
      onClick={() => handleCategorySelect(category.id)}
    >
      {category.name}
    </button>
  );
};

CategoryButton.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryButton;
