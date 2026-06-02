import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Admin general search for:', query);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="hidden sm:block w-72 md:w-96 relative">
      <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">
        search
      </span>
      <input
        className="w-full pl-11 pr-4 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl font-body-sm text-on-surface form-focus-ring transition-all"
        placeholder="Search students, courses, transactions..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
