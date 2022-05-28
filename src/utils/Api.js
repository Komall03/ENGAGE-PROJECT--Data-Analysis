import axios from 'axios';
import { API_ENDPOINTS } from '../const/ApiEndpoints';

const IntializeAxios = ({ enqueueSnackbar }) => {
  const headersCommonOptions = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const showLoaderEvent = new Event('showLoader', { bubbles: true });
  const hideLoaderEvent = new Event('hideLoader', { bubbles: true });
  let numberOfApiCallsPending = 0;
  axios.defaults.headers.common = headersCommonOptions;
  axios.interceptors.request.use((req) => {
    // `req` is the Axios request config, so you can modify
    // the `headers`.
    const token = localStorage.getItem('token');
    if (token && token !== 'null' && API_ENDPOINTS.BASE_URL.includes(new URL(req.url).host)) {
      req.headers.Authorization = `JWT ${token}`;
      }
      numberOfApiCallsPending += 1;
    if (req?.loader === false) {
      numberOfApiCallsPending = 0;
      document.dispatchEvent(hideLoaderEvent);
    } else {
      document.dispatchEvent(showLoaderEvent);
    }
    return req;
  });

  axios.interceptors.response.use(
    (response) => {
      numberOfApiCallsPending -= 1;
      if (numberOfApiCallsPending <= 0) {
        numberOfApiCallsPending = 0;
        setTimeout(() => {
          document.dispatchEvent(hideLoaderEvent);
        }, 800);
      }
      return response;
    },
    (error) => {
      numberOfApiCallsPending -= 1;
      if (numberOfApiCallsPending === 0) {
        setTimeout(() => {
          document.dispatchEvent(hideLoaderEvent);
        }, 800);
      }
      if (error.response?.data?.msg) {
        enqueueSnackbar(error.response?.data?.msg, {
          variant: 'error',
        });
      }
      return Promise.reject(error);
    },
  );
};

export default IntializeAxios;
