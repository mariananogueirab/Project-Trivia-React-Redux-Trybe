import { ADD_TOKEN, IS_OVER } from '../actions/index';

const initialState = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
  ranking: [
    { name: '',
      score: 0,
      picture: '',
    },
  ],
  token: '',
  over: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
  case ADD_TOKEN:
    return { ...state, token: action.payload };
  case IS_OVER:
    return { ...state, over: action.payload };
  default:
    return state;
  }
};

export default user;
