import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-9xl font-bold text-amber-600">404</h1>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Page Not Found</h2>
          <p className="text-gray-600">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;