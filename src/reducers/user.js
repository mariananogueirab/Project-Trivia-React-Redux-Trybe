import { ADD_TOKEN, GET_PLAYER_LOGIN, GET_RANKING, IS_OVER,
  UPDATE_TIME, GRAVATAR_IMAGE } from '../actions/index';

const initialState = {
  player: {},
  ranking: [],
  token: '',
  over: false,
  score: 0,
  time: 30,
  assertions: 0,
  picture: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case ADD_TOKEN:
    return { ...state, token: action.payload };
  case IS_OVER:
    return { ...state, over: action.payload };
  case GET_PLAYER_LOGIN:
    return { ...state, player: { ...state.player, ...action.payload } };
  case GET_RANKING:
    return { ...state, ranking: [...state.ranking, action.payload] };
  case UPDATE_TIME:
    return { ...state, time: action.payload };
  case GRAVATAR_IMAGE:
    return { ...state, picture: action.payload };
  default:
    return state;
  }
};

export default user;
