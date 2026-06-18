import React from 'react';

const AuthLeftUi = () => {
    return (
        <div className="relative hidden w-1/2 overflow-hidden bg-zinc-900 lg:block">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-purple-700 to-pink-600 opacity-80" />
            <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-pink-500/30 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[32px_32px]" />

            <div className="relative flex h-full flex-col justify-between p-12 text-white">
                <div className="flex items-center gap-2 font-bold text-xl tracking-wider">
                    <div className="h-6 w-6 rounded-lg bg-white text-zinc-900 flex items-center justify-center font-black text-sm">S</div>
                    STARTUPFORGE
                </div>
                <div className="max-w-md space-y-4">
                    <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
                        Build your next big idea faster than ever.
                    </h2>
                    <p className="text-zinc-200 text-medium leading-relaxed">
                        Join thousands of developers launching production-ready Next.js architectures using advanced styling frameworks.
                    </p>
                </div>
                <div className="text-sm text-zinc-400">
                    © 2026 StartupForge Inc. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default AuthLeftUi;