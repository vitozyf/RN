import { StatusBar } from "react-native";
import { ISANDROID } from "@src/utils/system";
import { ISIOS } from "@src/utils/system";

export const UserInfo = (state = {}, action) => {
  switch (action.type) {
    case "SetUserInfo":
      return Object.assign({}, state, action.UserInfo);
    case "ClearUserInfo":
      return {
        AvatarPath:
          "http://bom-ai-read.oss-cn-shenzhen.aliyuncs.com/makesureFile/JCNEeK_1540978339916.jpg",
        NickName: "",
        TOKEN: "",
        PhoneNumber: "",
        UserIdentity: {},
        HomeUserInfo: {},
        HomeUserAuthors: {},
      };
    default:
      return state;
  }
};

export const IsTabBarShow = (state = false, action) => {
  switch (action.type) {
    case "SetIsTabBarShow":
      return action.IsTabBarShow;
    default:
      return state;
  }
};
export const HeaderHeight = (state = ISIOS ? 64 : 44, action) => {
  switch (action.type) {
    case "SetHeaderHeight":
      return action.HeaderHeight;
    default:
      return state;
  }
};
export const StatusBarStyle = (state = "light-content", action) => {
  switch (action.type) {
    case "SetStatusBarStyle":
      StatusBar.setBarStyle(action.StatusBarStyle, false);
      if (ISANDROID && action.StatusBarStyle === "light-content") {
        StatusBar.setBackgroundColor("#2C2D31", false);
      } else if (ISANDROID && action.StatusBarStyle === "dark-content") {
        StatusBar.setBackgroundColor("rgba(248,248,248,0.82)", false);
      }
      return action.StatusBarStyle;
    default:
      return state;
  }
};
export const SearchRecord = (state = [], action) => {
  switch (action.type) {
    case "SetSearchRecord":
      return action.SearchRecord;
    default:
      return state;
  }
};
export const BomSearchInfo = (state = {}, action) => {
  switch (action.type) {
    case "SetBomSearchInfo":
      const Yunext = Object.assign(
        {},
        state.Yunext,
        action.BomSearchInfo.Yunext
      );
      const Stocks = Object.assign(
        {},
        state.Stocks,
        action.BomSearchInfo.Stocks
      );
      return Object.assign(
        {},
        state,
        action.BomSearchInfo,
        { Yunext },
        { Stocks }
      );
    default:
      return state;
  }
};
