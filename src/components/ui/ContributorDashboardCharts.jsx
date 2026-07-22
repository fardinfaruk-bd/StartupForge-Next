"use client"
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



export const ContributorDashboardCharts = ({ data }) => {
  // Extract values safely with defaults
  const accepted = data.accepted || 0;
  const pending = data.pending || 0;
  const rejected = data.rejected || 0;
  const totalApplied = data.totalApplied || 0;

  
  const successRate = totalApplied > 0 ? Math.round((accepted / totalApplied) * 100) : 0;


  const monthlyData = [
    { name: 'Older', Applications: data.totalApplicationOtherMonth || 0 },
    { name: 'Prev Month', Applications: data.totalApplicationProviousMonth || 0 },
    { name: 'This Month', Applications: data.totalApplicationInThisMonth || 0 }
  ];

  // 3. Success Rate Gauge Data
  const successGaugeData = [
    {
      name: 'Success Rate',
      value: successRate,
      fill: '#10B981'
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
      <h2 style={{ marginBottom: '24px', color: '#0f172a' }}>Contributor Application Analytics</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        
        

        
        <div style={cardStyle}>
          <h3 style={titleStyle}>Application Timeline</h3>
          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="Applications" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={titleStyle}>Acceptance Rate</h3>
          <div style={{ height: '170px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={12}
                data={successGaugeData}
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
              <span style={{ fontSize: '26px', fontWeight: 'bold', color: '#0f172a' }}>
                {successRate}%
              </span>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Accepted</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '13px', color: '#475569', margin: '0' }}>
            <strong>{accepted}</strong> out of <strong>{totalApplied}</strong> applications approved
          </p>
        </div>

      </div>
    </div>
  );
};


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

const emptyStateStyle = {
  textAlign: 'center',
  color: '#64748b',
  paddingTop: '80px'
};

export default ContributorDashboardCharts;