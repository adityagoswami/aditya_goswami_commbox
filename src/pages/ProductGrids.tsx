import React, { useEffect, useState } from 'react';
import { fetchProducts, type Product } from '../api/products';
import ProductCard from '../components/ProductCard';
import { SearchIcon, ChevronDown } from '../icons';

const ProductsGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('newest');

  // 1. Get the data when the page loads
  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // 2. Filter products based on search
  const filtered = products.filter((item) => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // 3. Sort the filtered results
  const sortedAndFiltered = [...filtered].sort((a, b) => {
    if (sortType === 'price-low') return a.price - b.price;
    if (sortType === 'price-high') return b.price - a.price;
    return 0; // Default (newest/oldest usually follows ID in this API)
  });

  if (loading) return <div className="p-20 text-center font-medium">Loading products...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Product Catalog</h1>

      {/* Controls: Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full border border-gray-200 py-2 pl-10 pr-4 rounded-lg outline-none focus:border-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select 
            className="appearance-none border border-gray-200 py-2 pl-4 pr-10 rounded-lg bg-white cursor-pointer outline-none"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none w-4 h-4" />
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedAndFiltered.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;