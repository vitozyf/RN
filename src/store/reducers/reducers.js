import { StatusBar } from "react-native";
import { ISANDROID, ISIOS } from "@src/utils/system";
import DeviceInfo from "react-native-device-info";
import { ZnlToast } from "@src/components";
let HeaderHeightInit = 44;
if (ISIOS) {
  switch (DeviceInfo.getModel()) {
    case "iPhone X":
    case "iPhone XR":
    case "iPhone XS":
    case "iPhone XS Max":
      HeaderHeightInit = 88;
      break;
    default:
      HeaderHeightInit = 64;
      break;
  }
}

export const IsTabBarShow = (state = false, action) => {
  switch (action.type) {
    case "SetIsTabBarShow":
      return action.IsTabBarShow;
    default:
      return state;
  }
};
export const HeaderHeight = (state = HeaderHeightInit, action) => {
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
// erp权限
export const ErpUserRoleList = (state = [], action) => {
  switch (action.type) {
    case "SetErpUserRoleList":
      return action.ErpUserRoleList;
    default:
      return state;
  }
};
// app端微信登录后微信信息
export const AppWechatInfo = (state = {}, action) => {
  switch (action.type) {
    case "SetAppWechatInfo":
      return action.AppWechatInfo;
    default:
      return state;
  }
};
export const Hotpartnos = (state = [], action) => {
  switch (action.type) {
    case "SetHotpartnos":
      return action.Hotpartnos;
    default:
      return state;
  }
};
