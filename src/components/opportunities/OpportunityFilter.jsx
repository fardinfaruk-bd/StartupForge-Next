'use client';

import React from "react";
import { TextField, InputGroup, Select, ListBox } from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";

export default function OpportunityFilters({
    searchQuery,
    setSearchQuery,
    selectedWorkType,
    setSelectedWorkType,
    selectedCommitment,
    setSelectedCommitment,
}) {
    return (
        <div className="flex flex-col gap-4 p-6 rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-md max-w-7xl mx-auto mb-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

                {/* 1. Search Text Field - Span 6 columns */}
                <div className="md:col-span-6">
                    <TextField
                        value={searchQuery}
                        onChange={(value) => setSearchQuery(value)}
                        className="w-full"
                    >
                        <span className="text-sm font-medium text-gray-300 block mb-2">Search Opportunities</span>
                        <InputGroup className="border border-white/10 bg-white/[0.04] focus-within:border-[#0DFFCA] rounded-xl transition-all">
                            <InputGroup.Prefix className="pl-3 text-gray-400">
                                <Magnifier className="w-4 h-4" />
                            </InputGroup.Prefix>
                            <InputGroup.Input
                                placeholder="Title, Startup, or keywords..."
                                className="bg-transparent placeholder-gray-500 text-sm py-2.5 px-3 outline-none w-full text-white"
                            />
                        </InputGroup>
                    </TextField>
                </div>

                {/* 2. Job Type Select Filter - Span 3 columns */}
                <div className="md:col-span-3">
                    <span className="text-sm font-medium text-gray-300 block mb-2">Work Type</span>
                    <Select
                        aria-label="Work Type"
                        value={selectedWorkType}
                        onChange={(key) => setSelectedWorkType(key)}
                    >
                        <Select.Trigger className="w-full flex items-center justify-between border border-white/10 bg-white/[0.04] hover:border-[#0DFFCA]/40 rounded-xl py-2.5 px-4 text-sm font-normal text-white transition-all">
                            <Select.Value className="capitalize text-white" />
                            <Select.Indicator>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </Select.Indicator>
                        </Select.Trigger>

                        <Select.Popover className="bg-[#091528] border border-white/10 rounded-xl shadow-2xl mt-1 overflow-hidden z-50">
                            <ListBox aria-label="Work Type Options" className="p-1 outline-none">
                                <ListBox.Item id="all" textValue="All Types" className="text-gray-200 hover:bg-[#0DFFCA]/15 hover:text-[#0DFFCA] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    All Types
                                </ListBox.Item>
                                <ListBox.Item id="remote" textValue="Remote" className="text-gray-200 hover:bg-[#0DFFCA]/15 hover:text-[#0DFFCA] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    Remote
                                </ListBox.Item>
                                <ListBox.Item id="on-site" textValue="On-site" className="text-gray-200 hover:bg-[#0DFFCA]/15 hover:text-[#0DFFCA] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    On-site
                                </ListBox.Item>
                                <ListBox.Item id="hybrid" textValue="Hybrid" className="text-gray-200 hover:bg-[#0DFFCA]/15 hover:text-[#0DFFCA] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    Hybrid
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* 3. Commitment Select Filter - Span 3 columns */}
                <div className="md:col-span-3">
                    <span className="text-sm font-medium text-gray-300 block mb-2">Commitment</span>
                    <Select
                        aria-label="Commitment"
                        value={selectedCommitment}
                        onChange={(key) => setSelectedCommitment(key)}
                    >
                        <Select.Trigger className="w-full flex items-center justify-between border border-white/10 bg-white/[0.04] hover:border-[#0DFFCA]/40 rounded-xl py-2.5 px-4 text-sm font-normal text-white transition-all">
                            <Select.Value className="capitalize text-white" />
                            <Select.Indicator>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </Select.Indicator>
                        </Select.Trigger>

                        <Select.Popover className="bg-[#091528] border border-white/10 rounded-xl shadow-2xl mt-1 overflow-hidden z-50">
                            <ListBox aria-label="Commitment Options" className="p-1 outline-none">
                                <ListBox.Item id="all" textValue="All Commitments" className="text-gray-200 hover:bg-[#0DFFCA]/15 hover:text-[#0DFFCA] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    All Commitments
                                </ListBox.Item>
                                <ListBox.Item id="full-time" textValue="Full-time" className="text-gray-200 hover:bg-[#0DFFCA]/15 hover:text-[#0DFFCA] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    Full-time
                                </ListBox.Item>
                                <ListBox.Item id="part-time" textValue="Part-time" className="text-gray-200 hover:bg-[#0DFFCA]/15 hover:text-[#0DFFCA] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    Part-time
                                </ListBox.Item>
                                <ListBox.Item id="contract" textValue="Contract" className="text-gray-200 hover:bg-[#0DFFCA]/15 hover:text-[#0DFFCA] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    Contract
                                </ListBox.Item>
                                <ListBox.Item id="internship" textValue="Internship" className="text-gray-200 hover:bg-[#0DFFCA]/15 hover:text-[#0DFFCA] rounded-lg px-3 py-2 text-sm cursor-pointer capitalize">
                                    Internship
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

            </div>
        </div>
    );
}