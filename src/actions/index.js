import getToken from '../services/api';

export const ADD_TOKEN = 'ADD_TOKEN';
export const IS_OVER = 'IS_OVER';

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
