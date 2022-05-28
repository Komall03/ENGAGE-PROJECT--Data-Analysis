import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { selectAuth, setAuth } from '../state/slices/appSlice';
import { API_ENDPOINTS } from '../const/ApiEndpoints';

const useAuth = () => {
  const { isLoggedIn } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const login = (data) => axios.post(API_ENDPOINTS.BASE_URL + API_ENDPOINTS.AUTH.LOGIN, data).then(
      (res) => {
        dispatch(
          setAuth({
            isLoggedIn: true,
            token: res.data.tokens.access_token,
            refresh: res.data.tokens.refresh_token,
            user: res.data.user,
          }),
        );
        enqueueSnackbar('Login successfully', {
          variant: 'success',
        });
      },
      (err) => {
        throw err;
      },
    );
  const logout = () => {
    dispatch(
      setAuth({
        isLoggedIn: false,
        token: null,
        user: null,
        refresh: null,
      }),
    );
    enqueueSnackbar('Logout successfully', {
      variant: 'error',
    });
  };

  return {
    isLoggedIn,
    login,
    logout,
  };
};
export default useAuth;
