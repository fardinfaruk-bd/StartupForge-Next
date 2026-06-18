"use client";

import React, { useState } from "react";
import { Button, Link } from "@heroui/react";
import { Bars } from "@gravity-ui/icons";
import NavLinks from "./NavLinks";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "Browse Startups", href: "/startups" },
        { label: "Browse Opportunities", href: "/opportunities"},
    ];

    return (
        <nav className="w-full bg-[#f5f8ff] border-b border-gray-200 sticky top-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* LEFT: Brand Logo */}
                <div className="flex items-center">
                    <Link href="/" className="font-bold text-xl text-[#002447] tracking-tight no-underline">
                        Startup<span className="text-[#107064]">Forge</span>
                    </Link>
                </div>

                {/* CENTER: Navigation Links (Desktop only) */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <NavLinks key={index} href={link.href}>{link.label} </NavLinks>
                    ))}
                </div>

                {/* RIGHT: Desktop Auth Actions & Mobile Hamburger */}
                <div className="flex items-center gap-4">
                    {/* Auth Actions (Hidden on mobile) */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login">
                            <Button
                                variant="secondary"
                                className="w-full text-sm font-medium text-[#002447] rounded-lg border-gray-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button
                                variant="primary"
                                className="w-full bg-[#0f6c61] text-white font-medium py-3 rounded-lg text-sm"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Register
                            </Button>
                        </Link>
                    </div>

                    {/* Hamburger Icon for Mobile (Toggles state) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-[#002447] hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Toggle Menu"
                    >
                        <Bars className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* MOBILE DROPDOWN MENU */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#f5f8ff] border-b border-gray-200 py-6 px-6 flex flex-col gap-5 shadow-md z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col gap-3">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className={`text-lg py-1 no-underline ${link.isActive ? "text-[#0f6c61] font-bold" : "text-[#4a5568]"
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <hr className="border-gray-200 my-1" />

                    {/* Mobile Auth Actions (Stacked inside dropdown) */}
                    <div className="flex flex-col gap-3">
                        <Link href="/login">
                            <Button
                                variant="secondary"
                                className="w-full text-sm font-medium text-[#002447] border-gray-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button
                                variant="primary"
                                className="w-full bg-[#0f6c61] text-white font-medium py-3 rounded-lg text-sm"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Register
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}