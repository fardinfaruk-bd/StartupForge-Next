"use client";
import React from "react";
import { Button, Table } from "@heroui/react";
import { Eye, PencilToLine, TrashBin } from "@gravity-ui/icons";


const OpportunitiesTable = ({ opportunities }) => {

    return (
        <div>
            <div className='p-4'>
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
                                {opportunities.map((opportunities, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>{opportunities?.roleTitle}</Table.Cell>
                                        {opportunities.workType === "remote"? <Table.Cell>{opportunities?.workType.charAt(0).toUpperCase() + opportunities?.workType.slice(1)}</Table.Cell>: <Table.Cell>{opportunities?.location}</Table.Cell>}
                                        <Table.Cell>{opportunities.commitment.charAt(0).toUpperCase() + opportunities.commitment.slice(1)}</Table.Cell>
                                        <Table.Cell>${opportunities.minSalary} - ${opportunities.maxSalary}</Table.Cell>
                                        <Table.Cell>{opportunities?.deadline}</Table.Cell>
                                        <Table.Cell>{opportunities.status.charAt(0).toUpperCase() + opportunities.status.slice(1)}</Table.Cell>
                                        <Table.Cell>
                                            <div className='flex gap-2'>
                                                <Button variant='outline' className=" "><Eye /></Button>
                                                <Button variant='outline' className=" border border-green-500  text-green-500"><PencilToLine /></Button>
                                                <Button variant='outline' className=" border border-red-500 text-red-500"><TrashBin /></Button>
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
                </Table>
            </div>
        </div>
    );
};

export default OpportunitiesTable;