import { combineReducers } from "redux";
import * as reducers from "./reducers";
import UserInfo from "./UserInfo";
import wechat from "./wechat";

export default combineReducers({
  ...reducers,
  UserInfo,
  wechat,
});
