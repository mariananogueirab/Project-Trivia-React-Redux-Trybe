import { getToken } from '../services/api';

export const ADD_TOKEN = 'ADD_TOKEN';
export const GET_GRAVATAR_PICTURE = 'GET_GRAVATAR_PICTURE';
export const GET_PLAYER_LOGIN = 'GET_PLAYER_LOGIN';
export const GET_PLAYER_EMAIL = 'GET_PLAYER_EMAIL';

const getGravatar = (payload) => ({
  type: GET_GRAVATAR_PICTURE,
  payload,
});

export const getTokenAction = (payload) => ({
  type: ADD_TOKEN,
  payload,
});

export const getTokenThunk = () => async (dispatch) => {
  const token = await getToken();
  dispatch(getTokenAction(token.token));
};

export const getPlayerLogin = (payload) => ({
  type: GET_PLAYER_LOGIN,
  payload,
});
