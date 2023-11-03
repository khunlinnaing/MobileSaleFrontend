import React, { useState, useContext } from 'react';
import Content from '../components/context';

function PaginationExample() {
  const {page, setPage, total} = useContext(Content)
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= total) {
      setPage(newPage);
    }
  };

  const displayPages = [];
  if (total <= 3) {
    for (let i = 1; i <= total; i++) {
      displayPages.push(i);
    }
  } else {
    const startPage = Math.max(page - 2, 1);
    const endPage = Math.min(page + 2, total);
    displayPages.push(startPage);
    if (startPage > 1) {
      displayPages.push('...');
    }
    for (let i = startPage + 1; i < endPage; i++) {
      displayPages.push(i);
    }
    if (endPage < total) {
      displayPages.push('...');
    }
    displayPages.push(endPage);
  }

  return (
    <div className="container">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page - 1)}>Previous</button>
          </li>
          {displayPages.map((pag, index) => (
            <li key={index} className={`page-item ${pag === page ? 'active' : ''}`}>
              {pag === '...' ? (
                <span className="page-link">...</span>
              ) : (
                <button className="page-link" onClick={() => handlePageChange(pag)}>{pag}</button>
              )}
            </li>
          ))}
          <li className={`page-item ${page === total ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PaginationExample;
