import React from 'react';
import { getApplicationByApplicantId } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
// HeroUI Container element
import { Chip } from "@heroui/react";
import ApplicationsTable from '@/components/applications/ApplicationsTable';

export default async function ContributorApplicationPage() {
  const user = await getUserSession();
  const applications = await getApplicationByApplicantId(user.id);


  return (
    <div className="min-h-screen antialiased py-16 px-4 sm:px-6 ">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Block Section */}
        <div className="flex flex-col items-start space-y-3">
          
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl ">
            Contributor Applications
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
            Review status indices, active submissions, and structural review steps for your inbound pipeline profiles.
          </p>
        </div>

        {/* Presentational Data Table Grid Wrapper */}
        <ApplicationsTable applications={applications}/>

      </div>
    </div>
  );
}