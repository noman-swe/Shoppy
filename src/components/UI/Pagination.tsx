'use client';

import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-200">
            {/* Previous Button */}
            <button
                onClick={() => {
                    onPageChange(Math.max(currentPage - 1, 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-medium flex items-center gap-1"
            >
                <FaChevronLeft className="text-[10px]" /> Prev
            </button>

            {/* Page Number Buttons */}
            <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                        key={number}
                        onClick={() => {
                            onPageChange(number);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${currentPage === number
                                ? 'bg-[#14532d] text-white shadow-md shadow-green-900/10'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        {number}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => {
                    onPageChange(Math.min(currentPage + 1, totalPages));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-medium flex items-center gap-1"
            >
                Next <FaChevronRight className="text-[10px]" />
            </button>
        </div>
    );
}