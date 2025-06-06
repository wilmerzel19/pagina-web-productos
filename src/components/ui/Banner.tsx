import React from 'react';
import { Link } from 'react-router-dom';

interface BannerProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  overlay?: boolean;
  height?: 'small' | 'medium' | 'large' | 'full';
  position?: 'center' | 'top' | 'bottom';
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink = '/store',
  backgroundImage = 'https://www.instatelcr.com/wp-content/uploads/2019/12/Portones-El%C3%A9ctricos.jpg',
  overlay = true,
  height = 'large',
  position = 'center',
}) => {
  const heightClasses = {
    small: 'h-64',
    medium: 'h-96',
    large: 'h-[500px]',
    full: 'h-screen',
  };

  const positionClasses = {
    center: 'bg-center',
    top: 'bg-top',
    bottom: 'bg-bottom',
  };

  return (
    <div 
      className={`relative ${heightClasses[height]} bg-cover ${positionClasses[position]} flex items-center`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      )}
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-100">
            {subtitle}
          </p>
        )}
        
        {ctaText && (
          <Link 
            to={ctaLink}
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-md transition-colors duration-300 animate-fade-in animation-delay-200"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Banner;