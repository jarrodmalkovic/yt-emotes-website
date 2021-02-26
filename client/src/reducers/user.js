import {
  LOGIN_SUCCESS,
  EMOTE_SUBMITTED,
  EMOTE_ADDED,
  EMOTE_REMOVED,
  EMOTE_DELETED,
} from '../actions/types';

const defaultState = {
  uploadedEmotes: [],
  channelEmotes: [],
  name: '',
  loading: true,
  isAuthenticated: false,
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };
    case EMOTE_SUBMITTED:
      return {
        ...state,
        uploadedEmotes: [...state.uploadedEmotes, payload],
      };
    case EMOTE_ADDED:
      return {
        ...state,
        channelEmotes: [...state.channelEmotes, payload],
      };
    case EMOTE_REMOVED:
      return {
        ...state,
        channelEmotes: state.channelEmotes.filter(
          (emote) => emote._id !== payload._id
        ),
      };
    case EMOTE_DELETED:
      return {
        ...state,
        uploadedEmotes: state.uploadedEmotes.filter(
          (emote) => emote._id !== payload._id
        ),
      };
    default:
      return state;
  }
};
