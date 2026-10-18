"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    Avatar,
    Button,
    Dropdown,
    Link,
    Spinner
} from "@heroui/react";
import { Bars } from "@gravity-ui/icons";
import NavLinks from "./NavLinks";
import { signOut, useSession } from "@/lib/auth-client";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session, isPending } = useSession();

    const user = session?.user;
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.refresh();

    };

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Browse Startups", href: "/startups" },
        { label: "Browse Opportunities", href: "/opportunities" },
    ];

    const dashboardLinks = {
        contributor: "/dashboard/contributor",
        founder: "/dashboard/founder",
        admin: "/dashboard/admin",
    }

    if(user?.email){
        navLinks.push({
            label: "Dashboard",
            href: dashboardLinks[user.role || "contributor"],
        });
    }

    if(user?.role === "founder"){
        navLinks.push({
            label: "Plans",
            href: "/plans",
        })
    }

    return (
        <nav
            className="w-full border-b sticky top-0 z-50 px-6 py-3"
            style={{
                background: "rgba(3,12,27,0.85)",
                borderColor: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
            }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* LEFT: Brand Logo */}
                <div className="flex items-center">
                    <Link href="/" className="font-bold text-xl text-white tracking-tight no-underline">
                        Startup<span style={{ color: "#0DFFCA" }}>Forge</span>
                    </Link>
                </div>

                {/* CENTER: Navigation Links (Desktop only) */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <NavLinks key={index} href={link.href}>
                            {link.label}
                        </NavLinks>
                    ))}
                </div>

                {/* RIGHT: Auth Actions & Mobile Hamburger */}
                <div className="flex items-center gap-3">
                    {isPending ? (
                        <Spinner size="sm" color="primary" />
                    ) : user ? (
                        <div className="flex items-center gap-3">

                            {/* FIXED DROPDOWN ANATOMY */}
                    <h1 className="hidden md:block font-semibold text-gray-300">Hi! <strong className="text-white">{user?.name}</strong></h1>
                            <Dropdown placement="bottom end">
                                <Dropdown.Trigger>
                                    <Avatar>
                                        <Avatar.Image
                                            referrerPolicy="no-referrer"
                                            alt={user?.name}
                                            src={user?.image}
                                        />
                                        <Avatar.Fallback>
                                            {user?.name?.charAt(0)}
                                        </Avatar.Fallback>
                                    </Avatar>
                                </Dropdown.Trigger>
                                <Dropdown.Popover>
                                    <Dropdown.Menu aria-label="Profile Actions">
                                        <Dropdown.Item id="profile" textValue="Profile" className="p-0">
                                            <Link href="/profile" className="flex w-full px-3 py-2 font-medium text-zinc-700 no-underline">
                                                Profile
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            id="logout"
                                            color="danger"
                                            className="text-danger font-medium px-3 py-2"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown>

                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-3">
                            <Link href="/login">
                                <Button
                                    variant="secondary"
                                    className="font-semibold rounded-xl shadow-sm"
                                    style={{ background: "rgba(255,255,255,0.08)", color: "white", borderColor: "rgba(255,255,255,0.15)" }}
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button
                                    className="font-semibold rounded-xl"
                                    style={{ background: "#0DFFCA", color: "#030C1B", boxShadow: "0 0 18px rgba(13,255,202,0.3)" }}
                                >
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Hamburger Trigger */}
                    <Button
                        isIconOnly
                        variant="light"
                        className="md:hidden"
                        style={{ color: "white" }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        <Bars size={20} />
                    </Button>
                </div>
            </div>

            {/* MOBILE DROPDOWN MENU */}
            {isMenuOpen && (
                <div
                    className="md:hidden absolute top-full left-0 w-full border-b py-5 px-6 flex flex-col gap-4 shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                        background: "rgba(3,12,27,0.97)",
                        borderColor: "rgba(255,255,255,0.07)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link, index) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className={`text-base py-2 px-1 transition-colors no-underline ${
                                        isActive ? "font-bold" : "text-gray-400 hover:text-white"
                                    }`}
                                    style={isActive ? { color: "#0DFFCA" } : {}}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {!user && (
                        <>
                            <hr className="border-zinc-200 my-1" />
                            <div className="flex flex-col gap-2.5">
                                <Button
                                    as={Link}
                                    href="/login"
                                    variant="bordered"
                                    className="w-full text-sm font-semibold rounded-xl"
                                    style={{ borderColor: "rgba(255,255,255,0.15)", color: "white", background: "rgba(255,255,255,0.05)" }}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Button>
                                <Button
                                    as={Link}
                                    href="/register"
                                    className="w-full font-semibold rounded-xl text-sm"
                                    style={{ background: "#0DFFCA", color: "#030C1B" }}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Register
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}