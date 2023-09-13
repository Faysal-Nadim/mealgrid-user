import axiosInstance from "../helpers/axios";
import { vendorConstant } from "./constants";

export const getVendor = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: vendorConstant.VENDOR_GET_REQUEST });
      const res = await axiosInstance.get(`/vendor/get`);
      if (res.status === 200) {
        const { vendors } = res.data;
        dispatch({
          type: vendorConstant.VENDOR_GET_SUCCESS,
          payload: vendors,
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: vendorConstant.VENDOR_GET_FAILURE,
        payload: { msg: data.msg, status: error.response.status },
      });
    }
  };
};
