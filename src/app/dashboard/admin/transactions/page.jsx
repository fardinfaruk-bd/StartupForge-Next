import React from 'react';
import { getAllTransactions } from '@/lib/api/payment';
import TransactionTable from './TransactionTable';

const Page = async () => {
  const transactions = await getAllTransactions();

  // Handle cases where transactions is null, undefined, or empty
  const hasTransactions = Array.isArray(transactions) && transactions.length > 0;

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0F172A', margin: 0 }}>
          Transaction History
        </h1>
        <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>
          View and track recent user subscriptions and payments.
        </p>
      </div>

      {hasTransactions ? (
        <TransactionTable transactions={transactions} />
      ) : (
        /* Empty State Validation Component */
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px dashed #E2E8F0',
            textAlign: 'center',
          }}
        >
          {/* Credit Card / Receipt Illustration Icon */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
              <line x1="6" y1="15" x2="10" y2="15" />
            </svg>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B', margin: '0 0 6px 0' }}>
            No Transactions Yet
          </h3>
          <p style={{ fontSize: '14px', color: '#64748B', margin: 0, maxWidth: '320px' }}>
            You do not have any transactions to display right now. New payment records will appear here automatically.
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;