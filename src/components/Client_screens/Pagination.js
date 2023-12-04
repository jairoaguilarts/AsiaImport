import React from 'react';
import "./Pagination.css";

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pageRangeDisplayed = 3; // Número de páginas a mostrar

    let firstPageInRange = Math.max(1, currentPage - Math.floor(pageRangeDisplayed / 2));
    let lastPageInRange = Math.min(totalPages, firstPageInRange + pageRangeDisplayed - 1);

    if (lastPageInRange - firstPageInRange + 1 < pageRangeDisplayed) {
        firstPageInRange = Math.max(1, lastPageInRange - pageRangeDisplayed + 1);
    }

    for (let i = firstPageInRange; i <= lastPageInRange; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                <li className='page-item'>
                    <button 
                        onClick={() => paginate(1)} 
                        className={`page-link ${currentPage === 1 ? 'disabled' : 'jump-button'}`}
                        disabled={currentPage === 1}>
                        {'<<'}
                    </button>
                </li>
                <li className='page-item'>
                    <button 
                        onClick={() => paginate(currentPage - 1)} 
                        className='page-link'
                        disabled={currentPage === 1}>
                        {'<'}
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </button>
                    </li>
                ))}
                <li className='page-item'>
                    <button 
                        onClick={() => paginate(currentPage + 1)} 
                        className='page-link'
                        disabled={currentPage === totalPages}>
                        {'>'}
                    </button>
                </li>
                <li className='page-item'>
                    <button 
                          onClick={() => paginate(totalPages)} 
                          className={`page-link ${currentPage === totalPages ? 'disabled' : 'jump-button'}`}
                          disabled={currentPage === totalPages}>
                          {'>>'}
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
