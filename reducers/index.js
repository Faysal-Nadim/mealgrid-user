import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import vendorReducer from "./vendor.reducer";
import verifyReducer from "./verify.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  verify: verifyReducer,
  vendor: vendorReducer,
});

export default rootReducer;
