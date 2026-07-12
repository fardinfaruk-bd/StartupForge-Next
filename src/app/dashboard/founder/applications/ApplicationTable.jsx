"use client";

import React from 'react';
import { Table, Button } from '@heroui/react';
import { Check, X } from 'lucide-react';
import { updateApplicationStatus } from '@/lib/actions/applications';
import { toast } from 'react-toastify';

const ApplicationTable = ({ data = [] }) => {

  const handleHire = async(id) => {
    const res = await updateApplicationStatus(id, {status: "accepted"});
    if(res.modifiedCount > 0) {
      toast.success(`Application has been accepted.`);
    }
  };

  const handleReject = async (id) => {
    console.log(`Rejecting applicant for application ID: ${id}`);
    const res = await updateApplicationStatus(id, {status: 'rejected'});
    if(res.modifiedCount > 0) {
      toast.success(`Application has been rejected.`);
    }
  };

  // Status badge tailwind style mapper
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
      case 'hired':
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case 'rejected':
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case 'pending':
      default:
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    }
  };

  return (
    <Table aria-label="Applications management table">
      <Table.ScrollContainer>
        <Table.Content>
          <Table.Header>
            <Table.Column isRowHeader className="text-small font-semibold">
              Applicant Email
            </Table.Column>
            <Table.Column className="text-small font-semibold">Startup</Table.Column>
            <Table.Column className="text-small font-semibold">Role Title</Table.Column>
            <Table.Column className="text-small font-semibold">Status</Table.Column>
            <Table.Column align="center" className="text-small font-semibold">Actions</Table.Column>
          </Table.Header>
          
          {/* FIX: Explicitly closed with Table.Body instead of TableBody */}
          <Table.Body emptyContent={"No applications to display."}>
            {data.map((app) => {
              const appId = app._id?.$oid || app._id;
              const statusBadgeStyles = getStatusStyles(app.Status);
              
              return (
                <Table.Row key={appId} className="hover:bg-default-50 transition-colors">
                  <Table.Cell>
                    <span className="font-medium text-default-700">{app.Applicant_email}</span>
                  </Table.Cell>
                  <Table.Cell className="text-default-600">{app.startupName}</Table.Cell>
                  <Table.Cell className="text-default-600">{app.roleTitle}</Table.Cell>
                  
                  <Table.Cell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize tracking-wide ${statusBadgeStyles}`}>
                      {app.Status}
                    </span>
                  </Table.Cell>
                  
                  <Table.Cell>
                    <div className="flex items-center gap-2 justify-center">
                      {app.Status?.toLowerCase() !== 'accepted' && app.Status?.toLowerCase() !== 'hired' && (
                        <Button
                          size="sm"
                          variant="primary"
                          className="text-white bg-green-500 font-medium shadow-sm"
                          onClick={() => handleHire(appId)}
                        >
                          Hire
                        </Button>
                      )}
                      {app.Status?.toLowerCase() !== 'rejected' && (
                        <Button
                          size="sm"
                          variant="danger"
                          className="text-white font-medium shadow-sm"
                          onClick={() => handleReject(appId)}
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer />
    </Table>
  );
};

export default ApplicationTable;