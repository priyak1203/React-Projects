import React, { useContext, useReducer } from 'react';

const AppContext = React.createContext();

const defaultState = {
  isModalOpen: false,
  isSidebarOpen: false,
};

const reducer = (state, action) => {
  if (action.type === 'OPEN_SIDEBAR') {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === 'CLOSE_SIDEBAR') {
    return { ...state, isSidebarOpen: false };
  }
  if (action.type === 'OPEN_MODAL') {
    return { ...state, isModalOpen: true };
  }
  if (action.type === 'CLOSE_MODAL') {
    return { ...state, isModalOpen: false };
  }

  throw new Error('no matching action type');
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const openSidebar = () => {
    dispatch({ type: 'OPEN_SIDEBAR' });
  };

  const closeSidebar = () => {
    dispatch({ type: 'CLOSE_SIDEBAR' });
  };

  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL' });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <AppContext.Provider
      value={{
        isModalOpen: state.isModalOpen,
        isSidebarOpen: state.isSidebarOpen,
        openSidebar,
        closeSidebar,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };

// Note:
// Description: Context file using useReducer Approach.
// Replace the contents of context.js with the contents of this file to use this approach
