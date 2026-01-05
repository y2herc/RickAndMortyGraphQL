// src/components/Pagination.tsx
interface PaginationProps {
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number | null;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function Pagination({
  page,
  onPageChange,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) {
  return (
    <div className="pagination" role="navigation" aria-label="Characters pagination">
      <button
        className="page-btn"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={!hasPrevPage || page === 1}
      >
        ← Prev
      </button>

      <span className="page-label">
        Page {page} {totalPages ? `of ${totalPages}` : null}
      </span>

      <button
        className="page-btn"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
      >
        Next →
      </button>
    </div>
  );
}
