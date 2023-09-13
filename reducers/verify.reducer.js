import { verifyConstant } from "../actions/constants";

const initState = {
  email_sent: false,
  verified: false,
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case verifyConstant.CODE_REQUEST:
      state = {
        ...state,
        loading: true,
        verified: false,
      };
      break;
    case verifyConstant.CODE_SUCCESS:
      state = {
        ...state,
        email_sent: true,
        loading: false,
        verified: false,
      };
      break;
    case verifyConstant.CODE_FAILURE:
      state = {
        ...initState,
        error: action.payload,
        verified: false,
      };
      break;
    case verifyConstant.VERIFY_REQUEST:
      state = {
        ...state,
        loading: true,
        verified: false,
      };
      break;
    case verifyConstant.VERIFY_SUCCESS:
      state = {
        ...state,
        verified: true,
        loading: false,
        error: null,
      };
      break;
    case verifyConstant.VERIFY_FAILURE:
      state = {
        ...initState,
        error: action.payload,
        verified: false,
      };
      break;
  }

  return state;
};
