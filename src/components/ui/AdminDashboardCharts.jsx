"use client"
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';


export const AdminDashboardCharts = ({ data}) => {
  // Extract values safely
  const {
    totalUsers = 0,
    registeredUsersThisMonth = 0,
    registeredUsersPreviousMonth = 0,
    totalStartups = 0,
    totalOpportunities = 0,
    totalApplications = 0,
    totalRevenue = 0,
    revenueThisMonth = 0,
    revenuePreviousMonth = 0
  } = data;

  // 1. Data for Overall Platform Overview (Bar Chart)
  const overviewData = [
    { name: 'Users', count: totalUsers, fill: '#3B82F6' },         // Blue
    { name: 'Startups', count: totalStartups, fill: '#10B981' },     // Green
    { name: 'Opportunities', count: totalOpportunities, fill: '#8B5CF6' }, // Purple
    { name: 'Applications', count: totalApplications, fill: '#F59E0B' }   // Amber
  ];

  // 2. Data for User Registration Growth (Bar Chart)
  const userGrowthData = [
    { name: 'Prev Month', Users: registeredUsersPreviousMonth },
    { name: 'This Month', Users: registeredUsersThisMonth }
  ];

  // 3. Data for Revenue Breakdown Gauge
  const revenueGaugeData = [
    {
      name: 'Monthly Contribution',
      value: totalRevenue > 0 ? Math.min(100, Math.round((revenueThisMonth / totalRevenue) * 100)) : 0,
      fill: '#10B981'
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
      <h2 style={{ marginBottom: '24px', color: '#0f172a' }}>Admin Platform Analytics</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        
        {/* CHART 1: Platform Entities Overview */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>Platform Overview</h3>
          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: User Registrations Comparison */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>User Growth Trend</h3>
          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="Users" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: Revenue Metrics & Progress Gauge */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>Revenue Overview</h3>
          <div style={{ height: '170px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={12}
                data={revenueGaugeData}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  background={{ fill: '#e2e8f0' }}
                  dataKey="value"
                  max={100}
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
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>
                ${totalRevenue}
              </span>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Total Revenue</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '13px', color: '#475569', margin: '0' }}>
            This Month: <strong>${revenueThisMonth}</strong> | Prev Month: <strong>${revenuePreviousMonth}</strong>
          </p>
        </div>

      </div>
    </div>
  );
};

// Reusable Styling Objects
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

export default AdminDashboardCharts;