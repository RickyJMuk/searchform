import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Product, SearchCriteria } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  searchCriteria: SearchCriteria | null;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading, searchCriteria }) => {
  const [recommendedProductId, setRecommendedProductId] = useState<string | null>(null);

  const recommendBestProduct = () => {
    if (products.length === 0) return;

    const scoredProducts = products.map(product => ({
      ...product,
      score: calculateScore(product)
    }));

    const bestProduct = scoredProducts.reduce((prev, current) => 
      (current.score > prev.score) ? current : prev
    );

    setRecommendedProductId(bestProduct.id);
  };

  const calculateScore = (product: Product): number => {
    let score = 0;
    
    // Rating score (max 50 points)
    if (product.rating) {
      score += product.rating * 10;
    }
    
    // Reviews count score (max 30 points)
    if (product.reviewsCount > 0) {
      score += Math.min(product.reviewsCount, 3) * 10;
    }
    
    // Price competitiveness score (max 20 points)
    if (product.priceKsh && searchCriteria) {
      const midPrice = (searchCriteria.minPrice + searchCriteria.maxPrice) / 2;
      const priceScore = 20 - Math.abs(product.priceKsh - midPrice) * 2;
      score += Math.max(0, priceScore);
    }
    
    return score;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  if (!searchCriteria) return null;

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold mb-4">No Results Found</h3>
        <p className="text-gray-600">
          No products found within the specified price range (KSH {searchCriteria.minPrice.toLocaleString()} - KSH {searchCriteria.maxPrice.toLocaleString()})
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
        <h3 className="text-2xl font-bold mb-4">
          Search Results for "{searchCriteria.productName}"
        </h3>
        <p className="text-gray-600 mb-4">
          Price Range: KSH {searchCriteria.minPrice.toLocaleString()} - KSH {searchCriteria.maxPrice.toLocaleString()}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Found:</strong> {products.length} products within your price range
        </p>
        <button
          onClick={recommendBestProduct}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-green-700 transition-all duration-300"
        >
          <ThumbsUp className="w-5 h-5" />
          Recommend Best Product
        </button>
      </div>

      <div className="space-y-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isRecommended={product.id === recommendedProductId}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;