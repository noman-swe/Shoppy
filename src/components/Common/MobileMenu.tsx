'use client';

import React from 'react';
import Link from 'next/link';
import {
    FaBagShopping,
    FaMagnifyingGlass,
    FaUser,
    FaXmark,
    FaPhone,
    FaChevronRight
} from 'react-icons/fa6';
import { NavLinkItem } from '@/data/types';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    pathname: string;
    navLinks: NavLinkItem[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSearchSubmit: (e: React.FormEvent) => void;
}

export default function MobileMenu({
    isOpen,
    onClose,
    pathname,
    navLinks,
    searchQuery,
    setSearchQuery,
    onSearchSubmit,
}: MobileMenuProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Sliding Drawer */}
            <div className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out">

                {/* Drawer Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#14532d] flex items-center justify-center text-white text-sm">
                            <FaBagShopping />
                        </div>
                        <span className="font-bold text-slate-900 text-lg">Shoppy<span className="text-[#14532d]">BD</span></span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-full transition-colors"
                        aria-label="Close Menu"
                    >
                        <FaXmark className="text-xl" />
                    </button>
                </div>

                {/* Mobile Search inside Drawer */}
                <div className="p-4 border-b border-slate-100 bg-white">
                    <form onSubmit={(e) => { onSearchSubmit(e); onClose(); }} className="flex items-center bg-slate-100 rounded-xl px-3 py-2 border border-slate-200">
                        <FaMagnifyingGlass className="text-slate-400 text-sm mr-2.5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
                        />
                    </form>
                </div>

                {/* Drawer Links Navigation */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5">
                    {navLinks.map((link, idx) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={idx}
                                href={link.href}
                                onClick={onClose}
                                className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-colors ${isActive
                                        ? 'bg-emerald-50 text-[#14532d] font-semibold'
                                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#14532d]'
                                    } ${link.highlight ? 'text-amber-600 font-semibold' : ''}`}
                            >
                                <span className="flex items-center gap-2">
                                    {link.name}
                                    {link.badge && (
                                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">
                                            {link.badge}
                                        </span>
                                    )}
                                </span>
                                <FaChevronRight className="text-xs text-slate-400" />
                            </Link>
                        );
                    })}

                    <div className="pt-2 border-t border-slate-100 my-2"></div>

                    <Link
                        href="/login"
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#14532d] transition-colors"
                    >
                        <span className="flex items-center gap-2.5">
                            <FaUser className="text-[#14532d]" /> Account / Login
                        </span>
                        <FaChevronRight className="text-xs text-slate-400" />
                    </Link>
                </div>

                {/* Drawer Footer / Support Info */}
                <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-600 flex flex-col gap-2">
                    <div className="flex items-center justify-between font-medium">
                        <span>Currency: BDT (৳)</span>
                    </div>
                    <a href="tel:+8801700000000" className="flex items-center gap-2 text-[#14532d] font-semibold bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                        <FaPhone className="text-xs" />
                        <span>Support: +880 1700-000000</span>
                    </a>
                </div>

            </div>
        </div>
    );
}