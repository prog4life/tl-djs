import {
  LOAD_STUDIOS_REQUEST,
  LOAD_STUDIOS_SUCCESS,
  LOAD_STUDIOS_FAIL,
  ADD_STUDIOS_FILTER_TAG,
  SET_STUDIOS_FILTER_TEXT
} from 'constants/actionTypes';
import transformArrayToObj from 'utils/handleResponse';

export const loadStudiosRequest = () => ({
  type: LOAD_STUDIOS_REQUEST
});

export const loadStudiosSuccess = studios => ({
  type: LOAD_STUDIOS_SUCCESS,
  studios: transformArrayToObj(studios)
});

export const loadStudiosFail = error => ({
  type: LOAD_STUDIOS_FAIL,
  error
});

export const addStudiosFilterTag = tagName => ({
  type: ADD_STUDIOS_FILTER_TAG,
  tagName
});

export const setStudiosFilterText = searchText => ({
  type: SET_STUDIOS_FILTER_TEXT,
  searchText
});

export const loadStudios = () => (dispatch) => {
  const url = 'http://localhost:8585/studios';

  dispatch(loadStudiosRequest());
  return fetch(url, { mode: 'cors' })
  // return fetch('/studios.json')
    .then(res =>
      res.json()
    )
    .then(response =>
      dispatch(loadStudiosSuccess(response))
    )
    .catch(error =>
      // dispatch(loadStudiosFail(error))
      console.error(error)
    );
};
