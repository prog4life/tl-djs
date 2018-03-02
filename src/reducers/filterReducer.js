import {
  ADD_STUDIOS_FILTER_TAG,
  REMOVE_STUDIOS_FILTER_TAG,
  SET_STUDIOS_FILTER_TEXT
} from 'constants/actionTypes';

const defaultFilterState = {
  searchText: '',
  tags: ['bird', 'hitech', 'glass']
};

const filter = (state = defaultFilterState, action) => {
  switch (action.type) {
    case ADD_STUDIOS_FILTER_TAG: // TODO: prevent additon of duplicate tag
      return {
        ...state,
        tags: [...state.tags, action.tagName]
      };
    case REMOVE_STUDIOS_FILTER_TAG:
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.tagName)
      };
    case SET_STUDIOS_FILTER_TEXT:
      return {
        ...state,
        searchText: action.searchText
      };
    default:
      return state;
  }
};

export default filter;
