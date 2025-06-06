import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-900 text-amber-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Wyfer web productos</h3>
            <p className="mb-4">Handcrafted with love and care. Every piece tells a unique story.</p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/wilzelayaf4?igsh=aHlpb3c3czhseTJh" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="hover:text-amber-300 transition-colors" />
              </a>
              <a href="https://www.facebook.com/share/1A89qd9HCv/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="hover:text-amber-300 transition-colors" />
              </a>
              <a href="https://x.com/wilmerzel2002?t=N-l6CU5JS0s2yVAPP5k4dg&s=08" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="hover:text-amber-300 transition-colors" />
              </a>
              <a href="mailto:contact@artisancrafts.com" aria-label="Email">
                <Mail className="hover:text-amber-300 transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-amber-300 transition-colors">Store</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/store?category=jewelry" className="hover:text-amber-300 transition-colors">Portones Electricos</Link>
              </li>
              <li>
                <Link to="/store?category=pottery" className="hover:text-amber-300 transition-colors">Portones Electricos</Link>
              </li>
              <li>
                <Link to="/store?category=textiles" className="hover:text-amber-300 transition-colors">Portones Electricos</Link>
              </li>
              <li>
                <Link to="/store?category=woodwork" className="hover:text-amber-300 transition-colors">Portones Electricos</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic">
              <p>123 Wyfer</p>
              <p>Esteli Nicaragua</p>
              <p className="mt-2">Phone: (505) 57054004</p>
              <p>Email: wilmer2002zelaya@gmail.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center">
          <p>&copy; {currentYear} Wyfer web. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;