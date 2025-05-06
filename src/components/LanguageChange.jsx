import React, {useState} from 'react';
import {useLanguageContext} from '../contexts/LanguageContext';

const LanguageChange = () => {
  const {language, changeLanguage} = useLanguageContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-1 text-sm sm:hidden"
      >
        <span className="cursor-pointer text-yellow-500">
          {language === 'fi' ? 'Suomi' : 'English'}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transform transition-transform ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu for smaller screens*/}
      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 w-24 rounded-md bg-gray-800 shadow-lg sm:hidden">
          <button
            onClick={() => {
              changeLanguage('fi');
              setIsDropdownOpen(false);
            }}
            className={`block w-full px-4 py-2 text-left text-sm ${
              language === 'fi' ? 'text-yellow-500' : 'hover:text-yellow-500'
            }`}
          >
            Suomi
          </button>
          <button
            onClick={() => {
              changeLanguage('en');
              setIsDropdownOpen(false);
            }}
            className={`block w-full px-4 py-2 text-left text-sm ${
              language === 'en' ? 'text-yellow-500' : 'hover:text-yellow-500'
            }`}
          >
            English
          </button>
        </div>
      )}

      {/* Horizontal Buttons for Larger Screens */}
      <div className="hidden space-x-2 sm:flex">
        <button
          onClick={() => changeLanguage('fi')}
          className={`cursor-pointer ${
            language === 'fi' ? 'text-yellow-500' : 'hover:text-yellow-500'
          }`}
        >
          Suomi
        </button>

        <span>|</span>

        <button
          onClick={() => changeLanguage('en')}
          className={`cursor-pointer ${
            language === 'en' ? 'text-yellow-500' : 'hover:text-yellow-500'
          }`}
        >
          English
        </button>
      </div>
    </div>
  );
};

export default LanguageChange;
