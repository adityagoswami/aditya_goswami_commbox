import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, type Product } from '../api/products';
import Accordion from '../components/Accordion';
import { ArrowLeft, StarIcon } from '../icons';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => { 
    if (id) {
      fetchProductById(id)
        .then((data) => setProduct(data))
        .catch(() => navigate('/')); // Send back home if product doesn't exist
    }
  }, [id, navigate]);

  if (!product) {
    return <div className="text-center p-20">Searching for product...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      {/* Simple Back Button */}
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center text-gray-500 hover:text-black mb-10 transition-colors"
      >
        <ArrowLeft className="mr-2 w-5 h-5" />
        Back to Catalog
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: Product Image */}
        <div className="bg-gray-50 rounded-2xl flex items-center justify-center p-10">
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="max-h-[400px] w-auto object-contain" 
          />
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">{product.brand}</p>
          <h1 className="text-4xl font-bold mt-2 text-gray-900">{product.title}</h1>
          
          <div className="flex items-center gap-2 mt-4">
            <div className="flex text-yellow-400">
              <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon className="text-gray-200" />
            </div>
            <span className="text-sm text-gray-500">({product.rating})</span>
          </div>

          <p className="text-gray-600 mt-6 leading-relaxed text-lg">
            {product.description}
          </p>

          <p className="text-3xl font-bold mt-8">${product.price}</p>

          <button className="bg-black text-white font-bold py-4 rounded-xl mt-8 hover:opacity-80 transition-opacity">
            Add to Shopping Bag
          </button>

          {/* Product Meta Info */}
          <div className="mt-12 space-y-2">
            <Accordion title="Delivery Info">
              Free shipping on all orders over $50. Arrives in 3-5 business days.
            </Accordion>
            <Accordion title="Return Policy">
              Return within 30 days for a full refund. No questions asked.
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;