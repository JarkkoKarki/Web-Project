import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

export const Search = () => {
  const {t} = useTranslation();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative">
      {isSearching ? (
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={t('header.search-placeholder')}
          className="rounded border border-gray-300 px-2 py-1 text-white"
          onBlur={() => setIsSearching(false)}
          autoFocus
        />
      ) : (
        <img
          src="/icons8-search-50.png"
          alt="Search"
          title={t('header.search')}
          className="h-6 w-6 cursor-pointer"
          onClick={handleSearchToggle}
        />
      )}
    </div>
  );
};
