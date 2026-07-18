'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Pagination, Button } from '@heroui/react';
import { Magnifier } from '@gravity-ui/icons';
import Loading from '@/app/loading';
import Link from 'next/link';
import AlertDialogBtn from '@/components/ui/AlertDialog';
import { Eye } from 'lucide-react';

export default function OpportunityPaginationContainer({ opportunities, total, filters }) {
  const router = useRouter();

  const normalizeFilter = (value, fallback) =>
    Array.isArray(value) ? value[0] || fallback : value || fallback;

  const [page, setPage] = useState(Number(normalizeFilter(filters.page, 1)));

  const totalItems = total || 0;
  const perPage = 12;
  const totalPages = Math.ceil(totalItems / perPage);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startItem = totalItems === 0 ? 0 : (page - 1) * perPage + 1;
  const endItem = Math.min(page * perPage, totalItems);

  useEffect(() => {
    const sp = new URLSearchParams();
    if (page) {
      sp.set('page', page.toString());
    }
    const path = `?${sp.toString()}`;
    router.push(path);
  }, [router, page]);


  if (!opportunities) {
    return <Loading />;
  }

  if (opportunities.length === 0) {
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
          {/* Changed min-w-150 to a responsive pixel boundary like min-w-[750px] so actions have space */}
          <Table.Content aria-label="Opportunities Dashboard Table" className="min-w-[750px]">
            <Table.Header>
              <Table.Column isRowHeader>Opportunity Title</Table.Column>
              <Table.Column>Startup</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column>Commitment</Table.Column>
              {/* New column header aligned neatly to the right */}
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {opportunities.map((opportunity) => (
                <Table.Row key={opportunity._id}>
                  <Table.Cell>{opportunity.roleTitle || "—"}</Table.Cell>
                  <Table.Cell>{opportunity.startupName || "—"}</Table.Cell>
                  {opportunity.workType === "remote" ? <Table.Cell>{opportunity?.workType.charAt(0).toUpperCase() + opportunity?.workType.slice(1)}</Table.Cell> : <Table.Cell>{opportunity?.location}</Table.Cell>}
                  <Table.Cell>{opportunity.commitment.charAt(0).toUpperCase() + opportunity.commitment.slice(1) || "—"}</Table.Cell>

                  {/* Action buttons matching the schema */}
                  <Table.Cell className="text-right">
                    <div className='flex gap-2'>
                      <Link href={`/opportunities/${opportunity._id}`}><Button variant='outline' className=" border border-gray-500 text-gray-500"><Eye /></Button></Link>
                      <AlertDialogBtn opportunity={opportunity} />
                    </div>
                  </Table.Cell>
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