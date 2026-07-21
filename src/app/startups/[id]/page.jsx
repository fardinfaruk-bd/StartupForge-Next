import { getStartupById } from '@/lib/api/startup';
import React from 'react';
import Link from 'next/link';
import { Card, Button, Chip, Separator } from "@heroui/react";
import { Globe, MapPin, Users, ArrowUpRight, Briefcase } from 'lucide-react';
import { getStartupOpportunity } from '@/lib/api/opportunities';
import OpportunityCard from '@/components/ui/OpportunityCard';
import NotFound from '@/app/not-found';

const StartupDetailsPage = async ({ params }) => {
    const { id } = await params;
    const startup = await getStartupById(id);
    const opportunities = await getStartupOpportunity(startup?._id);
    console.log(opportunities, "from details");

    if (startup.ok === false) {
        return <NotFound />
    }

    if (!startup) {
        return <div className="p-8 text-center text-gray-500">Startup not found.</div>;
    }

    const statusColorMap = {
        approved: "success",
        pending: "warning",
        rejected: "danger",
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Side: Startup Details */}
                <div className="lg:col-span-8 space-y-6">
                    <Card className="p-6">
                        <Card.Header className="flex gap-4 items-start justify-between">
                            <div className="flex gap-4 items-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt={`${startup.name} logo`}
                                    src={startup.logo || "https://placehold.co/150"}
                                    className="w-16 h-16 rounded-xl object-contain bg-gray-50 p-2 border border-gray-100"
                                />
                                <div className="flex flex-col">
                                    <h1 className="text-2xl font-bold text-foreground">{startup.name}</h1>
                                    <p className="text-sm text-default-500">{startup.industry}</p>
                                </div>
                            </div>

                            <Chip
                                color={statusColorMap[startup.status] || "default"}
                                variant="flat"
                                className="capitalize text-xs font-semibold"
                            >
                                {startup.status}
                            </Chip>
                        </Card.Header>

                        <Separator className="my-4" />

                        {/* Fixed: Changed from Card.Body to Card.Content for Hero UI v3 */}
                        <Card.Content className="space-y-6">
                            {/* Meta Info Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex items-center gap-2 text-default-600">
                                    <MapPin className="w-4 h-4 text-default-400" />
                                    <span className="text-sm truncate">{startup.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-default-600">
                                    <Users className="w-4 h-4 text-default-400" />
                                    <span className="text-sm">{startup.employeeCount} Employees</span>
                                </div>
                                <div className="flex items-center gap-2 text-default-600">
                                    <Globe className="w-4 h-4 text-default-400" />
                                    <a
                                        href={startup.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline flex items-center gap-0.5"
                                    >
                                        Visit Website <ArrowUpRight className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-foreground">About Company</h3>
                                <p className="text-default-600 text-sm leading-relaxed whitespace-pre-line">
                                    {startup.description}
                                </p>
                            </div>
                        </Card.Content>
                    </Card>
                </div>

                {/* Right Side: Opportunities Sidebar */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-primary" />
                            Opportunities
                        </h2>

                        <Link
                            href={`/opportunities?search=${startup.name}&page=1`}
                            className="text-sm text-primary hover:underline flex items-center gap-0.5"
                        >
                            View All <ArrowUpRight className="w-3 h-3" />
                        </Link>
                    </div>

                    {/* Stack layout for opportunity items */}
                    <div className="flex flex-col gap-3">
                        {opportunities.slice(0, 3).map((opportunity, index) => (
                            <OpportunityCard
                                key={index}
                                opportunity={opportunity}
                            />
                        ))}
                        {(!opportunities || opportunities.length === 0) && (
                            <div className="text-sm text-default-400 text-center py-4 bg-default-50 rounded-xl border border-dashed border-default-200">
                                No current opportunities available.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StartupDetailsPage;