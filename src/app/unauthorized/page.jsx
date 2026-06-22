"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { ShieldAlert, Home } from "lucide-react";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen antialiased flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 selection:bg-red-500/20">
            <div className="max-w-md w-full text-center space-y-8 relative">

                {/* Ambient Background Radial Glow */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* 1. Technical Illustration */}
                <div className="flex justify-center relative">
                    <div className="w-24 h-24 rounded-3xl bg-red-950/30 border border-red-800/40 flex items-center justify-center text-red-400 shadow-xl shadow-red-950/20 animate-pulse">
                        <ShieldAlert className="w-12 h-12 stroke-[1.5]" />
                    </div>

                    {/* Decorative scanner particles */}
                    <div className="absolute top-2 right-1/3 w-2 h-2 rounded-full bg-red-500/40 animate-ping" />
                    <div className="absolute bottom-1 left-1/3 w-1.5 h-1.5 rounded-full bg-zinc-700" />
                </div>

                {/* 2. Error Message */}
                <div className="space-y-3">
                    <span className="text-xs font-mono font-bold tracking-widest text-red-500 uppercase bg-red-200/50 border border-red-900/60 px-3 py-1 rounded-full inline-block">
                        Error Code: 403 Forbidden
                    </span>
                    <h1 className="text-3xl font-black tracking-tight sm:text-4xl ">
                        Access Denied
                    </h1>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
                        Your identity profile or session parameters do not possess the authorization tokens required to map this route.
                    </p>
                </div>



                {/* 3. Navigation Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <Link href="/">
                        <Button
                            color="default"
                            variant="solid"
                            radius="xl"
                            className="w-full sm:w-auto bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold text-sm h-11 px-6 shadow-md shadow-zinc-950/10"

                        >
                            <div className="flex justify-center items-center gap-2">
                                <Home className="w-4 h-4 text-zinc-900" />
                                <p>Back Home</p>
                            </div>
                        </Button>
                    </Link>


                </div>

            </div>
        </div>
    );
}