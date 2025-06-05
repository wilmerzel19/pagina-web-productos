import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-amber-800">
          Wyfer web Productos
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-amber-900 hover:text-amber-700 font-medium">
            Home
          </Link>
          <Link to="/store" className="text-amber-900 hover:text-amber-700 font-medium">
            Store
          </Link>
          <Link to="/contact" className="text-amber-900 hover:text-amber-700 font-medium">
            Contact
          </Link>
          {isAdmin && (
            <Link to="/admin" className="text-amber-900 hover:text-amber-700 font-medium">
              Admin
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <div className="relative group">
              <button className="flex items-center text-amber-900 hover:text-amber-700">
                <User size={20} className="mr-1" />
                <span className="font-medium">Account</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                  >
                    Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="text-amber-900 hover:text-amber-700 font-medium flex items-center"
            >
              <User size={20} className="mr-1" />
              Login
            </Link>
          )}

          <Link to="/cart" className="relative">
            <ShoppingBag size={24} className="text-amber-900 hover:text-amber-700" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <Link to="/cart" className="relative">
            <ShoppingBag size={24} className="text-amber-900" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button 
            onClick={toggleMenu}
            className="text-amber-900 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-amber-900 hover:text-amber-700 py-2 font-medium">
                Home
              </Link>
              <Link to="/store" className="text-amber-900 hover:text-amber-700 py-2 font-medium">
                Store
              </Link>
              <Link to="/contact" className="text-amber-900 hover:text-amber-700 py-2 font-medium">
                Contact
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-amber-900 hover:text-amber-700 py-2 font-medium">
                  Admin
                </Link>
              )}
              {currentUser ? (
                <button 
                  onClick={handleLogout} 
                  className="text-left text-amber-900 hover:text-amber-700 py-2 font-medium"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-amber-900 hover:text-amber-700 py-2 font-medium">
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;