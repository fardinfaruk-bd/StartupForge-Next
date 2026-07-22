import React from 'react';
import { Spinner } from '@heroui/react';
import { DashboardStats } from '@/components/ui/DashboardStats';
import { getUserSession } from '@/lib/core/session';
import { loadFounderStats } from '@/lib/api/stats';
import { formatDashboardStats } from '@/lib/formatStats';
import ContributorDashboardCharts from '@/components/ui/ContributorDashboardCharts';

const ContributorDashboardHomePage = async () => {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-4">
        <Spinner />
      </div>
    );
  }

  
  const rawResponse = await loadFounderStats(user.role, user.id);
  
  const rawStats = rawResponse?.stats || rawResponse;
  console.log(rawStats, "stats");

  
  const formattedStats = formatDashboardStats(user.role, rawStats);

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col gap-6">
      <h2 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}!</h2>
      <ContributorDashboardCharts data={rawStats} />
      <DashboardStats statsData={formattedStats} />
    </div>
  );
};

export default ContributorDashboardHomePage;