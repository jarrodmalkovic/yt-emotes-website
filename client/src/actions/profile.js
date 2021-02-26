import axios from 'axios';

import { enqueueSnackbar as enqueueSnackbarAction } from './notifications';
import { CLEAR_PROFILE, GET_PROFILE } from './types';

export const getProfile = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://127.0.0.1:5000/api/channels/${userId}`);

    dispatch({ type: GET_PROFILE, payload: res.data.profile });
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

export const clearProfile = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
};
