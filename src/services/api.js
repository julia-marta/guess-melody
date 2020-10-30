import axios from "axios";
import swal from 'sweetalert';

const BASE_URL = `https://5.react.pages.academy/guess-melody`;
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401
};

const {UNAUTHORIZED} = HttpCode;

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (error) => {
    const {response} = error;

    if (response.status === UNAUTHORIZED) {
      onUnauthorized();
    } else {
      swal(`Error`, `Something went wrong!`, `error`);
    }

  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
