'use client';

import React from 'react';
import categories from '@/data/categories.json';
import { FilterState } from '@/data/types';
import { FaRotateLeft } from 'react-icons/fa6';

interface ShopFiltersProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    onReset: () => void;
}

export default function ShopFilters({ filters, setFilters, onReset }: ShopFiltersProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Filter Products</h3>
                <button
                    onClick={onReset}
                    className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium transition-colors"
                >
                    <FaRotateLeft className="text-[10px]" /> Reset All
                </button>
            </div>

            {/* Categories */}
            <div>
                <h4 className="font-semibold text-xs text-slate-800 uppercase tracking-wider mb-3">Categories</h4>
                <div className="space-y-1.5">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilters((prev) => ({ ...prev, category: cat.slug }))}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${filters.category === cat.slug
                                    ? 'bg-emerald-50 text-[#14532d] font-semibold'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <span>{cat.name}</span>
                            <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{cat.count}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Stock Type Filter */}
            {/* <div>
                <h4 className="font-semibold text-xs text-slate-800 uppercase tracking-wider mb-3">Availability</h4>
                <div className="space-y-2 text-xs font-medium text-slate-600">
                    {[
                        { label: 'All Items', value: '' },
                        { label: 'Ready Stock (Dhaka)', value: 'ready' },
                        { label: 'Pre-Order (China Direct)', value: 'pre-order' },
                    ].map((item) => (
                        <label key={item.value} className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900">
                            <input
                                type="radio"
                                name="stockType"
                                checked={filters.badge === item.value}
                                onChange={() => setFilters((prev) => ({ ...prev, badge: item.value }))}
                                className="w-4 h-4 text-[#14532d] focus:ring-[#14532d] border-slate-300"
                            />
                            <span>{item.label}</span>
                        </label>
                    ))}
                </div>
            </div> */}

            {/* Price Range */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-xs text-slate-800 uppercase tracking-wider">Price Range</h4>
                    <span className="text-xs font-bold text-[#14532d]">৳{filters.maxPrice}</span>
                </div>
                <input
                    type="range"
                    min="400"
                    max="5000"
                    step="100"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                    className="w-full accent-[#14532d] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>৳400</span>
                    <span>৳5,000</span>
                </div>
            </div>
        </div>
    );
}