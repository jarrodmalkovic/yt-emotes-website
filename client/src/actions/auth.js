import axios from 'axios';

import { enqueueSnackbar as enqueueSnackbarAction } from './notifications';
import { LOGIN_SUCCESS } from './types';

export const login = () => async (dispatch) => {
  try {
    const res = await axios.get(
      'http://localhost:5000/api/auth/login/success',
      {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      }
    );

    dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });

    dispatch(
      enqueueSnackbarAction({
        message: `Logged in as ${res.data.user.name}`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      })
    );
  } catch (err) {}
};

export const logout = () => async (dispatch) => {
  try {
    const res = await axios.get(
      'http://localhost:5000/api/auth/login/success',
      {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      }
    );

    dispatch({ type: LOGIN_SUCCESS, payload: res.data.user });

    dispatch(
      enqueueSnackbarAction({
        message: `Logged in as ${res.data.user.name}`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success',
        },
      })
    );
  } catch (err) {}
};
