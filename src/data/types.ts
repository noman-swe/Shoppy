export interface NavLinkItem {
  name: string;
  href: string;
  active?: boolean;
  highlight?: boolean;
  badge?: string;
}
export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}
export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice: number;
  badge: string;
  badgeColor: string;
  rating: number;
  reviewsCount: number;
  image: string;
  category?: string;
  description?: string;
  features?: string[];
  inStock?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isHot?: boolean;
}
export interface FilterState {
  category: string;
  badge: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  search: string;
}
