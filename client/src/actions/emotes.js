import axios from 'axios';

import { enqueueSnackbar as enqueueSnackbarAction } from './notifications';
import {
  GET_EMOTES,
  EMOTE_SUBMITTED,
  CLEAR_EMOTES,
  EMOTE_REMOVED,
  EMOTE_DELETED,
  EMOTE_ADDED,
} from './types';

export const submitEmote = (
  largeImg,
  emoteName,
  descriptionForApproval,
  tos,
  guidelines,
  captcha,
  history
) => async (dispatch) => {
  try {
    if (
      !captcha ||
      !tos ||
      !guidelines ||
      Object.entries(largeImg).length === 0
    ) {
      if (!captcha) {
        dispatch(
          enqueueSnackbarAction({
            message: `You must complete the captcha to submit an emote`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }

      if (!tos) {
        dispatch(
          enqueueSnackbarAction({
            message: `You must agree to the Terms of Service to submit an emote`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }

      if (!guidelines) {
        dispatch(
          enqueueSnackbarAction({
            message: `You must agree to the emote guidelines to submit an emote`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }

      if (Object.entries(largeImg).length === 0) {
        dispatch(
          enqueueSnackbarAction({
            message: `You must upload an image`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }

      return;
    }

    const formData = new FormData();
    formData.append('image', largeImg);

    const imageRes = await axios.post(
      'http://127.0.0.1:5000/api/imageUpload',
      formData,
      {
        headers: {
          'Content-Type': formData.get('image').type,
        },
      }
    );

    const body = {
      emoteName,
      largeImgUrl: imageRes.data.largeImgUrl,
      smallImgUrl: imageRes.data.smallImgUrl,
      descriptionForApproval,
    };

    const res = await axios.post('http://localhost:5000/api/emotes', body, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    });

    history.push('/submissions');
    dispatch({ type: EMOTE_SUBMITTED, payload: res.data.emote });
    dispatch(
      enqueueSnackbarAction({
        message: `Emote "${emoteName}" submitted for approval!`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      })
    );
  } catch (err) {
    console.log(err.response);
    dispatch(
      enqueueSnackbarAction({
        message: err.response.data.message,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
        },
      })
    );
  }
};

export const getEmotes = (search = '?', page, limit) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:5000/api/emotes${search}&page=${page}&limit=${limit}`
    );

    dispatch({ type: GET_EMOTES, payload: res.data.emotes });
  } catch (err) {
    console.log(err.response);
    dispatch(
      enqueueSnackbarAction({
        message: 'Error fetching emotes, please refresh',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
        },
      })
    );
  }
};

export const clearEmotes = () => async (dispatch) => {
  dispatch({ type: CLEAR_EMOTES });
};

export const addEmoteToChannel = (emoteId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/emotes/${emoteId}/add`,
      null,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      }
    );

    dispatch({ type: EMOTE_ADDED, payload: res.data.emote });

    dispatch(
      enqueueSnackbarAction({
        message: `Emote "${res.data.emote.emoteName}" added to your channel!`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      })
    );
  } catch (err) {
    dispatch(
      enqueueSnackbarAction({
        message: err.response.data.message,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
        },
      })
    );
  }
};

export const removeEmoteFromChannel = (emoteId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/emotes/${emoteId}/remove`,
      { emoteId },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      }
    );

    dispatch({ type: EMOTE_REMOVED, payload: res.data.emote });

    dispatch(
      enqueueSnackbarAction({
        message: `Emote "${res.data.emote.emoteName}" removed from your channel!`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      })
    );
  } catch (err) {
    dispatch(
      enqueueSnackbarAction({
        message: err.response.data.message,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
        },
      })
    );
  }
};

export const deleteEmoteFromDatabase = (emoteId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/emotes/${emoteId}/delete`,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      }
    );
    dispatch({ type: EMOTE_DELETED, payload: res.data.emote });

    dispatch(
      enqueueSnackbarAction({
        message: `Emote "${res.data.emote.emoteName}" deleted from YTEmotes!`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      })
    );
  } catch (err) {
    console.log(err.response);
    dispatch(
      enqueueSnackbarAction({
        message: err.response.data.message,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'error',
        },
      })
    );
  }
};
