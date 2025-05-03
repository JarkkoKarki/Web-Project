import React from 'react';
import {useLanguageContext} from '../contexts/LanguageContext';

const LanguageChange = () => {
  const {language, changeLanguage} = useLanguageContext();

  return (
    <div className="flex space-x-2">
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
  );
};

export default LanguageChange;
