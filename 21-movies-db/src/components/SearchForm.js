import React from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
  const { query, setQuery, error } = useGlobalContext();

  return (
    <section>
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <h2>Search Movies</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-input"
        />
        {error.show && (
          <div className="error">
            <p>{error.msg}</p>
            <button onClick={() => location.reload()} className="btn">
              refresh
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default SearchForm;
