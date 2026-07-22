"use client";

import React from 'react';
import { Table, Chip } from '@heroui/react';

export default function TransactionTable({ transactions = [] }) {
  // Format ISO Date string to human-readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Format Plan ID string into clean uppercase title
  const formatPlan = (planId) => {
    if (!planId) return 'N/A';
    return planId.replace('_', ' ').toUpperCase();
  };

  return (
    <Table>
      <Table.ScrollContainer>
        {/* aria-label placed on Table.Content resolves accessibility requirements */}
        <Table.Content aria-label="Transactions List">
          <Table.Header>
            {/* isRowHeader marks primary identifying column */}
            <Table.Column isRowHeader>User Email</Table.Column>
            <Table.Column>Plan</Table.Column>
            <Table.Column>Amount</Table.Column>
            <Table.Column>Date</Table.Column>
          </Table.Header>
          <Table.Body>
            {transactions.map((item, index) => (
              <Table.Row key={item._id || index}>
                {/* Email */}
                <Table.Cell>
                  <span style={{ fontWeight: 500, color: '#0F172A' }}>
                    {item.email}
                  </span>
                </Table.Cell>

                {/* Plan Badge */}
                <Table.Cell>
                  <Chip size="sm" variant="flat" color="primary">
                    {formatPlan(item.planId)}
                  </Chip>
                </Table.Cell>

                {/* Price */}
                <Table.Cell>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>
                    ${item.price}
                  </span>
                </Table.Cell>

                {/* Created At Date */}
                <Table.Cell>
                  <span style={{ color: '#64748B', fontSize: '14px' }}>
                    {formatDate(item.createdAt)}
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}