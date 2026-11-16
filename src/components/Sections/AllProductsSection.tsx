"use client";

import { useState, useEffect, useRef } from 'react';
import ProductCard from '../Common/ProductCard';
import { Product } from '@/data/types';


interface AllProductsSectionProps {
  products: Product[];
}

export default function AllProductsSection({ products = [] }: AllProductsSectionProps) {
  const PAGE_SIZE = 12; // প্রতিবারে কয়টি করে প্রোডাক্ট লোড হবে
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const displayedProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  // hook for infinite scroll
  useEffect(() => {
    if (!hasMore) return;

    const currentObserverRef = loadMoreRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, products.length));
            setIsLoading(false);
          }, 400);
        }
      },
      { threshold: 0.1 }
    );

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [hasMore, isLoading, products.length]);

  return (
    <section id="all-products" className="max-w-7xl xl:container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">All Products</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Hand-tested high rated Chinese gadgets ready in Dhaka or direct flight dispatch
          </p>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Showing {displayedProducts.length} of {products.length} products
        </div>
      </div>

      {/*products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* infinite scroll with loading indicator */}
      {hasMore && (
        <div ref={loadMoreRef} className="py-10 text-center flex justify-center items-center">
          {isLoading ? (
            <div className="inline-flex items-center space-x-2 text-sm text-emerald-600 font-medium">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading more gadgets...
            </div>
          ) : (
            <span className="text-xs text-slate-400">Scroll down for more</span>
          )}
        </div>
      )}
    </section>
  );
}