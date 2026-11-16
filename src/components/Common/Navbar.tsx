'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FaBagShopping,
    FaMagnifyingGlass,
    FaUser,
    FaHeart,
    FaBasketShopping,
    FaBars,
    FaXmark
} from 'react-icons/fa6';
import staticData from '@/data/staticData.json';
import MobileMenu from './MobileMenu';
import { NavLinkItem } from '@/data/types';

interface StaticDataType {
    announcements: string[];
    navLinks: NavLinkItem[];
    trustPillars: {
        title: string;
        description: string;
        icon: string;
    }[];
}
const data = staticData as StaticDataType;

export default function Navbar() {
    const pathname = usePathname();
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            setIsSearchOpen(false);
        }
    };

    return (
        <>
            {/* Top Announcement Bar */}
            <div className="bg-[#0e3a20] text-white text-xs py-2 px-4 border-b border-green-800">
                <div className="max-w-7xl xl:container mx-auto flex flex-wrap justify-between items-center gap-2">
                    <div className="flex items-center space-x-4 mx-auto md:mx-0 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
                        <span>{data.announcements[0]}</span>
                        <span className="hidden sm:inline text-green-700">|</span>
                        <span>{data.announcements[1]}</span>
                        <span className="hidden md:inline text-green-700">|</span>
                        <span>{data.announcements[2]}</span>
                    </div>
                    <div className="hidden lg:flex items-center space-x-4 text-slate-200">
                        <a href="tel:+8801700000000" className="hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                            <span className="text-emerald-400 font-bold">24/7 Support:</span> +880 1700-000000
                        </a>
                        <span>|</span>
                        <span className="font-medium tracking-wide">BDT (৳)</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl xl:container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

                    {/* Left: Logo & Desktop Nav Links */}
                    <div className="flex items-center gap-8">
                        <Link
                            href="/"
                            onClick={handleLogoClick}
                            className="flex items-center gap-2.5 group cursor-pointer shrink-0"
                        >
                            <div className="w-10 h-10 rounded-xl bg-[#14532d] flex items-center justify-center text-white text-xl shadow-md">
                                <FaBagShopping />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                                    Shoppy<span className="text-[#14532d]">BD</span>
                                </span>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-0.5">শপিবডি • Direct Imports</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-700">
                            {data.navLinks.map((link, idx) => {
                                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

                                return (
                                    <Link
                                        key={idx}
                                        href={link.href}
                                        className={`transition-colors relative pb-1 ${isActive
                                            ? 'text-[#14532d] font-semibold border-b-2 border-[#14532d]'
                                            : 'hover:text-[#14532d]'
                                            } ${link.highlight ? 'text-amber-600 font-semibold' : ''}`}
                                    >
                                        {link.name}
                                        {link.badge && (
                                            <span className="ml-1.5 text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">
                                                {link.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Right: Actions (Inline Search Bar & Icons) */}
                    <div className="flex items-center gap-1.5 sm:gap-3 text-slate-700">

                        {/* Inline Expandable Search Bar */}
                        <div className={`flex items-center transition-all duration-300 ease-in-out ${isSearchOpen
                            ? 'w-44 sm:w-64 md:w-72 bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5'
                            : 'w-10'
                            }`}>
                            {isSearchOpen ? (
                                <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
                                    <FaMagnifyingGlass className="text-slate-400 text-sm shrink-0 mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                        className="w-full bg-transparent outline-none text-xs sm:text-sm text-slate-800 placeholder-slate-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            setSearchQuery('');
                                        }}
                                        className="text-slate-400 hover:text-slate-700 ml-1 p-1"
                                    >
                                        <FaXmark className="text-sm" />
                                    </button>
                                </form>
                            ) : (
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    aria-label="Open Search"
                                    className="p-2 w-full h-full flex items-center justify-center hover:text-[#14532d] transition-colors rounded-full hover:bg-slate-100"
                                >
                                    <FaMagnifyingGlass className="text-base sm:text-lg" />
                                </button>
                            )}
                        </div>

                        <Link href="/login" className="p-2 hover:text-[#14532d] transition-colors rounded-full hover:bg-slate-100 hidden sm:flex" title="Account / OTP Login">
                            <FaUser className="text-lg" />
                        </Link>

                        <Link href="/wishlist" className="p-2 hover:text-[#14532d] transition-colors rounded-full hover:bg-slate-100 relative" title="Wishlist">
                            <FaHeart className="text-lg" />
                            <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
                        </Link>

                        <Link href="/cart" className="flex items-center gap-1.5 sm:gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 sm:px-3.5 rounded-full transition-all text-sm font-semibold">
                            <div className="relative">
                                <FaBasketShopping className="text-base text-[#14532d]" />
                                <span className="absolute -top-2 -right-2 bg-[#14532d] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
                            </div>
                            <span className="hidden sm:inline text-xs font-bold text-slate-900">৳2,340</span>
                        </Link>

                        {/* Mobile Menu Hamburger Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Toggle Menu"
                            className="lg:hidden p-2 text-slate-700 hover:text-[#14532d] rounded-full hover:bg-slate-100 transition-colors"
                        >
                            <FaBars className="text-xl" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Separated Mobile Menu Component */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                pathname={pathname}
                navLinks={data.navLinks}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearchSubmit={handleSearchSubmit}
            />
        </>
    );
}