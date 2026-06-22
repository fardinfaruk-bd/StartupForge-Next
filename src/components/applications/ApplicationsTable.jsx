"use client";
import React from "react";
import { Button, Chip, Table } from "@heroui/react";
import { Eye } from "@gravity-ui/icons";
import Link from "next/link";
import UpdateOpportunityModal from "@/app/dashboard/founder/manage_opportunity/UpdateOpportunityModal";
import AlertDialogBtn from "../ui/AlertDialog";
import { LayoutGrid, Plus } from "lucide-react";


const OpportunitiesTable = ({ applications }) => {

    return (
        <div>
            <div className='p-4'>
                {applications.length > 0 ? (
                    <Table>
                        <Table.ScrollContainer>
                            <Table.Content aria-label="Team members" className="min-w-150">
                                <Table.Header>
                                    <Table.Column isRowHeader>Opportunity Name</Table.Column>
                                    <Table.Column>Startup Name</Table.Column>
                                    <Table.Column>Applied Date</Table.Column>
                                    <Table.Column>Status</Table.Column>

                                </Table.Header>
                                <Table.Body>
                                    {applications.map((application, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>{application?.roleTitle}</Table.Cell>
                                            <Table.Cell>{application?.startupName}</Table.Cell>
                                            <Table.Cell>{application?.applied_at}</Table.Cell>
                                            <Table.Cell>
                                                {(() => {
                                                    const status = application?.Status?.toLowerCase();

                                                    if (status === "accepted") {
                                                        return <Chip color="success" variant="flat" size="sm" className="font-semibold bg-green-200 text-green-500 px-2.5">Accepted</Chip>;
                                                    }
                                                    if (status === "rejected") {
                                                        return <Chip color="danger" variant="flat" size="sm" className="font-semibold bg-rose-200 text-red-500 px-2.5">Rejected</Chip>;
                                                    }
                                                    // Default fallback to Pending
                                                    return <Chip color="warning" variant="flat" size="sm" className="font-semibold bg-yellow-200 text-yellow-500 px-2.5">Pending</Chip>;
                                                })()}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>
                        <Table.Footer>
                            <div className="p-2 text-sm text-gray-500">
                                Total Opportunities: {applications.length}
                            </div>
                        </Table.Footer>
                    </Table>)
                    : <div className="min-h-[40vh] bg-gray-200 flex flex-col items-center justify-center rounded-lg">
                        <Plus size={100} />
                        <h1 className="text-3xl font-bold">No Opportunities</h1>
                        <p className="text-gray-500">Please create an opportunity to get started</p>
                        <div className="flex gap-5 mt-5">
                            <Link href="/dashboard/founder/add_opportunity"><Button variant="primary" className="bg-[#0a1220] text-slate-400 font-bold"><Plus /> Create Opportunity</Button></Link>
                            <Link href="/dashboard/founder"><Button variant="outline" className="border-2 border-[#0a1220] "><LayoutGrid /> Go Overview</Button></Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default OpportunitiesTable;