import { useContext } from "react";
import PropTypes from "prop-types";
import { ProductFilterContext } from "../product/ProductFilterContext";
import { useNavigate } from "react-router-dom";

const CategoryButton = ({ category }) => {
  const navigate = useNavigate();
  const { handleCategorySelect } = useContext(ProductFilterContext);
  const handleClick = () => {
    navigate("/home");
    handleCategorySelect(category.id);
  };
  return <button onClick={handleClick}>{category.name}</button>;
};

CategoryButton.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryButton;
