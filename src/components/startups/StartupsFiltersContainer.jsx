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
      <div className="text-sm text-gray-400 font-medium pl-1 mb-5">
        Showing <span className="text-[#0DFFCA] font-semibold">{startups?.length}</span> {startups?.length === 1 ? 'company' : 'companies'}
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
        <div className="text-center py-16 border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-md max-w-xl mx-auto my-6">
          <Magnifier className="mx-auto text-gray-500 text-4xl mb-3" />
          <p className="text-white font-medium text-lg">No results found</p>
          <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">
            Try adjusting your keywords or clearing the dropdown filters to search the database again.
          </p>
        </div>
      )}
    </>
  );
}