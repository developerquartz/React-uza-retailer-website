import ReactPaginate from 'react-paginate';

export default function Pagination({ limit = 5, totalPages, handlePageClick, initialPage = 0 }) {
    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel={'>'}
                onPageChange={handlePageClick}
                pageRangeDisplayed={limit}
                pageCount={totalPages}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className='pagination-wrapper'
                initialPage={initialPage}
            />
        </>
    );
}