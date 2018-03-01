import {
  LOAD_STUDIOS_REQUEST,
  LOAD_STUDIOS_SUCCESS,
  LOAD_STUDIOS_FAIL
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
