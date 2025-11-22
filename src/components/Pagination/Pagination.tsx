// src/components/Pagination/Pagination.tsx
import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  total: number; // total pages count
  perPage: number;
  currentPage: number; // 1-based
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
      containerClassName={css.container}
      activeClassName={css.active}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
    />
  );
}
