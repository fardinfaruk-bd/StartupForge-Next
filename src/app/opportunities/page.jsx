import OpportunityCard from '@/components/ui/OpportunityCard';
import { getAllOpportunities } from '@/lib/api/opportunities';
import React from 'react';

const OpportunitiesPage = async () => {
    const opportunities = await getAllOpportunities();
    console.log(opportunities);
    return (
        <div className=' max-w-7xl mx-auto'>
            <div className="my-10 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                    Discover Your Next Opportunity
                </h1>

                <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-slate-600">
                    Explore exciting roles from innovative startups and growing teams.
                    Find the opportunity that matches your skills, goals, and passion.
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {opportunities.map((opportunity) => (
                    <OpportunityCard key={opportunity._id} opportunity={opportunity} />
                ))}
            </div>
        </div>
    );
};

export default OpportunitiesPage;