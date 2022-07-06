import React, { useContext, useReducer } from 'react';
import sublinks from './data';

const AppContext = React.createContext();

const defaultState = {
  isSidebarOpen: false,
  isSubmenuOpen: false,
  page: { page: '', links: [] },
  location: {},
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'OPEN_SIDEBAR':
      return { ...state, isSidebarOpen: true };

    case 'CLOSE_SIDEBAR':
      return { ...state, isSidebarOpen: false };

    case 'OPEN_SUBMENU':
      return {
        ...state,
        isSubmenuOpen: true,
        page: payload.pageDetails,
        location: payload.coordinates,
      };

    case 'CLOSE_SUBMENU':
      return { ...state, isSubmenuOpen: false };

    default:
      throw new Error('no matching action type');
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const { isSidebarOpen, isSubmenuOpen, page, location } = state;

  const openSidebar = () => {
    dispatch({ type: 'OPEN_SIDEBAR' });
  };

  const closeSidebar = () => {
    dispatch({ type: 'CLOSE_SIDEBAR' });
  };

  const openSubmenu = (title, coordinates) => {
    const pageDetails = sublinks.find((link) => link.page === title);
    dispatch({ type: 'OPEN_SUBMENU', payload: { pageDetails, coordinates } });
  };

  const closeSubmenu = () => {
    dispatch({ type: 'CLOSE_SUBMENU' });
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        page,
        location,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };

// Note:
// Description: Context file using useReducer Approach.
// Replace the contents of context.js with the contents of this file to use this approach
