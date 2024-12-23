import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 text-center text-gray-500 text-sm">
      <p>© {new Date().getFullYear()} Digital Product Search. All rights reserved.</p>
      <p className="mt-2">Exchange Rate: 1 USD = 145 KSH</p>
      <p className="mt-2 text-xs text-gray-400">
        Disclaimer: Product information and prices are sourced from web searches and may not be 100% accurate.
      </p>
    </footer>
  );
};

export default Footer;