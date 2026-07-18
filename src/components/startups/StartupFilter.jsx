'use client';

import React from "react";
import { TextField, InputGroup } from "@heroui/react";
import { Magnifier } from "@gravity-ui/icons";

export default function StartupFilters({
    searchQuery,
    setSearchQuery,
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            <div className="md:col-span-7">
                {/* Left side spacing or filter placeholders */}
            </div>

            <div className="md:col-span-5">
                <TextField
                    value={searchQuery}
                    onChange={(value) => setSearchQuery(value)}
                    className="w-full"
                    aria-label="Search Startups" // Resolves the accessibility warning
                >
                    <span className="text-sm font-medium text-zinc-400 block mb-2">Search Startups</span>
                    <InputGroup className="border-zinc-700 focus-within:border-purple-500 rounded-xl transition-all">
                        <InputGroup.Prefix className="pl-3 text-zinc-500">
                            <Magnifier className="w-4 h-4" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                            placeholder="Startup name or Industry..."
                            className="bg-transparent placeholder-zinc-500 text-sm py-2.5 px-3 outline-none w-full"
                        />
                    </InputGroup>
                </TextField>
            </div>

        </div>
    );
}