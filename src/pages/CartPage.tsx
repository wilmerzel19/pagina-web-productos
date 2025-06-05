import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Trash2, ArrowLeft, ShoppingBag, Minus, Plus } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Here you would typically navigate to a checkout page
    // For now, we'll just clear the cart and show a message
    alert('Thank you for your order! In a real application, you would be redirected to a payment gateway.');
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
        <ShoppingBag size={80} className="text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Link 
          to="/store" 
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Cart Items ({totalItems})</h2>
                <button 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center"
                >
                  <Trash2 size={16} className="mr-1" />
                  Clear Cart
                </button>
              </div>
            </div>
            
            <div className="divide-y">
              {cartItems.map(item => (
                <div key={item.product.id} className="p-6 flex flex-col sm:flex-row">
                  <div className="sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0 shrink-0">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                  <div className="sm:ml-6 flex-grow">
                    <div className="flex justify-between mb-2">
                      <Link 
                        to={`/product/${item.product.id}`}
                        className="text-lg font-medium text-gray-800 hover:text-amber-700"
                      >
                        {item.product.name}
                      </Link>
                      <span className="font-semibold">${item.product.price.toFixed(2)}</span>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.product.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="bg-gray-200 hover:bg-gray-300 p-1 rounded-md"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-3">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="bg-gray-200 hover:bg-gray-300 p-1 rounded-md"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Link 
            to="/store" 
            className="inline-flex items-center text-amber-700 hover:text-amber-800"
          >
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </Link>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">$0.00</span>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 mt-6"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;