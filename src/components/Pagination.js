import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='pagination_but'
      >
        Предыдущая
      </button>
      
      {/* {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
        <button 
          key={number}
          onClick={() => onPageChange(number)}
          disabled={number === currentPage}
        >
          {number}
        </button>
      ))} */}
      
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Следующая
      </button>
    </div>
  );
};

export default Pagination;
