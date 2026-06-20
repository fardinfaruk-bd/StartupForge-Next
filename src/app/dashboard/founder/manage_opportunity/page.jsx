import OpportunitiesTable from '@/components/Dashboard/OpportunitiesTable';
import { getCompanyOpportunities } from '@/lib/api/opportunities';
import { loggedInFounderStartup } from '@/lib/api/startup';
import React from 'react';

const ManageOpportunityPage = async() => {
    const startup = await loggedInFounderStartup();   
    const opportunities = await getCompanyOpportunities(startup?._id, "active");
    return (
        <div className='p-4'>
            <h2 className='text-3xl font-bold'>Manage Opportunities</h2>
            <OpportunitiesTable opportunities={opportunities}/>
        </div>
    );
};

export default ManageOpportunityPage;