"use client";

import { useMemo } from "react";
import { Product, FilterState } from "@/data/types";

export function useFilteredProducts(products: Product[], filters: FilterState) {
  return useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (
          filters.category &&
          filters.category !== "all" &&
          product.category !== filters.category
        ) {
          return false;
        }

        // Badge / Type filter (Ready Stock / Pre-Order / Flash)
        if (filters.badge) {
          if (filters.badge === "ready" && product.badge !== "Ready Stock")
            return false;
          if (filters.badge === "pre-order" && product.badge !== "Pre-Order")
            return false;
          if (filters.badge === "flash" && !product.isFeatured) return false;
        }

        // Price filter
        if (
          product.price < filters.minPrice ||
          product.price > filters.maxPrice
        ) {
          return false;
        }

        // Search query filter
        if (
          filters.search &&
          !product.title.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-low") return a.price - b.price;
        if (filters.sortBy === "price-high") return b.price - a.price;
        if (filters.sortBy === "rating") return b.rating - a.rating;
        return 0; // Default ordering
      });
  }, [products, filters]);
}
