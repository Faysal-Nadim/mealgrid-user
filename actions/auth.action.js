import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../helpers/axios";
import { authConstant } from "./constants";
import Toast from "react-native-toast-message";

export const login = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.LOGIN_REQUEST });
      const res = await axiosInstance.post(`/auth/user/signin`, {
        ...user,
      });
      if (res.status === 200) {
        const { token, user } = res.data;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstant.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
        Toast.show({
          type: "success",
          text1: `Hello ${user.fullName}`,
          text2: `${res.data.msg}`,
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: authConstant.LOGIN_FAILURE,
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

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      dispatch({
        type: authConstant.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstant.LOGIN_FAILURE,
        payload: { error: "Failed to login!" },
      });
    }
  };
};

export const signup = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.SIGNUP_REQUEST });
      const res = await axiosInstance.post(`/auth/user/signup`, data);
      if (res.status === 201) {
        dispatch({
          type: authConstant.SIGNUP_SUCCESS,
          payload: { user: res.data.user, status: res.status },
        });
        Toast.show({
          type: "info",
          text1: `Congratulations!`,
          text2: `${res.data.msg}`,
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: authConstant.SIGNUP_FAILURE,
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

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.LOGOUT_REQUEST });
      const res = await axiosInstance.post(`/auth/user/signout`);
      if (res.status === 200) {
        await AsyncStorage.multiRemove(["token", "user"]);
        dispatch({ type: authConstant.LOGOUT_SUCCESS });
      } else {
        dispatch({
          type: authConstant.LOGOUT_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: authConstant.LOGOUT_FAILURE,
        payload: { error: data },
      });
    }
  };
};
