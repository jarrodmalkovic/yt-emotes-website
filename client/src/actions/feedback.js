import axios from 'axios';

import { enqueueSnackbar as enqueueSnackbarAction } from './notifications';

export const sendFeedback = (
  firstName,
  lastName,
  email,
  message,
  reason,
  tos
) => async (dispatch) => {
  try {
    if (!tos) {
      return dispatch(
        enqueueSnackbarAction({
          message: 'You must agree to the terms of service and privacy policy',
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error',
          },
        })
      );
    }

    const body = { firstName, lastName, email, message, reason };

    await axios.post('http://localhost:5000/api/feedback', body);

    dispatch(
      enqueueSnackbarAction({
        message: 'Successfully sent contact message!',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      })
    );
  } catch (err) {}
};
