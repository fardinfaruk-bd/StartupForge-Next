"use client";
import { authClient } from '@/lib/auth-client';
import React from 'react';
import { Briefcase, Persons, Thunderbolt, CircleCheck, Globe, HardDrive, Cpu } from '@gravity-ui/icons';
import { Spinner } from '@heroui/react';
import { DashboardStats } from '@/components/ui/DashboardStats';

const FounderDashboardHomePage = () => {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="flex items-center justify-center min-h-screen gap-4">
                <Spinner />
            </div>
        )
    }

    const user = session?.user;
    

    const Stats = [
        { title: "Total Job Posts", value: "48", icon: Briefcase },
        { title: "Total Applicants", value: "1,284", icon: Persons },
        { title: "Active Jobs", value: "18", icon: Thunderbolt },
        { title: "Jobs Closed", value: "32", icon: CircleCheck },
    ];

    return (
        <div className='p-3'>
            <h2 className='text-4xl font-bold'>Welcome! {user?.name}</h2>
            <DashboardStats statsData={Stats} />
        </div>

    );
};

export default FounderDashboardHomePage;