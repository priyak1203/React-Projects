import React from 'react';
import { useGlobalContext } from '../context';
// import { useGlobalContext } from '../contextReducer';

import Loading from './Loading';
import CockTail from './Cocktail';

const CocktailList = () => {
  const { cocktails, loading } = useGlobalContext();

  return (
    <>
      {loading ? (
        <Loading />
      ) : cocktails.length < 1 ? (
        <h2 className="section-title">
          no cocktails matched your search criteria.
        </h2>
      ) : (
        <section className="section">
          <h2 className="section-title">cocktails</h2>
          <div className="cocktails-center">
            {cocktails.map((item) => {
              return <CockTail key={item.id} {...item} />;
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default CocktailList;
