import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
          <p className="mt-1 text-gray-600 text-sm line-clamp-2">{product.description}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-amber-800">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-500 capitalize">{product.category}</span>
          </div>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        className="absolute right-3 bottom-3 bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-full shadow-md transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        aria-label="Add to cart"
      >
        <ShoppingBag size={18} />
      </button>
    </div>
  );
};

export default ProductCard;