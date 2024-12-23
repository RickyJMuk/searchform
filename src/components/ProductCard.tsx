import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isRecommended: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isRecommended }) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div
      className={`product-card bg-white rounded-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isRecommended ? 'border-4 border-green-500' : ''
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="product-image-container flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="product-image max-w-[200px] max-h-[200px] object-contain"
          />
        </div>

        <div className="md:col-span-2">
          <h4 className="text-xl font-semibold mb-2">
            <a
              href={product.url}
              className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {product.title}
              <ExternalLink className="w-4 h-4" />
            </a>
          </h4>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-4">
              {product.rating && (
                <div className="mb-2">
                  <span className="font-medium">Rating: </span>
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                    <span className="ml-2">({product.rating} out of 5)</span>
                  </div>
                </div>
              )}
              {product.reviewsCount > 0 && (
                <div>
                  <span className="font-medium">Reviews: </span>
                  {product.reviewsCount.toLocaleString()}
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="mb-2">
                <span className="font-medium">Vendor: </span>
                {product.vendor}
              </div>
              <div>
                <span className="font-medium">Price: </span>
                {product.priceKsh
                  ? `KSH ${product.priceKsh.toLocaleString()}`
                  : 'Not available'}
              </div>
            </div>
          </div>

          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {product.url}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;