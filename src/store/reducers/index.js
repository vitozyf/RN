import { combineReducers } from "redux";
import * as reducers from "./reducers";
import UserInfo from "./UserInfo";

export default combineReducers({
  ...reducers,
  UserInfo,
});
