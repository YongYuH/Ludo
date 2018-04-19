import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import axios from '../../../axios-config';

// - Actions
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';
export const FETCH_USER_INFO_REQUEST = 'FETCH_USER_INFO_REQUEST';
export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
export const FETCH_USER_INFO_FAIL = 'FETCH_USER_INFO_FAIL';

// - State
export const initialState = {
  errorMessage: '',
  isFetching: false,
  photoUrl: null,
  userId: null,
};

// - Reducer
export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_USER_INFO:
      return {
        ...state,
        photoUrl: null,
        userId: null,
      };
    case FETCH_USER_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        errorMessage: '',
        isFetching: false,
        photoUrl: action.payload.photoUrl,
        userId: action.payload.userId,
      };
    case FETCH_USER_INFO_FAIL:
      return {
        ...state,
        errorMessage: action.payload.message,
        isFetching: false,
      };
    default:
      return state;
  }
};

// - Action Creators
export const clearUserInfo = () => ({ type: CLEAR_USER_INFO });
export const fetchUserInfoRequest = () => ({ type: FETCH_USER_INFO_REQUEST });
export const fetchUserInfoSuccess = ({
  photoUrl,
  userId,
}) => ({
  type: FETCH_USER_INFO_SUCCESS,
  payload: {
    photoUrl,
    userId,
  },
});
export const fetchUserInfoFail = ({ message }) => ({
  type: FETCH_USER_INFO_FAIL,
  payload: { message },
});

// - Api
export const fetchUserApi = ({ apiParam }) => (
  axios.get(apiParam)
);

// - Sagas
export function* fetchUser() {
  try {
    const fetchUserRequestData = {
      apiParam: 'apis/user',
    };
    const fetchUserResponse = yield call(fetchUserApi, fetchUserRequestData);
    const {
      message,
      status,
      user,
    } = fetchUserResponse.data;
    const {
      photo,
      user_id,
    } = user;

    if (status !== '200') {
      throw new Error(message);
    }

    yield put(fetchUserInfoSuccess({
      photoUrl: photo,
      userId: user_id,
    }));
  } catch (error) {
    yield put(fetchUserInfoFail(error));
  }
}

function* watchFetchUserInfo() {
  yield takeLatest(FETCH_USER_INFO_REQUEST, fetchUser);
}

export default watchFetchUserInfo;