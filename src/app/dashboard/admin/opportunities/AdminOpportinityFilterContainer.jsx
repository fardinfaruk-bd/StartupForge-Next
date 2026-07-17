'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Pagination } from '@heroui/react';
import { Magnifier } from '@gravity-ui/icons';

export default function OpportunityPaginationContainer({ opportunities, total, filters }) {
  const router = useRouter();

  const normalizeFilter = (value, fallback) =>
    Array.isArray(value) ? value[0] || fallback : value || fallback;

  const [page, setPage] = useState(Number(normalizeFilter(filters.page, 1)));

  const totalItems = total || 0;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  useEffect(() => {
    const sp = new URLSearchParams();
    if (page) {
      sp.set('page', page.toString());
    }
    const path = `?${sp.toString()}`;
    router.push(path);
  }, [router, page]);

  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 max-w-xl mx-auto my-6">
        <Magnifier className="mx-auto text-slate-300 text-4xl mb-3" />
        <p className="text-slate-600 font-medium text-lg">No opportunities found</p>
        <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">
          There are no items matching this criteria on this page index yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full my-6">
      <Table>
        
        <Table.ScrollContainer>
          
          <Table.Content aria-label="Opportunities Dashboard Table" className="min-w-[600px]">
            <Table.Header>
              <Table.Column isRowHeader>Opportunity Title</Table.Column>
              <Table.Column>Company</Table.Column>
              <Table.Column>Work Type</Table.Column>
              <Table.Column>Commitment</Table.Column>
            </Table.Header>
            
            <Table.Body>
              {opportunities.map((opportunity) => (
                <Table.Row key={opportunity._id}>
                  <Table.Cell>{opportunity.roleTitle || "—"}</Table.Cell>
                  <Table.Cell>{opportunity.startupName || "—"}</Table.Cell>
                  <Table.Cell>{opportunity.workType || "—"}</Table.Cell>
                  <Table.Cell>{opportunity.commitment || "—"}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        
        {totalPages > 1 && (
          <Table.Footer>
            <Pagination size="sm">
              <Pagination.Summary>
                {startItem} to {endItem} of {totalItems} results
              </Pagination.Summary>
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={page === 1}
                    onPress={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <Pagination.PreviousIcon />
                    Prev
                  </Pagination.Previous>
                </Pagination.Item>
                
                {pages.map((p) => (
                  <Pagination.Item key={p}>
                    <Pagination.Link 
                      isActive={p === page} 
                      onPress={() => setPage(p)}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ))}

                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={page === totalPages}
                    onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </Table.Footer>
        )}
      </Table>
    </div>
  );
}