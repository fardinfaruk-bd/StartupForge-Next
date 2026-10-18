import React from 'react';
import { Card, Button } from '@heroui/react';
import {
  Briefcase,
  Clock,
  MapPin,
  Coins,
  Calendar,
  ArrowLeft,
  CheckCircle,
  SendHorizontal,
  Building
} from 'lucide-react';
import { getOpportunityById } from '@/lib/api/opportunities';
import { ApplyModal } from './apply';
import { getUserSession } from '@/lib/core/session';
import NotFound from '@/app/not-found';
import Link from 'next/link';

export const generateMetadata = async({params}) => {
    const { id } = await params;
    const opportunity = await getOpportunityById( id );

    return {
        title: (opportunity.roleTitle || "Opportunity") + " | StartupForge",
        description: "Explore role details and apply on StartupForge.",
    };
};

export default async function OpportunityDetails({ params }) {
  const { id } = await params;

  const opportunity = await getOpportunityById(id);
  const user = await getUserSession();

  if (opportunity.ok === false) {
    return <NotFound />
  }

  // Formatting helper for Skills string to badges
  const skillsArray = opportunity.requiredSkills
    ? opportunity.requiredSkills.split(',').map(skill => skill.trim())
    : [];

  const targetId = opportunity._id?.$oid || id;
  const isClosed = opportunity.status !== 'active';

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4 py-8">

      {/* Top Navigation Row */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <Link href="/opportunities">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to list
          </Button>
        </Link>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left 2 Columns: Role Content details */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl">
            <Card.Header className="flex flex-col items-start gap-2 p-0">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-extrabold text-white">
                  {opportunity.roleTitle}
                </h1>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${opportunity.status === 'active'
                  ? 'bg-[#0DFFCA]/15 text-[#0DFFCA] border border-[#0DFFCA]/30'
                  : 'bg-red-500/15 text-red-400 border border-red-500/30'
                  }`}>
                  {opportunity.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2">
                <div className="flex items-center gap-1 font-semibold text-white">
                  <Building size={16} className="inline-block mr-1 text-[#0DFFCA]" />
                  {opportunity.startupName}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-gray-400" />
                  {opportunity.location ? opportunity.location : 'N/A'}
                </div>
                <div className="flex items-center gap-1 capitalize">
                  <Briefcase size={16} className="text-gray-400" />
                  {opportunity.workType}
                </div>
              </div>
            </Card.Header>

            <hr className="my-6 border-white/10" />

            <Card.Content className="p-0 space-y-6">
              {/* About Section */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Job Description</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {opportunity.details}
                </p>
              </div>

              {/* Skills Section */}
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Required Core Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsArray.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-white/[0.05] border border-white/10 text-gray-200 font-medium text-sm rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Right 1 Column: Key Metrics Sidebar & Apply Action Area */}
        <div className="space-y-4">

          {/* Metadata Card */}
          <Card className="p-6 bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl">
            <Card.Header className="p-0 pb-3">
              <Card.Title className="text-md font-bold text-white">Role Metadata</Card.Title>
            </Card.Header>
            <Card.Content className="p-0 space-y-4">

              {/* Salary Bracket */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#0DFFCA]/10 text-[#0DFFCA] border border-[#0DFFCA]/20 rounded-lg">
                  <Coins size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Estimated Compensation</div>
                  <div className="text-sm font-bold text-white">
                    ${opportunity.minSalary} – ${opportunity.maxSalary} / month
                  </div>
                </div>
              </div>

              {/* Commitment Type */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#6C8EFF]/10 text-[#6C8EFF] border border-[#6C8EFF]/20 rounded-lg">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Job Commitment</div>
                  <div className="text-sm font-bold text-white capitalize">
                    {opportunity.commitment}
                  </div>
                </div>
              </div>

              {/* Application Deadline */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#FFD060]/10 text-[#FFD060] border border-[#FFD060]/20 rounded-lg">
                  <Calendar size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Application Target Deadline</div>
                  <div className="text-sm font-bold text-white">
                    {opportunity.deadline}
                  </div>
                </div>
              </div>

              <hr className="border-white/10 my-2" />

              <div className="text-xs text-gray-400 flex items-center gap-1 justify-center pt-2">
                <CheckCircle size={14} className="text-[#0DFFCA]" />
                Verified position via ID: {opportunity.startupId}
              </div>
            </Card.Content>
          </Card>

          {/* Apply Interface Widget */}
          <Card className="p-4 border border-[#0DFFCA]/20 bg-[#0DFFCA]/[0.03] backdrop-blur-md rounded-2xl">
            <Card.Content className="p-0 flex flex-col gap-3">
              <ApplyModal opportunity={opportunity} isClosed={isClosed} user={user}>
                <SendHorizontal size={18} />
                {isClosed ? 'Applications Closed' : 'Apply For This Position'}
              </ApplyModal>
              <p className="text-center text-xs text-gray-400 leading-normal">
                {isClosed
                  ? 'This listing is no longer accepting submissions.'
                  : 'Your profile baseline data will be safely shared with the managing founder team.'
                }
              </p>
            </Card.Content>
          </Card>

        </div>

      </div>
    </div>
  );
}