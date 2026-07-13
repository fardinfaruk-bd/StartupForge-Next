import React from 'react';
import AddOpportunityForm from './AddOpportunityForm';
import { loggedInFounderStartup } from '@/lib/api/startup';
import { getOpportunity } from '@/lib/api/opportunities';
import { getUserSession } from '@/lib/core/session';
import Link from 'next/link';
import { getPlanById } from '@/lib/api/plans';
// Added Clock icon here
import { LayoutGrid, Plus, Clock } from 'lucide-react'; 
import { Button } from '@heroui/react';

const PostOpportunityPage = async () => {
    const user = await getUserSession();
    const startup = await loggedInFounderStartup();
    const myOpportunities = await getOpportunity(user?.id);

    const plan = await getPlanById(user?.plan || "founder_free");

    // 1. Check if startup data exists at all
    if (!startup?._id) {
        return (
          <div className="min-h-[40vh] bg-gray-200 flex flex-col items-center justify-center mx-10 mt-10 rounded-lg">
            <Plus size={100} />
            <h1 className="text-3xl font-bold">No Application</h1>
            <p className="text-gray-500">Please apply for an opportunity First</p>
            <div className="flex gap-5 mt-5">
              <Link href="/dashboard/founder/startup"><Button variant="primary" className="bg-[#0a1220] text-slate-400 font-bold"><Plus />Add Startup</Button></Link>
              <Link href="/dashboard/founder"><Button variant="outline" className="border-2 border-[#0a1220] "><LayoutGrid /> Go Overview</Button></Link>
            </div>
          </div>
        )
    }

    // 2. Added Validation: Check if startup status is pending
    if (startup.status === 'Pending') {
        return (
          <div className="min-h-[50vh] bg-slate-50 border border-slate-200 flex flex-col items-center justify-center mx-4 md:mx-10 mt-10 p-8 rounded-xl text-center shadow-sm">
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-amber-50 text-amber-500 mb-6 animate-pulse">
              <Clock size={48} strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Your Startup is Under Review
            </h1>
            <p className="text-slate-500 max-w-sm mb-6">
              Please wait while our team reviews your application details. You will be able to post opportunities as soon as your startup is approved.
            </p>
            <Link href="/dashboard/founder">
              <Button className="border-2 border-[#0a1220] text-[#0a1220] font-semibold bg-transparent hover:bg-slate-100">
                <LayoutGrid size={18} /> Go to Overview
              </Button>
            </Link>
          </div>
        )
    }
    
    const usageCount = myOpportunities?.length || 0;
    const isLimitReached = usageCount >= plan.maxOpportunities;
    const usagePercentage = Math.min((usageCount / plan.maxOpportunities) * 100, 100);

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
            {/* Header section */}
            <div className="mb-8 border-b border-gray-200 pb-5">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Post a New Opportunity
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Share equity, roles, or partnerships available at <span className="font-semibold text-gray-700">{startup?.name || 'your startup'}</span>.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Left Side: Form Container */}
                <div className="md:col-span-2">
                    {isLimitReached ? (
                        <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center shadow-sm">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-red-950">Monthly Limit Reached</h3>
                            <p className="mt-2 text-sm text-red-700">
                                You have used all available slots for the {plan.name}. Upgrade your plan to post more opportunities.
                            </p>
                            <Link
                                href="/plans"
                                className="mt-4 inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition"
                            >
                                View Plans & Upgrade
                            </Link>
                        </div>
                    ) : (
                        <AddOpportunityForm startup={startup} user={user} />
                    )}
                </div>

                {/* Right Side: Usage Tracker Widget */}
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Current Plan</span>
                            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 capitalize">
                                {plan.name}
                            </span>
                        </div>

                        <h3 className="text-sm font-medium text-slate-900 mb-1">Monthly Usage</h3>
                        <div className="flex items-baseline text-slate-900 mb-3">
                            <span className="text-3xl font-bold tracking-tight">{usageCount}</span>
                            <span className="ml-1 text-sm font-semibold text-slate-500">/ {plan.maxOpportunities} slots used</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 rounded-full h-2 mb-4 overflow-hidden">
                            <div
                                className={`h-2 rounded-full transition-all duration-500 ${isLimitReached ? 'bg-red-500' : 'bg-indigo-600'}`}
                                style={{ width: `${usagePercentage}%` }}
                            ></div>
                        </div>

                        {!isLimitReached && (
                            <p className="text-xs text-slate-500">
                                Need to post more?{' '}
                                <Link href="/plans" className="font-medium text-indigo-600 hover:text-indigo-500 underline underline-offset-2">
                                    Explore paid plans
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostOpportunityPage;