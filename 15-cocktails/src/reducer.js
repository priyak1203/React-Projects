const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_LOADING':
      return { ...state, loading: payload };

    case 'SET_COCKTAILS':
      return { ...state, cocktails: payload };

    case 'SET_SEARCH':
      return { ...state, searchTerm: payload };

    default:
      throw new Error('no matching action type');
  }
};

export default reducer;
