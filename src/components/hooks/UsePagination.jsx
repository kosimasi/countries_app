import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const usePagination = (initialPage = 1) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const updatePage = useCallback(
    (page) => {
      setCurrentPage(page);
      setSearchParams({ page });
    },
    [setSearchParams]
  );

  return { currentPage, updatePage };
};

export default usePagination;