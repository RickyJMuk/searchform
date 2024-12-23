export interface Product {
  id: string;
  title: string;
  url: string;
  description: string;
  vendor: string;
  imageUrl: string;
  rating: number | null;
  reviewsCount: number;
  priceUsd: number | null;
  priceKsh: number | null;
}

export interface SearchCriteria {
  productName: string;
  specifications: string;
  minPrice: number;
  maxPrice: number;
}