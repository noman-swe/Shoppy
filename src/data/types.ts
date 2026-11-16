export interface NavLinkItem {
  name: string;
  href: string;
  active?: boolean;
  highlight?: boolean;
  badge?: string;
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
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isHot?: boolean;
}
