import React from "react";
import { Link } from "@heroui/react";
import { Globe, AtSign, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f0f5ff] pt-16 pb-12 px-6 border-t border-gray-200/50">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        
        {/* Column 1: Logo & Copyright */}
        <div className="flex flex-col">
          <span className="text-[#002447] font-bold text-lg tracking-tight">
            Startup<span className="text-[#107064]">Forge</span>
          </span>
          <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-[240px]">
            © 2026 StartupForge. Building the next generation of founders.
          </p>
        </div>

        {/* Column 2: Platform Quick Links */}
        <div className="flex flex-col">
          <span className="text-[#002447] font-bold text-sm tracking-wide mb-4">
            Platform
          </span>
          <div className="flex flex-col space-y-3">
            <Link href="/" className="text-gray-500 hover:text-[#0f6c61] text-sm transition-colors w-fit">
              Home
            </Link>
            <Link href="/startups" className="text-gray-500 hover:text-[#0f6c61] text-sm transition-colors w-fit">
              Browse Startups
            </Link>
            <Link href="/careers" className="text-gray-500 hover:text-[#0f6c61] text-sm transition-colors w-fit">
              Careers
            </Link>
          </div>
        </div>

        {/* Column 3: Legal Quick Links */}
        <div className="flex flex-col">
          <span className="text-[#002447] font-bold text-sm tracking-wide mb-4">
            Legal
          </span>
          <div className="flex flex-col space-y-3">
            <Link href="/privacy" className="text-gray-500 hover:text-[#0f6c61] text-sm transition-colors w-fit">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-[#0f6c61] text-sm transition-colors w-fit">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Column 4: Connect / Contact Information & Socials */}
        <div className="flex flex-col">
          <span className="text-[#002447] font-bold text-sm tracking-wide mb-4">
            Connect
          </span>
          <Link href="/contact" className="text-gray-500 hover:text-[#0f6c61] text-sm transition-colors mb-4 w-fit">
            Contact Us
          </Link>
          
          {/* Social Links Grid matched exactly to layout options */}
          <div className="flex items-center gap-4 text-gray-700">
            <Link href="https://startupforge.com" isExternal className="text-gray-700 hover:text-[#0f6c61] transition-colors">
              <Globe size={18} strokeWidth={2} />
            </Link>
            <Link href="mailto:info@startupforge.com" className="text-gray-700 hover:text-[#0f6c61] transition-colors">
              <AtSign size={18} strokeWidth={2} />
            </Link>
            <Link href="#" className="text-gray-700 hover:text-[#0f6c61] transition-colors">
              <Share2 size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}