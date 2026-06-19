import OpportunitiesTable from '@/components/Dashboard/OpportunitiesTable';
import { getCompanyOpportunities } from '@/lib/api/opportunities';
import React from 'react';

const ManageOpportunityPage = async() => {
    const companyId = "company_123";
    const opportunities = await getCompanyOpportunities(companyId, "active");
    return (
        <div className='p-4'>
            <h2 className='text-3xl font-bold'>Manage Opportunities</h2>
            <OpportunitiesTable opportunities={opportunities}/>
        </div>
    );
};

export default ManageOpportunityPage;