"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLinks = ({href, children}) => {
    const pathname = usePathname();
    
    const isActive = pathname === href;
    return (
        <Link href={href} className={`text-sm font-medium transition-colors no-underline ${isActive
                                ? "text-[#002447] font-semibold border-b-2 border-[#107064] pb-1 rounded-none"
                                : "text-[#4a5568] hover:text-[#002447]"
                                }`}>
            {children}
        </Link>
    );
};

export default NavLinks;