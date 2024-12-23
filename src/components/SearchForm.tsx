import React from 'react';
import { SearchCriteria } from '../types';

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSearch({
      productName: formData.get('product_name') as string,
      specifications: formData.get('specifications') as string,
      minPrice: parseFloat(formData.get('min_price') as string),
      maxPrice: parseFloat(formData.get('max_price') as string),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="product_name" className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            required
            className="form-input w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200 transition-all duration-300"
          />
        </div>
        <div>
          <label htmlFor="specifications" className="block text-sm font-medium text-gray-700 mb-2">
            Specifications (Optional)
          </label>
          <input
            type="text"
            id="specifications"
            name="specifications"
            className="form-input w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200 transition-all duration-300"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="min_price" className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Price (KSH)
          </label>
          <input
            type="number"
            id="min_price"
            name="min_price"
            required
            min="0"
            className="form-input w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200 transition-all duration-300"
          />
        </div>
        <div>
          <label htmlFor="max_price" className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Price (KSH)
          </label>
          <input
            type="number"
            id="max_price"
            name="max_price"
            required
            min="1"
            className="form-input w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200 transition-all duration-300"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300"
        >
          Search Products
        </button>
      </div>
    </form>
  );
};

export default SearchForm;