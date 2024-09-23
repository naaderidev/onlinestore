"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  HiMiniChevronDoubleRight,
  HiMiniChevronDoubleLeft,
} from "react-icons/hi2";

export default function Pagination({ items, setShownItems, count, type }) {
  const numOfPages = Math.ceil(items.length / count);
  const [page, setPage] = useState(1);

  // This function manages the pagination state and the display
  const paginationHandler = (pageNum) => {
    if (pageNum < 1 || pageNum > numOfPages) return; // Prevents invalid page numbers

    setPage(pageNum);
    const endIndex = count * pageNum;
    const startIndex = endIndex - count;
    const paginatedItems = items.slice(startIndex, endIndex);
    setShownItems(paginatedItems);
  };

  // Effect to handle items changes, resets to first page
  useEffect(() => {
    if (items.length) {
      paginationHandler(1); // Reset to first page on items change
    }
  }, [items, count]);

  // Effect to manage page changes
  useEffect(() => {
    paginationHandler(page); // Called directly with page to set shown items
  }, [page]);

  return (
    <div
      className={clsx("flex-center gap-x-4 mt-10", {
        "text-teal": type === "cms",
        "": type === "market",
      })}
    >
      <div className="flex gap-x-2">
        <button
          onClick={() => paginationHandler(1)}
          className={numOfPages === 1 ? "hidden" : "btn-gradient-left"}
          disabled={page === 1}
        >
          First page
        </button>
        <button
          onClick={() => paginationHandler(page - 1)}
          className={numOfPages === 1 ? "hidden" : "btn-gradient-left"}
          disabled={page === 1}
        >
          <HiMiniChevronDoubleLeft />
        </button>
        <div className="border border-teal rounded-lg px-2 py-1 text-sm">
          page {page} of {numOfPages}
        </div>
        <button
          onClick={() => paginationHandler(page + 1)}
          className={numOfPages === 1 ? "hidden" : "btn-gradient"}
          disabled={page === numOfPages}
        >
          <HiMiniChevronDoubleRight />
        </button>
        <button
          onClick={() => paginationHandler(numOfPages)}
          className={numOfPages === 1 ? "hidden" : "btn-gradient"}
          disabled={page === numOfPages}
        >
          Last page
        </button>
      </div>
    </div>
  );
}
