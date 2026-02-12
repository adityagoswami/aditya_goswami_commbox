
import { Link } from 'react-router-dom';
import { type Product } from '../api/products';
import { StarIcon } from '../icons';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group border border-gray-100 rounded-xl p-4 hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col"
    >
      <div className="aspect-square mb-4 overflow-hidden bg-gray-50 rounded-lg">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="space-y-1 flex-grow">
        <h2 className="font-medium text-gray-900 truncate">{product.title}</h2>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i} 
              className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"} 
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
        </div>
        <p className="text-lg font-bold text-gray-900 mt-2">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;