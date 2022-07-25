import React from 'react';
import { useGlobalContext } from '../context';

const Buttons = () => {
  const { isLoading, page, nbPages, handlePage, stories } = useGlobalContext();

  return (
    <>
      {!stories.length ? (
        !isLoading && (
          <div className="error">
            <h2>No stories matched your search criteria.</h2>
            <button className="btn" onClick={() => location.reload()}>
              refresh
            </button>
          </div>
        )
      ) : (
        <div className="btn-container">
          <button
            className="btn"
            disabled={isLoading}
            onClick={() => handlePage('dec')}
          >
            prev
          </button>
          <p>
            {page + 1} of {nbPages}
          </p>
          <button
            className="btn"
            disabled={isLoading}
            onClick={() => handlePage('inc')}
          >
            next
          </button>
        </div>
      )}
    </>
  );
};

export default Buttons;
