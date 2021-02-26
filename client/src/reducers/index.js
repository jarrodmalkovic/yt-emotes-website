import { combineReducers } from 'redux';

import notifications from './notifications';
import emotes from './emotes';
import user from './user';
import profile from './profile';

export default combineReducers({ notifications, profile, user, emotes });
