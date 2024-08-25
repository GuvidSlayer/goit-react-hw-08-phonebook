import { useSelector } from 'react-redux';
import {
  selectIsRefreshing,
  selectToken,
  selectUser,
} from '../redux/auth/selectors.js';

export const useAuth = () => {
  return {
    isLoggedIn: useSelector(selectToken),
    isRefreshing: useSelector(selectIsRefreshing),
    user: useSelector(selectUser),
  };
};
