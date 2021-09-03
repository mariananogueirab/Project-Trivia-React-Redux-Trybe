import { ADD_TOKEN, GET_PLAYER_LOGIN, GET_RANKING } from '../actions/index';

const initialState = {
  player: {},
  ranking: [],
  token: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case ADD_TOKEN:
    return { ...state, token: action.payload };
  case GET_PLAYER_LOGIN:
    return { ...state, player: { ...state.player, ...action.payload } };
  case GET_RANKING:
    return { ...state, ranking: [action.payload] };
  default:
    return state;
  }
};

export default user;
