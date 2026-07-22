"use client";
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';

export const FounderDashboardCharts = ({ data = {} }) => {
  // Safe fallbacks in case `data` properties are undefined
  const {
    acceptedApplications = 0,
    pendingApplications = 0,
    rejectedApplications = 0,
    totalApplications = 0,
    applicationsPreviousMonth = 0,
    applicationsThisMonth = 0,
    totalOpportunities = 0,
    maxOpportunities = 0,
    remainingOpportunities = 0,
    plan = 'Free'
  } = data || {};

  const applicationStatusData = [
    { name: 'Accepted', value: acceptedApplications, color: '#10B981' }, // Green
    { name: 'Pending', value: pendingApplications, color: '#F59E0B' },   // Yellow
    { name: 'Rejected', value: rejectedApplications, color: '#EF4444' }   // Red
  ].filter(item => item.value > 0);

  const monthlyData = [
    { name: 'Previous Month', Applications: applicationsPreviousMonth },
    { name: 'This Month', Applications: applicationsThisMonth }
  ];

  const planData = [
    {
      name: 'Opportunities Used',
      value: totalOpportunities,
      fill: '#6366F1' // Indigo
    }
  ];

  // Format plan string safely
  const formattedPlan = typeof plan === 'string' ? plan.replace('_', ' ') : 'N/A';

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
      <h2 style={{ marginBottom: '24px', color: '#0f172a' }}>Founder Performance Analytics</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        
        {/* CHART 1: Application Status */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>Applications Status</h3>
          <div style={{ height: '220px' }}>
            {totalApplications > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {applicationStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ textAlign: 'center', color: '#64748b', paddingTop: '80px' }}>No Applications Received</p>
            )}
          </div>
        </div>

        {/* CHART 2: Monthly Applications Comparison */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>Monthly Application Volume</h3>
          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="Applications" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: Opportunity Capacity vs Plan Limit */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>Opportunity Capacity Limit</h3>
          <div style={{ height: '170px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={12}
                data={planData}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  background={{ fill: '#e2e8f0' }}
                  dataKey="value"
                  max={maxOpportunities}
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div style={{
              position: 'absolute',
              top: '60%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
                {totalOpportunities} / {maxOpportunities}
              </span>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Used Positions</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '13px', color: '#475569', margin: '0' }}>
            Plan: <strong style={{ textTransform: 'capitalize' }}>{formattedPlan}</strong> 
            ({remainingOpportunities} remaining)
          </p>
        </div>

      </div>
    </div>
  );
};

// Reusable styling objects
const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
};

const titleStyle = {
  margin: '0 0 12px 0',
  fontSize: '15px',
  fontWeight: '600',
  color: '#334155'
};

export default FounderDashboardCharts;