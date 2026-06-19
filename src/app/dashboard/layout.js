import { DashboardSidebar } from '@/components/Dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className='flex min-h-screen'>
            <DashboardSidebar />
            <div className='flex-1'>{children}</div>
        </div>
    );
};

export default DashboardLayout;