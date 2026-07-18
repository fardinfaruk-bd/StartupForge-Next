"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {  Pagination } from '@heroui/react';
import { Magnifier  } from '@gravity-ui/icons';
import StartupFilters from './StartupFilter';
import StartupCard from '../ui/StartupCard';

export default function StartupFiltersContainer({startups, total, filters }) {
  const router = useRouter();
  

  const normalizeFilter = (value, fallback) =>
    Array.isArray(value) ? value[0] || fallback : value || fallback;

  const [searchQuery, setSearchQuery] = useState(normalizeFilter(filters.search, ""));
  const [page, setPage] = useState(Number(normalizeFilter(filters.page, 1)));


  const totalItems = total;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    if (totalPages <= 1) {
      return totalPages === 1 ? [1] : [];
    }

    const pages = [1];

    if (page > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };


  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);


  useEffect(() => {
    const sp = new URLSearchParams();

    if (searchQuery) {
      sp.set('search', searchQuery);
    }

    if (page) {
      sp.set('page', page);
    }

    const path = `?${sp.toString()}`;
    router.push(path);


  }, [router,searchQuery, page]);

  return (
    <>
      <StartupFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Item Metrics Counter */}
      <div className="text-sm text-slate-500 font-medium pl-1 mb-5">
        Showing <span className="text-slate-800 font-semibold">{startups?.length}</span> {startups?.length === 1 ? 'opportunity' : 'opportunities'}
      </div>

      {/* Main Grid Render */}
      {startups?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {startups.map((startup) => (
              <StartupCard key={startup._id} startup={startup} />
            ))}
          </div>
          {totalPages > 1 && (
          <Pagination className="w-full my-10">
            <Pagination.Summary>
              Showing {startItem}-{endItem} of {totalItems} results
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>
              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ),
              )}
              <Pagination.Item>
                <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
          )}

        </>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl  bg-slate-50/50 max-w-xl mx-auto my-6">
          <Magnifier className="mx-auto text-slate-300 text-4xl mb-3" />
          <p className="text-slate-600 font-medium text-lg">No results found</p>
          <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">
            Try adjusting your keywords or clearing the dropdown filters to search the database again.
          </p>
        </div>
      )}
    </>
  );
}