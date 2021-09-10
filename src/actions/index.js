import { getToken } from '../services/api';

export const ADD_TOKEN = 'ADD_TOKEN';
export const IS_OVER = 'IS_OVER';
export const GET_RANKING = 'GET_RANKING';
export const GET_PLAYER_LOGIN = 'GET_PLAYER_LOGIN';
export const GET_PLAYER_EMAIL = 'GET_PLAYER_EMAIL';
export const UPDATE_TIME = 'UPDATE_TIME';
export const GRAVATAR_IMAGE = 'GRAVATAR_IMAGE';
export const QUESTIONS_ANSWERED ='QUESTIONS_ANSWERED';

export const getRanking = (payload) => ({
  type: GET_RANKING,
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

export const isOver = () => ({
  type: IS_OVER,
  payload: true,
});

export const getPlayerLogin = (payload) => ({
  type: GET_PLAYER_LOGIN,
  payload,
});

export const updateTime = (time) => ({
  type: UPDATE_TIME,
  payload: time,
});

export const getGravatarImage = (payload) => ({
  type: GRAVATAR_IMAGE,
  payload,
});

export const getFinishedQuestions = (payload) => ({
  type: QUESTIONS_ANSWERED,
  payload: true,
});
