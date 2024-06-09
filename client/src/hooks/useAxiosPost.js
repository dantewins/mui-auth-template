import { useCallback } from 'react';
import Swal from 'sweetalert2';

import { axiosPrivate as axios } from 'api/axios';

// ==============================|| AXIOS POST HOOKS  ||============================== //

const useAxiosPost = () => {
  const axiosPostRequest = useCallback(async (url, data, headers, successCallback, errorCallback) => {
    try {
      const response = await axios.post(url, data, headers);

      successCallback();

      await Swal.fire({
        title: response.data.title || 'Success',
        text: response.data.message || 'Operation successful!',
        icon: 'success',
        confirmButtonText: 'Ok!',
      });

      return response.data;
    } catch (err) {
      typeof errorCallback == "function" ? errorCallback() : successCallback();

      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong!';

      await Swal.fire({
        title: 'Operation Failed!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok!',
      });

      throw err;
    }
  }, []);

  return axiosPostRequest;
};

export default useAxiosPost;