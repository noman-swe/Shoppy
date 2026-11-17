'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import demoProducts from '@/data/demoProducts.json';
import ProductCard from '@/components/Common/ProductCard';
import ShopFilters from '@/components/Shop/ShopFilters';

import { useFilteredProducts } from '@/utils/useFilteredProducts';
import { FilterState, Product } from '@/data/types';
import { FaFilter, FaSliders } from 'react-icons/fa6';
import Pagination from '@/components/UI/Pagination';

function ShopContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'all';
    const initialType = searchParams.get('type') || '';
    const initialDeal = searchParams.get('deal') || '';

    const [filters, setFilters] = useState<FilterState>({
        category: initialCategory,
        badge: initialType || (initialDeal === 'flash' ? 'flash' : ''),
        minPrice: 0,
        maxPrice: 5000,
        sortBy: 'default',
        search: '',
    });

    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    const filteredProducts = useFilteredProducts(demoProducts as Product[], filters);

    // [Fix for Cascading Renders]: useEffect এর পরিবর্তে রেন্ডার ফেজে ফিল্টার পরিবর্তনের ওপর ভিত্তি করে পেজ রিসেট করা
    const [prevFilters, setPrevFilters] = useState(filters);
    if (filters !== prevFilters) {
        setPrevFilters(filters);
        setCurrentPage(1);
    }

    // Pagination Calculation
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const resetFilters = () => {
        setFilters({
            category: 'all',
            badge: '',
            minPrice: 0,
            maxPrice: 5000,
            sortBy: 'default',
            search: '',
        });
        setCurrentPage(1);
    };

    return (
        <div className="max-w-7xl xl:container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Shop All Gadgets</h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Discover curated Chinese imports and ready stock items in Bangladesh.
                    </p>
                </div>

                {/* Sorting Dropdown & Mobile Filter Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                        className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors"
                    >
                        <FaFilter className="text-[#14532d]" /> Filters
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Sort By:</span>
                        <select
                            value={filters.sortBy}
                            onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
                            className="bg-white border border-slate-200 text-xs font-semibold rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#14532d]"
                        >
                            <option value="default">Featured & Popular</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Main Layout Grid - items-start ensures sticky sidebar works properly */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Desktop Sidebar Filters with Sticky */}
                <div className="hidden lg:block lg:col-span-3 sticky top-24">
                    <ShopFilters filters={filters} setFilters={setFilters} onReset={resetFilters} />
                </div>

                {/* Mobile Filter Drawer */}
                {isMobileFilterOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden flex">
                        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setIsMobileFilterOpen(false)} />
                        <div className="relative ml-auto w-full max-w-xs bg-white h-full p-5 overflow-y-auto shadow-2xl">
                            <ShopFilters filters={filters} setFilters={setFilters} onReset={resetFilters} />
                        </div>
                    </div>
                )}

                {/* Product Grid & Pagination Area */}
                <div className="lg:col-span-9 space-y-8">
                    {currentProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {currentProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Reusable Pagination Component */}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </>
                    ) : (
                        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <FaSliders className="text-4xl text-slate-300 mx-auto mb-3" />
                            <h3 className="text-base font-bold text-slate-800">No Products Found</h3>
                            <p className="text-xs text-slate-500 mt-1">Try resetting your filter parameters or search term.</p>
                            <button
                                onClick={resetFilters}
                                className="mt-4 px-4 py-2 bg-[#14532d] text-white text-xs font-semibold rounded-xl hover:bg-green-800 transition-colors"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="p-10 text-center text-sm font-semibold text-slate-500">Loading Shop...</div>}>
            <ShopContent />
        </Suspense>
    );
}