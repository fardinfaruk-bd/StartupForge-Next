"use client";
import React from "react";
import { Button, Table } from "@heroui/react";
import { Eye, PencilToLine, Pulse, TrashBin } from "@gravity-ui/icons";
import Link from "next/link";
import UpdateOpportunityModal from "@/app/dashboard/founder/manage_opportunity/UpdateOpportunityModal";
import AlertDialogBtn from "../ui/AlertDialog";
import { ArrowRight, LayoutGrid, Plus } from "lucide-react";


const OpportunitiesTable = ({ opportunities }) => {

    return (
        <div>
            <div className='p-4'>
                {opportunities.length > 0 ? (
                    <Table>
                        <Table.ScrollContainer>
                            <Table.Content aria-label="Team members" className="min-w-150">
                                <Table.Header>
                                    <Table.Column isRowHeader>Title</Table.Column>
                                    <Table.Column>Location</Table.Column>
                                    <Table.Column>Type</Table.Column>
                                    <Table.Column>Salary</Table.Column>
                                    <Table.Column>Deadline</Table.Column>
                                    <Table.Column>Status</Table.Column>
                                    <Table.Column>Actions</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                    {opportunities.map((opportunity, index) => (
                                        <Table.Row key={index}>
                                            <Table.Cell>{opportunity.roleTitle}</Table.Cell>
                                            {opportunity.workType === "remote" ? <Table.Cell>{opportunity?.workType.charAt(0).toUpperCase() + opportunity?.workType.slice(1)}</Table.Cell> : <Table.Cell>{opportunities?.location}</Table.Cell>}
                                            <Table.Cell>{opportunity.commitment.charAt(0).toUpperCase() + opportunity.commitment.slice(1)}</Table.Cell>
                                            <Table.Cell>${opportunity.minSalary} - ${opportunity.maxSalary}</Table.Cell>
                                            <Table.Cell>{opportunity?.deadline}</Table.Cell>
                                            <Table.Cell>{opportunity?.status.toLowerCase() === "active" ? <p className="text-green-500">Active</p> : <p className="text-red-500">Rejected</p>}</Table.Cell>
                                            <Table.Cell>
                                                <div className='flex gap-2'>
                                                    <Link href={`/opportunities/${opportunity._id}`}><Button variant='outline' className=" border border-gray-500 text-gray-500"><Eye /></Button></Link>
                                                    <UpdateOpportunityModal opportunity={opportunity} />
                                                    <AlertDialogBtn opportunity={opportunity} />
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>
                        <Table.Footer>
                            <div className="p-2 text-sm text-gray-500">
                                Total Opportunities: {opportunities.length}
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