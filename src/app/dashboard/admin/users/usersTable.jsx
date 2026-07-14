"use client";

import React, { useState, useTransition } from "react";
import { Table, Dropdown, Button, Label } from "@heroui/react";
import { 
  User, 
  MoreVertical, 
  UserCheck, 
  HeartHandshake, 
  UserX,
  Loader2 
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserTable({ initialUsers }) {
    const [users, setUsers] = useState(initialUsers);
    const [isPending, startTransition] = useTransition();
    const [updatingUserId, setUpdatingUserId] = useState(null);
    const router = useRouter();

    const handleRoleAction = async (userId, actionType) => {
        setUpdatingUserId(userId);
        
        let updatedRole = null;
        let updatedStatus = null;

        if (actionType === "make_founder") {
            updatedRole = "founder";
            updatedStatus = "active";
        } else if (actionType === "make_contributor") {
            updatedRole = "contributor";
            updatedStatus = "active";
        } else if (actionType === "suspend") {
            updatedStatus = "suspended";
        }

        const previousUsers = [...users];

        setUsers(prev => prev.map(u => {
            if (u._id === userId || u.id === userId) {
                return {
                    ...u,
                    ...(updatedRole && { role: updatedRole }),
                    ...(updatedStatus && { status: updatedStatus })
                };
            }
            return u;
        }));

        startTransition(async () => {
            try {
                const response = await fetch(`/api/users/${userId}/update-role`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ role: updatedRole, status: updatedStatus }),
                });

                if (!response.ok) throw new Error("Failed to update user");
                router.refresh();
            } catch (error) {
                console.error("Action error:", error);
                setUsers(previousUsers);
                alert("Could not complete the action. Please try again.");
            } finally {
                setUpdatingUserId(null);
            }
        });
    };

    return (
        <Table>
            <Table.ScrollContainer>
                <Table.Content aria-label="Registered platform users">
                    <Table.Header>
                        {/* FIXED: Added isRowHeader here so React Aria knows how to identify the row data audibly */}
                        <Table.Column isRowHeader>Name</Table.Column>
                        <Table.Column>Email</Table.Column>
                        <Table.Column>Role</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column>Actions</Table.Column>
                    </Table.Header>

                    <Table.Body>
                        {users.map((user) => {
                            const userId = user._id || user.id;
                            const isCurrentlyUpdating = updatingUserId === userId && isPending;

                            return (
                                <Table.Row key={userId}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-slate-100 p-1.5 rounded-full text-slate-600">
                                                <User size={16} />
                                            </div>
                                            <span className="font-medium text-slate-900">
                                                {user.name || "Anonymous User"}
                                            </span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell className="text-slate-600">
                                        {user.email}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="capitalize text-xs font-semibold bg-slate-100 px-2 py-1 rounded text-slate-700 border border-slate-200">
                                            {user.role || "user"}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                                            user.status === 'suspended'
                                                ? 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20'
                                                : 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20'
                                        }`}>
                                            {user.status || 'active'}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {isCurrentlyUpdating ? (
                                            <div className="flex items-center justify-center w-8 h-8">
                                                <Loader2 size={18} className="animate-spin text-indigo-600" />
                                            </div>
                                        ) : (
                                            <Dropdown>
                                                <Dropdown.Trigger variant="light" isIconOnly size="sm">
                                                    <MoreVertical size={16} />
                                                </Dropdown.Trigger>
                                                <Dropdown.Popover>
                                                    <Dropdown.Menu onAction={(key) => handleRoleAction(userId, key)}>
                                                        <Dropdown.Item id="make_founder" textValue="Make Founder">
                                                            <UserCheck size={14} className="mr-2 inline" />
                                                            <Label>Make Founder</Label>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item id="make_contributor" textValue="Make Contributor">
                                                            <HeartHandshake size={14} className="mr-2 inline" />
                                                            <Label>Make Contributor</Label>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item id="suspend" textValue="Suspend" variant="danger" className="text-rose-600">
                                                            <UserX size={14} className="mr-2 inline" />
                                                            <Label>Suspend User</Label>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown.Popover>
                                            </Dropdown>
                                        )}
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
}