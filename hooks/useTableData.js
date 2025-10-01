import React from "react";

const useTableData = (data, statusFilter, sortBy) => {
  const filteredAndSortedData = React.useMemo(() => {
    // Ensure data is an array
    if (!Array.isArray(data)) {
      return [];
    }

    let filtered = data;

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "oldest":
          return new Date(a.created_at) - new Date(b.created_at);
        case "start_date_asc":
          return new Date(a.start_date) - new Date(b.start_date);
        case "start_date_desc":
          return new Date(b.start_date) - new Date(a.start_date);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return sorted;
  }, [data, statusFilter, sortBy]);

  return filteredAndSortedData;
};

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : [];

  const totalPages = Math.ceil(safeData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = safeData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Reset to first page when data changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [safeData.length]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    currentItems,
    handlePageChange,
  };
};

export { useTableData, usePagination };
