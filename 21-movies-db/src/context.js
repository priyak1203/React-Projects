import React, { useContext, useState } from 'react';
import useFetch from './useFetch';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState('avengers');
  const { isLoading, data: movies, error } = useFetch(`&s=${query}`);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        error,
        movies,
        query,
        setQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
