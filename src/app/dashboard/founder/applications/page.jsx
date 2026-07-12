import { getApplicationByFounderId } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import ApplicationTable from './ApplicationTable'; // Adjust path based on your folder structure

const ApplicationPage = async () => {
    const user = await getUserSession();
    const applications = await getApplicationByFounderId(user.id);
    
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Applications</h2>
            
            {applications && applications.length > 0 ? (
                <ApplicationTable data={applications} />
            ) : (
                <p className="text-default-500">No applications found.</p>
            )}
        </div>
    );
};

export default ApplicationPage;