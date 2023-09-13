import { vendorConstant } from "../actions/constants";

const initState = {
  vendors: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case vendorConstant.VENDOR_GET_REQUEST:
      state = {
        loading: true,
      };
      break;
    case vendorConstant.VENDOR_GET_SUCCESS:
      state = {
        loading: false,
        error: null,
        vendors: action.payload,
      };
      break;
    case vendorConstant.VENDOR_GET_FAILURE:
      state = {
        loading: false,
        error: action.payload,
      };
      break;
  }
  return state;
};
