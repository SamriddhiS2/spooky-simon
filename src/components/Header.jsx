import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = ({ accentColor }) => {
  return (
    <>
      <h1 className={`text-5xl sm:text-7xl font-bold mb-4 ${accentColor} drop-shadow-lg`}>
        Spooky Simon <Sparkles className="inline h-10 w-10 sm:h-16 sm:w-16 mb-2" />
      </h1>
      <p className="text-xl text-gray-400 mb-6 italic">Remember the ghostly pattern!</p>
    </>
  );
};

export default Header;