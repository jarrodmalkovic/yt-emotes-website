import { GET_PROFILE, CLEAR_PROFILE } from '../actions/types';

const defaultState = {
  uploadedEmotes: [],
  channelEmotes: [],
  name: '',
  loading: true,
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        uploadedEmotes: [...payload.uploadedEmotes],
        channelEmotes: [...payload.channelEmotes],
        name: payload.name,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        uploadedEmotes: [],
        channelEmotes: [],
        name: '',
        loading: true,
      };
    default:
      return state;
  }
};
