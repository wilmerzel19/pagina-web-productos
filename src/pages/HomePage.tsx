import React from 'react';
import Banner from '../components/ui/Banner';
import FeaturedSection from '../components/ui/FeaturedSection';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Heart } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      <Banner 
        title="Handcrafted with Love"
        subtitle="Discover unique handmade products created with passion and skill"
        ctaText="Shop Now"
        ctaLink="/store"
        height="large"
      />
      
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={`/store?category=${category.slug}`}
                className="group block"
              >
                <div className="relative rounded-lg overflow-hidden h-64">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                      <p className="text-amber-200 text-sm">{category.count} Products</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <FeaturedSection />
      
      <section className="py-16 bg-amber-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="bg-amber-700 inline-flex p-4 rounded-full mb-4">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Handcrafted Quality</h3>
              <p className="text-amber-100">Each product is carefully made by skilled artisans using traditional techniques.</p>
            </div>
            
            <div className="p-6">
              <div className="bg-amber-700 inline-flex p-4 rounded-full mb-4">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Made with Love</h3>
              <p className="text-amber-100">Our artisans put their heart and soul into every piece they create.</p>
            </div>
            
            <div className="p-6">
              <div className="bg-amber-700 inline-flex p-4 rounded-full mb-4">
                <Mail size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Support</h3>
              <p className="text-amber-100">Have questions? Our team is here to help you with your purchase.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 mb-8">
            Artisan Crafts was founded on a simple idea: to showcase and celebrate the beauty of handmade products. 
            We partner with skilled artisans from around the world to bring you unique, high-quality items that 
            combine traditional craftsmanship with contemporary design.
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-md transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

// Sample category data
const categories = [
  {
    name: 'Jewelry',
    slug: 'jewelry',
    count: 24,
    image: 'https://images.pexels.com/photos/965981/pexels-photo-965981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'Pottery',
    slug: 'pottery',
    count: 18,
    image: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'Textiles',
    slug: 'textiles',
    count: 15,
    image: 'https://images.pexels.com/photos/6192554/pexels-photo-6192554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'Woodwork',
    slug: 'woodwork',
    count: 12,
    image: 'https://images.pexels.com/photos/6498998/pexels-photo-6498998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export default HomePage;