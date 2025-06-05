import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../components/ui/Banner';
import ProductGrid from '../components/products/ProductGrid';
import CategoryFilter from '../components/ui/CategoryFilter';
import { getAllProducts, getProductsByCategory } from '../services/productService';
import { Product } from '../types';
import { Search } from 'lucide-react';

const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let fetchedProducts: Product[];
        
        if (selectedCategory) {
          fetchedProducts = await getProductsByCategory(selectedCategory);
        } else {
          fetchedProducts = await getAllProducts();
        }
        
        setProducts(fetchedProducts);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(fetchedProducts.map(product => product.category))
        );
        setCategories(uniqueCategories);
        
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Banner 
        title="Our Products"
        subtitle="Browse our collection of handcrafted products"
        height="medium"
        backgroundImage="https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-24">
              <CategoryFilter 
                categories={categories} 
                selectedCategory={selectedCategory} 
                onSelectCategory={handleCategorySelect} 
              />
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </aside>
          
          <main className="flex-grow">
            <ProductGrid products={filteredProducts} isLoading={loading} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default StorePage;