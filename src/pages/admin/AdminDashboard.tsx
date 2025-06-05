import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../services/productService';
import { Product } from '../../types';
import { ShoppingBag, Users, DollarSign, Package } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const categories = [...new Set(products.map(product => product.category))];

  const getRecentProducts = () => {
    return [...products]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back to your dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 mb-1">Total Products</p>
                <h3 className="text-2xl font-bold">{totalProducts}</h3>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Package size={24} className="text-amber-800" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/admin/products" className="text-amber-700 hover:text-amber-800 text-sm">
                View all products →
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 mb-1">Categories</p>
                <h3 className="text-2xl font-bold">{categories.length}</h3>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <ShoppingBag size={24} className="text-amber-800" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/admin/products" className="text-amber-700 hover:text-amber-800 text-sm">
                View all categories →
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 mb-1">Total Value</p>
                <h3 className="text-2xl font-bold">${totalValue.toFixed(2)}</h3>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <DollarSign size={24} className="text-amber-800" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/admin/products" className="text-amber-700 hover:text-amber-800 text-sm">
                View inventory →
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 mb-1">Featured Products</p>
                <h3 className="text-2xl font-bold">
                  {products.filter(p => p.featured).length}
                </h3>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Users size={24} className="text-amber-800" />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/admin/products" className="text-amber-700 hover:text-amber-800 text-sm">
                Manage featured →
              </Link>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Recent Products</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Featured
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getRecentProducts().map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img 
                                className="h-10 w-10 rounded-md object-cover" 
                                src={product.imageUrl} 
                                alt={product.name} 
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">{product.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.featured ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Yes
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link 
                            to={`/admin/products/edit/${product.id}`} 
                            className="text-amber-700 hover:text-amber-800"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6">
                <Link 
                  to="/admin/products" 
                  className="text-amber-700 hover:text-amber-800"
                >
                  View all products →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-4">
              <Link 
                to="/admin/products/add" 
                className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center px-6 py-3 rounded-md font-medium transition-colors duration-300"
              >
                Add New Product
              </Link>
              
              <Link 
                to="/admin/products" 
                className="block w-full bg-white border border-amber-600 text-amber-700 hover:bg-amber-50 text-center px-6 py-3 rounded-md font-medium transition-colors duration-300"
              >
                Manage Products
              </Link>
              
              <Link 
                to="/" 
                className="block w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-center px-6 py-3 rounded-md font-medium transition-colors duration-300"
              >
                View Store
              </Link>
            </div>
            
            <div className="p-6 border-t">
              <h3 className="font-semibold mb-4">Categories Overview</h3>
              <div className="space-y-3">
                {categories.map((category) => {
                  const count = products.filter(p => p.category === category).length;
                  const percentage = Math.round((count / totalProducts) * 100);
                  
                  return (
                    <div key={category}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize">{category}</span>
                        <span>{count} products</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-amber-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;