import React, { useContext, useEffect, useReducer } from 'react';
import cartItems from './data';
import reducer from './reducer';

const url = 'https://course-api.com/react-useReducer-cart-project';

const AppContext = React.createContext();

const initialState = {
  loading: false,
  // cart: cartItems,
  cart: [],
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //  To clear cart items
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // To remove single item
  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  // To increase quantity
  const increaseItem = (id) => {
    dispatch({ type: 'INCREASE_ITEM', payload: id });
  };

  // To decrease quantity
  const decreaseItem = (id) => {
    dispatch({ type: 'DECREASE_ITEM', payload: id });
  };

  // To fetch data from api
  const fetchData = async () => {
    dispatch({ type: 'SET_LOADING' });
    const response = await fetch(url);
    const data = await response.json();
    dispatch({ type: 'FETCH_DATA', payload: data });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);

  // To change amount using single dispatch action
  const changeAmount = (id, type) => {
    dispatch({ type: 'CHANGE_AMOUNT', payload: { id, type } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increaseItem,
        decreaseItem,
        changeAmount,
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
