import {
  ADD_STUDIOS_FILTER_TAG,
  REMOVE_STUDIOS_FILTER_TAG,
  SET_STUDIOS_FILTER_TEXT,
  SET_STUDIOS_PRICE_RANGE,
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
        searchText: action.searchText.trim().toLoweCase(),
      };
    case SET_STUDIOS_PRICE_RANGE:
      return {
        ...state,
        minPrice: action.minPrice,
        maxPrice: action.maxPrice,
      };
    default:
      return state;
  }
};

export default filter;
