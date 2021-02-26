import { GET_EMOTES, CLEAR_EMOTES, EMOTE_DELETED } from '../actions/types';

const defaultState = {
  emotes: [],
  loading: true,
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_EMOTES:
      return {
        ...state,
        emotes: [...state.emotes, ...payload],
        loading: false,
      };
    case CLEAR_EMOTES:
      return {
        ...state,
        emotes: [],
        loading: true,
      };
    case EMOTE_DELETED:
      return {
        ...state,
        emotes: state.emotes.filter((emote) => emote._id !== payload._id),
      };
    default:
      return state;
  }
};
