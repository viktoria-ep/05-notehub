import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  total: number;
  currentPage: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  total,
  currentPage,
  onChange,
}: PaginationProps): React.ReactElement | null {
  if (!total || total <= 1) return null;

  return (
    <ReactPaginate
      pageCount={total}
      forcePage={currentPage - 1}
      onPageChange={(s) => onChange(s.selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      previousLabel="←"
      nextLabel="→"
    />
  );
}
