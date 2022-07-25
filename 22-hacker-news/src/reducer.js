import {
  HANDLE_PAGE,
  HANDLE_SEARCH,
  REMOVE_STORY,
  SET_LOADING,
  SET_STORIES,
} from './actions';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: payload };

    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        stories: payload.stories,
        nbPages: payload.nbPages,
      };

    case REMOVE_STORY:
      return {
        ...state,
        stories: state.stories.filter((item) => item.objectID !== payload),
      };

    case HANDLE_SEARCH:
      return { ...state, query: payload, page: 0 };

    case HANDLE_PAGE: {
      if (payload === 'inc') {
        let nextPage = state.page + 1;
        if (nextPage > state.nbPages - 1) {
          nextPage = 0;
        }
        return { ...state, page: nextPage };
      }

      if (payload === 'dec') {
        let prevPage = state.page - 1;
        if (prevPage < 0) {
          prevPage = state.nbPages - 1;
        }
        return { ...state, page: prevPage };
      }
    }

    default:
      throw new Error(`no matching "${type}" action type`);
  }
};

export default reducer;
