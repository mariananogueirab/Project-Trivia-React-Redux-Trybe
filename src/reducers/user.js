import { ADD_TOKEN, GET_PLAYER_LOGIN } from '../actions/index';

const initialState = {
  player: {},
  ranking: [
    { name: '',
      score: 0,
      picture: '',
    },
  ],
  token: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case ADD_TOKEN:
    return { ...state, token: action.payload };
  case GET_PLAYER_LOGIN:
    return { ...state, player: { ...state.player, ...action.payload } };
  default:
    return state;
  }
};

export default user;
