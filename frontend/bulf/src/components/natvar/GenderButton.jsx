import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './GenderButton.css';
import { ProductFilterContext } from '../product/ProductFilterContext';
import CategoryButton from './CategoryButton';

const GenderButton = ({ gender }) => {
  const { handleGenderSelect } = useContext(ProductFilterContext);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const handleClick = () => {
    handleGenderSelect(gender.id);
  };

  return (
    <div
      className={'gender-button'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={handleClick}>
        {gender.name}
      </div>
      {isDropdownVisible && (
        <div className="dropdown">
          {gender.categories && gender.categories.length > 0 ? (
            <ul>
              {gender.categories.map((category) => (
                <li key={category.id}>
                  <CategoryButton category={category} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay categorías disponibles</p>
          )}
        </div>
      )}
    </div>
  );
};

GenderButton.propTypes = {
  gender: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default GenderButton;
