import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // Could add a toast notification here
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen flex justify-center items-start">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Link 
            to="/store" 
            className="inline-flex items-center text-amber-700 hover:text-amber-800"
          >
            <ArrowLeft size={16} className="mr-2" />
          Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <Link 
        to="/store" 
        className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-8"
      >
        <ArrowLeft size={16} className="mr-2" />
    Volver a la tienda
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative h-[400px] md:h-[600px] bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
              {product.category}
            </span>
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-amber-700 mb-6">${product.price.toFixed(2)}</p>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Quantity</h2>
            <div className="flex items-center">
              <button 
                onClick={decrementQuantity}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded-l-md"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="bg-gray-100 py-2 px-6 text-center">{quantity}</span>
              <button 
                onClick={incrementQuantity}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded-r-md"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors duration-300"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;