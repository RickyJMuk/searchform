import React, { useState } from 'react';
import { Search } from 'lucide-react';
import SearchForm from './components/SearchForm';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import { Product, SearchCriteria } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | null>(null);

  const handleSearch = async (criteria: SearchCriteria) => {
    setLoading(true);
    setSearchCriteria(criteria);
    setSearchPerformed(true);

    // Simulated API call - replace with actual API integration
    try {
      const response = await fetch(`https://api.example.com/products?search=${encodeURIComponent(criteria.productName)}`);
      const data = await response.json();
      
      // Process and filter products based on price range
      const processedProducts = data.organic_results?.map((result: any) => ({
        id: Math.random().toString(36).substr(2, 9),
        title: result.title || 'No Title',
        url: result.url || '#',
        description: result.description || 'No Description',
        vendor: result.domain || 'Unknown Vendor',
        imageUrl: result.thumbnail || 'https://via.placeholder.com/200',
        rating: result.rating || null,
        reviewsCount: result.reviews || 0,
        priceUsd: extractPrice(result),
        priceKsh: extractPrice(result) * 145 // Exchange rate: 1 USD = 145 KSH
      })) || [];

      const filteredProducts = processedProducts.filter((product: Product) => 
        product.priceKsh >= criteria.minPrice && 
        product.priceKsh <= criteria.maxPrice
      );

      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const extractPrice = (result: any): number | null => {
    if (!result.rich_snippet?.top?.extensions) return null;
    
    for (const extension of result.rich_snippet.top.extensions) {
      if (extension.includes('$')) {
        const matches = extension.match(/\$(\d+(?:\.\d+)?)(?:\s*to\s*\$(\d+(?:\.\d+)?))?/);
        if (matches) {
          const minPrice = parseFloat(matches[1]);
          const maxPrice = matches[2] ? parseFloat(matches[2]) : minPrice;
          return (minPrice + maxPrice) / 2;
        }
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="search-container rounded-xl p-6 mb-8 shadow-lg bg-white/90 backdrop-blur-md border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Product Search</h1>
          </div>
          <SearchForm onSearch={handleSearch} />
        </div>

        {searchPerformed && (
          <div className="results-container space-y-6">
            <ProductList 
              products={products}
              loading={loading}
              searchCriteria={searchCriteria}
            />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;