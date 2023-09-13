import axiosInstance from "../helpers/axios";
import Toast from "react-native-toast-message";
import { verifyConstant } from "./constants";

export const requestCode = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: verifyConstant.CODE_REQUEST });
      const res = await axiosInstance.post(
        `/auth/user/verification/email`,
        data
      );
      if (res.status === 202) {
        dispatch({
          type: verifyConstant.CODE_SUCCESS,
          payload: { msg: res.data.msg, status: res.status },
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: verifyConstant.CODE_FAILURE,
        payload: { msg: data.msg, status: error.response.status },
      });
      Toast.show({
        type: "error",
        text1: `${data.msg}`,
        text2: `Status ${error.response.status}`,
      });
    }
  };
};

export const verifyCode = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: verifyConstant.VERIFY_REQUEST });
      const res = await axiosInstance.post(
        `/auth/user/verification/email/verify`,
        data
      );
      if (res.status === 202) {
        dispatch({
          type: verifyConstant.VERIFY_SUCCESS,
          payload: res.data,
        });
        Toast.show({
          type: "success",
          text1: "Congratulations!",
          text2: `${res.data.msg}`,
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: verifyConstant.VERIFY_FAILURE,
        payload: { msg: data.msg, status: error.response.status },
      });
      Toast.show({
        type: "error",
        text1: `${data.msg}`,
        text2: `Status ${error.response.status}`,
      });
    }
  };
};
