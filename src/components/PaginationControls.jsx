import React from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationItems = () => {
    const items = [];

    items.push(
      <Pagination.Item
        key={1}
        active={1 === currentPage}
        onClick={() => onPageChange(1)}
      >
        {1}
      </Pagination.Item>
    );
    if (currentPage > 3) {
      items.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
    }

    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={totalPages === currentPage}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt; Previous
      </Pagination.Prev>
      {getPaginationItems()}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &gt;
      </Pagination.Next>
    </Pagination>
  );
};

export default PaginationControls;
