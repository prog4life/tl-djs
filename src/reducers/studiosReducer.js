import {
  LOAD_STUDIOS_REQUEST,
  LOAD_STUDIOS_SUCCESS,
  LOAD_STUDIOS_FAIL
} from 'constants/actionTypes';

const defaultState = {
  isLoading: false,
  studiosByIds: {}
};

const studios = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_STUDIOS_REQUEST:
      return {
        isLoading: true,
        studiosByIds: {}
      };
    case LOAD_STUDIOS_SUCCESS:
      return {
        isLoading: false,
        studiosByIds: {
          // ...state.studiosByIds,
          ...action.studios
        }
      };
    case LOAD_STUDIOS_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default studios;
