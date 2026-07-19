import OpportunitiesTable from '@/components/Dashboard/OpportunitiesTable';
import { getOpportunity } from '@/lib/api/opportunities';

import { getUserSession } from '@/lib/core/session';
import React from 'react';

const ManageOpportunityPage = async() => {
    const user = await getUserSession();
    const opportunities = await getOpportunity(user?.id);
    console.log(opportunities);
    return (
        <div className='p-4'>
            <h2 className='text-3xl font-bold'>Manage Opportunities</h2>
            <OpportunitiesTable opportunities={opportunities}/>
        </div>
    );
};

export default ManageOpportunityPage;