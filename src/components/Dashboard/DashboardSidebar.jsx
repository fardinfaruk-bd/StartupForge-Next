"use client";

import { usePathname } from "next/navigation";
import { Gear, LayoutSideContentLeft, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { LayoutGrid, List, User, Rocket, PlusCircle, Layers, CreditCard, ShieldUser, ArrowLeftRight, User2, LogOut } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export function DashboardSidebar() {
    const pathname = usePathname();

    const { data: session, isPending } = useSession()
    
    const contributorNavItems = [
        { icon: LayoutGrid, label: "Overview", href: "/dashboard/contributor" },
        { icon: List, label: "My Applications", href: "/dashboard/contributor/applications" },
        { icon: User, label: "Profile", href: "/dashboard/contributor/profile" },
    ];

    const founderNavItems = [
        { icon: LayoutGrid, label: "Overview", href: "/dashboard/founder" },
        { icon: Rocket, label: "My Startup", href: "/dashboard/founder/startup" },
        { icon: PlusCircle, label: "Add Opportunity", href: "/dashboard/founder/add_opportunity" },
        { icon: Layers, label: "Manage Opportunities", href: "/dashboard/founder/manage_opportunity" },
        { icon: User2, label: "Applications", href: "/dashboard/founder/applications" },
    ];

    
    const adminNavItems = [
        { icon: LayoutGrid, label: "Overview", href: "/dashboard/admin" },
        { icon: ShieldUser, label: "Manage Users", href: "/dashboard/admin/users" },
        { icon: Rocket, label: "Manage Startups", href: "/dashboard/admin/startups" },
        { icon: Layers, label: "Manage Opportunities", href: "/dashboard/admin/opportunities" },
        { icon: CreditCard, label: "Transactions", href: "/dashboard/admin/transactions" },
    ];


    const navLinkMap = {
        contributor: contributorNavItems,
        founder: founderNavItems,
        admin: adminNavItems
    }
    const navLinks = navLinkMap[session?.user?.role || "contributor"];

    const bottomNavItems = [
        { icon: LogOut, label: "Logout", href: "/logout" },
    ];

    const renderNavItems = (items) => (
        <div className="flex flex-col gap-1.5">
            {items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`group relative flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 w-full text-left overflow-hidden
                            ${isActive
                                ? "bg-[#76f1cc] text-[#0a1220] font-semibold shadow-lg shadow-[#76f1cc]/10"
                                : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-100"
                            }`}
                    >
                        {/* Hidden indicator that slides in/becomes visible if active */}
                        {isActive && (
                            <span className="absolute left-0 top-1/4 h-1/2 w-1 rounded-r-full bg-[#0a1220]/80" />
                        )}

                        <Icon className={`size-5 shrink-0 transition-transform duration-200 group-hover:scale-105
                            ${isActive ? "text-[#0a1220]" : "text-slate-400 group-hover:text-slate-200"}`}
                        />

                        <span className="relative z-10">{item.label}</span>
                    </Link>
                );
            })}
        </div>
    );

    const navContent = (
        <div className="flex h-full flex-col justify-between bg-[#0a1220] text-white p-6 select-none">
            {/* Top Branding & Nav */}
            <div className="flex flex-col gap-8">
                {/* Branding Block */}
                <div className="px-2">
                    <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#76f1cc] to-emerald-300 bg-clip-text text-transparent">
                        StartupForge
                    </h2>
                    <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">
                        {session?.user?.role} Portal
                    </p>
                </div>

                {/* Main Navigation */}
                <nav className="px-0.5">{renderNavItems(navLinks)}</nav>
            </div>

            {/* Bottom Nav Section */}
            <div className="flex flex-col gap-4 px-0.5">
                <hr className="border-slate-800/60 mx-2" />
                <nav>{renderNavItems(bottomNavItems)}</nav>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar Sidebar */}
            <aside className="hidden  w-64 shrink-0 border-r border-slate-900 bg-[#0a1220] lg:block">
                {navContent}
            </aside>

            {/* Mobile Drawer */}
            <div className="p-4 lg:hidden bg-[#0a1220] flex items-center border-b border-slate-900">
                <Drawer>
                    <Button
                        variant="light"
                        size="sm"
                        className="text-slate-300 hover:bg-slate-800/50 min-w-10 p-2"
                    >
                        <LayoutSideContentLeft className="size-5" />
                    </Button>
                    <Drawer.Backdrop>
                        <Drawer.Content placement="left" className="p-0 bg-[#0a1220] w-80">
                            <Drawer.Dialog className="h-full border-0">
                                <Drawer.CloseTrigger className="text-slate-400 hover:text-white absolute right-4 top-4 z-50 transition-colors" />
                                <Drawer.Body className="p-0 h-full">
                                    {navContent}
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </>
    );
}