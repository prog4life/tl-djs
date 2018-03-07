import {
  ADD_STUDIOS_FILTER_TAG,
  REMOVE_STUDIOS_FILTER_TAG,
  SET_STUDIOS_FILTER_TEXT,
  SET_STUDIOS_PRICE_RANGE,
} from 'constants/actionTypes';

// TEMP:
const LOAD_STUDIOS = 'LOAD_STUDIOS';

const defaultFilterState = {
  searchText: '',
  tags: ['bird', 'hitech', 'glass'],
  priceRanges: {},
  idsOfSortedByPrice: [],
};

export const idsOfSorted = (state = [], action) => {
  switch (action.type) {
    case `${LOAD_STUDIOS}_FULFILLED`:
      return action.payload.map(studio => studio.id);
    default:
      return state;
  }
};

// MISTAKE: it mutates external data                                             !!!
export const countStudiosLowestPrice = studios => (
  studios.sort((s1, s2) => s1.price - s2.price)[0]
);

export const countStudiosHighestPrice = studios => (
  studios.sort((s1, s2) => s1.price - s2.price)[0]
);

const priceRanges = (state = {}, action) => {
  if (action.type === `${LOAD_STUDIOS}_FULFILLED`) {
    // const prevMinPrice = state.sliderMin;
    // const prevMaxPrice = state.sliderMax;
    const studiosLowest = action.payload[0].price;
    const studiosHighest = action.payload.slice(-1)[0].price;

    return {
      // sliderMin: prevMinPrice && prevMinPrice > studiosLowest
      //   ? prevMinPrice
      //   : studiosLowest,
      // sliderMax: prevMaxPrice && prevMaxPrice < studiosHighest
      //   ? prevMaxPrice
      //   : studiosHighest,
      sliderMin: studiosLowest,
      sliderMax: studiosHighest,
      studiosLowest,
      studiosHighest,
    };
  } else if (action.type === SET_STUDIOS_PRICE_RANGE) {
    return {
      ...state,
      sliderMin: action.minPrice,
      sliderMax: action.maxPrice,
    };
  }
  return state;
};

const filterReducer = (state = defaultFilterState, action) => {
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
        searchText: action.searchText.trim().toLowerCase(),
      };
    // case SET_STUDIOS_PRICE_RANGE:
    //   return {
    //     ...state,
    //     minPrice: action.minPrice,
    //     maxPrice: action.maxPrice,
    //   };
    case SET_STUDIOS_PRICE_RANGE:
    case `${LOAD_STUDIOS}_FULFILLED`: {
      return {
        ...state,
        priceRanges: priceRanges(state.priceRanges, action),
        idsOfSortedByPrice: idsOfSorted(state.idsOfSortedByPrice, action),
      };
    }
    default:
      return state;
  }
};

export default filterReducer;

export const getLowestPrice = state => state.filter.minPrice;
export const getHighestPrice = state => state.filter.maxPrice;

export const getInitialPriceRange = ({
  filter: { priceRanges: { studiosLowest, studiosHighest } },
}) => (
  studiosLowest && studiosHighest
    ? [studiosLowest, studiosHighest]
    : undefined
);

export const getFilterParams = ({ searchText, tags, priceRanges }) => ({
  searchText,
  tags,
  minPrice: priceRanges.sliderMin || priceRanges.studiosLowest,
  maxPrice: priceRanges.sliderMax || priceRanges.studiosHighest,
});
