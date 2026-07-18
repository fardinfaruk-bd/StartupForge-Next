import StartupCardContainer from '@/components/Home/StartupCardContainer';
import StartupCard from '@/components/ui/StartupCard';
import { getActiveAllStartups, getFounder } from '@/lib/api/startup';
import React from 'react';

const page = async () => {
    const startups = await getActiveAllStartups();

    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header Info Section */}
            <div className="mb-10 border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Explore Startups
                    </h1>
                    <p className="text-slate-500 mt-1 text-sm">
                        Discover active innovations and companies forging ahead.
                    </p>
                </div>

                {/* Counter Badge */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 w-fit self-start sm:self-center">
                    {startups.length} Active {startups.length === 1 ? 'Company' : 'Companies'}
                </span>
            </div>

            {/* Responsive Responsive Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {startups.map((startup, index) => (
                    <StartupCardContainer key={index} startup={startup} />
                ))}
            </div>
        </div>
    );
};

export default page;