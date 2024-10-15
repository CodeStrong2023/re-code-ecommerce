import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import './ProductsList.css'; // Opcional: si tienes estilos globales o específicos para el listado
import { getApiUrl } from '../config';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const productsListUrl = getApiUrl(`/product/paged?page=${currentPage - 1}`);
    fetch(productsListUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.content);  // data.content contiene la lista de productos
        setTotalPages(data.totalPages);  // data.totalPages es el total de páginas
      });
  }, [currentPage]);

  return (
    <div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductsList;