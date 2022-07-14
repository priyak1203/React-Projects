import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const AppContext = React.createContext();

const defaultState = {
  loading: true,
  cocktails: [],
  searchTerm: 'a',
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const { loading, cocktails, searchTerm } = state;

  // set Search value
  const setSearchTerm = (searchValue) => {
    dispatch({ type: 'SET_SEARCH', payload: searchValue });
  };

  // Fetch cocktails from api
  const fetchCocktails = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strAlcoholic, strDrinkThumb, strGlass } =
            item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });

        dispatch({ type: 'SET_COCKTAILS', payload: newCocktails });
      } else {
        dispatch({ type: 'SET_COCKTAILS', payload: [] });
      }

      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      console.log(error);

      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchCocktails();
  }, [searchTerm, fetchCocktails]);

  return (
    <AppContext.Provider
      value={{
        loading,
        cocktails,
        setSearchTerm,
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

// Note:
// Description: Context file using useReducer Approach.
// Replace the contents of context.js with the contents of this file to use this approach
// Include reducer.js file as well
