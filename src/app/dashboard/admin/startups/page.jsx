import React from 'react';
import { getActiveAllStartups } from '@/lib/api/startup';
import StartupTable from './StartupTable';

const Page = async () => {
    const startups = await getActiveAllStartups();

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-6">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-slate-900">Startup Directory</h1>
                <p className="text-sm text-slate-500">
                    Review, approve, or reject active candidate submissions.
                </p>
            </header>

            <main className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <StartupTable startups={startups} />
            </main>
        </div>
    );
};

export default Page;