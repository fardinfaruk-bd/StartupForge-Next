"use client";

import React from "react";
import { Table, Button, Chip } from "@heroui/react";
import { Globe } from "lucide-react"; // Lucide Icon
import { Check, Xmark } from "@gravity-ui/icons"; // Gravity UI Icons
import { toast } from "react-toastify";
import { updateStartupStatus } from "@/lib/actions/startup";

export default function StartupTable({ startups = [] }) {

  // Named Handler for Approvals
  const handleApprove = async (startupId) => {
    console.log(startupId);
    const res = await updateStartupStatus(startupId, { status: "approved" });
    if (res.modifiedCount > 0) {
      toast.success(`Startup has been Approved.`);
    }
  };

  // Named Handler for Rejections
  const handleReject = async (startupId) => {
    const res = await updateStartupStatus(startupId, { status: "rejected" });
    if (res.modifiedCount > 0) {
      toast.success(`Startup has been Rejected.`);
    }
  };

  return (
    <Table aria-label="Startups list table" className="w-full">
      <Table.ScrollContainer>
        <Table.Content aria-label="Startups directory content">
          <Table.Header>
            {/* Added isRowHeader prop here to satisfy React Aria accessibility rules */}
            <Table.Column isRowHeader>Startup</Table.Column>
            <Table.Column>Industry</Table.Column>
            <Table.Column>Location</Table.Column>
            <Table.Column>Employees</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column align="end">Actions</Table.Column>
          </Table.Header>

          <Table.Body>
            {startups.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={5} className="text-center py-8 text-slate-500">
                  No startups found.
                </Table.Cell>
                {/* Dummy cells to preserve table layout structure */}
                <Table.Cell className="hidden" />
                <Table.Cell className="hidden" />
                <Table.Cell className="hidden" />
                <Table.Cell className="hidden" />
              </Table.Row>
            ) : (
              startups.map((startup) => {
                const startupId = startup._id?.$oid || startup._id || startup.id;

                return (
                  <Table.Row key={startupId}>
                    {/* 1. Name, Logo, & Website */}
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <img
                          src={startup.logo || "https://placehold.co/40x40?text=S"}
                          alt={`${startup.name || "Startup"} logo`}
                          className="w-10 h-10 rounded-lg object-contain bg-slate-100 border border-slate-200"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 leading-tight">
                            {startup.name || startup.startupName}
                          </span>
                          {startup.websiteUrl && (
                            <a
                              href={startup.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-indigo-600 hover:underline flex items-center gap-0.5 mt-0.5"
                            >
                              <Globe size={12} className="inline" />
                              Website
                            </a>
                          )}
                        </div>
                      </div>
                    </Table.Cell>

                    {/* 2. Industry */}
                    <Table.Cell>
                      <span className="capitalize text-sm font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60">
                        {startup.industry || "N/A"}
                      </span>
                    </Table.Cell>

                    {/* 3. Location */}
                    <Table.Cell className="text-sm text-slate-600 max-w-[200px] truncate">
                      {startup.location || "N/A"}
                    </Table.Cell>

                    {/* 4. Employee Count */}
                    <Table.Cell className="text-sm text-slate-600">
                      {startup.employeeCount || "N/A"}
                    </Table.Cell>
                    <Table.Cell>
                      {(() => {
                        const status = startup?.status?.toLowerCase();

                        if (status === "approved") {
                          return <Chip color="success" variant="flat" size="sm" className="font-semibold bg-green-200 text-green-500 px-2.5">Accepted</Chip>;
                        }
                        if (status === "rejected") {
                          return <Chip color="danger" variant="flat" size="sm" className="font-semibold bg-rose-200 text-red-500 px-2.5">Rejected</Chip>;
                        }
                        // Default fallback to Pending
                        return <Chip color="warning" variant="flat" size="sm" className="font-semibold bg-yellow-200 text-yellow-500 px-2.5">Pending</Chip>;
                      })()}
                    </Table.Cell>

                    {/* Action Buttons */}
                    <Table.Cell>
                      <div className="flex justify-end items-center gap-2">
                        {/* Approve Button (Green) */}
                        <Button
                          size="sm"
                          variant="solid"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center gap-1.5 min-w-[90px]"
                          onClick={() => handleApprove(startupId)}
                        >
                          <Check width={14} height={14} />
                          Approve
                        </Button>

                        {/* Reject Button (Red) */}
                        <Button
                          size="sm"
                          variant="solid"
                          className="bg-rose-600 hover:bg-rose-700 text-white font-medium flex items-center gap-1.5 min-w-[90px]"
                          onClick={() => handleReject(startupId)}
                        >
                          <Xmark width={14} height={14} />
                          Reject
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>

      {/* Renders startups.length in the Table.Footer */}
      <Table.Footer className="border-t border-slate-200 px-6 py-4 flex items-center text-xs font-semibold text-slate-500 bg-slate-50">
        Total Startups Listed: {startups.length}
      </Table.Footer>
    </Table>
  );
}