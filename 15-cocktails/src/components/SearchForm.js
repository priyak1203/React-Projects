import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from '../context';
// import { useGlobalContext } from '../contextReducer';

const SearchForm = () => {
  const searchValue = useRef('');
  const { setSearchTerm } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
  };

  // set focus on input on page load
  useEffect(() => {
    searchValue.current.focus();
  }, []);

  return (
    <section className="section search">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-control">
          <label htmlFor="name">Search Your Favorite Cocktail</label>
          <input
            type="text"
            name="name"
            id="name"
            ref={searchValue}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
