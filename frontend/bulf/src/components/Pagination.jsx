import 'react';
import PropTypes from 'prop-types';
import './Pagination.css'; // Importa el archivo CSS

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={currentPage === 1 ? 'pagination-button disabled' : 'pagination-button'}
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? 'pagination-button active' : 'pagination-button'}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? 'pagination-button disabled' : 'pagination-button'}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
  };
export default Pagination;