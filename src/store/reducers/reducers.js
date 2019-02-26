import { StatusBar } from "react-native";
import { ISANDROID } from "@src/utils/system";
import { ZnlToast } from "@src/components";
import { HeaderHeightInit } from "@src/utils/constant";
// 底部tab显示
export const IsTabBarShow = (state = false, action) => {
  switch (action.type) {
    case "SetIsTabBarShow":
      return action.IsTabBarShow;
    default:
      return state;
  }
};
// 顶部tab高度
export const HeaderHeight = (state = HeaderHeightInit, action) => {
  switch (action.type) {
    case "SetHeaderHeight":
      return action.HeaderHeight;
    case "HideHeader":
      return 0;
    case "ShowHeader":
      return HeaderHeightInit;
    default:
      return state;
  }
};
export const StatusBarStyle = (
  state = {
    TextColor: "light-content",
    BackgroundColor: "#2C2D31",
  },
  action
) => {
  switch (action.type) {
    case "SetStatusBarStyle":
      // 设置样式（白底黑字/黑底白字）
      StatusBar.setBarStyle(action.StatusBarStyle.TextColor, false);
      // 设置安卓背景色
      if (ISANDROID) {
        StatusBar.setBackgroundColor(
          action.StatusBarStyle.BackgroundColor,
          false
        );
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
export const AppWechatInfo = (state = null, action) => {
  switch (action.type) {
    case "SetAppWechatInfo":
      return action.AppWechatInfo;
    default:
      return state;
  }
};
// 联想用的热搜型号
export const Hotpartnos = (state = [], action) => {
  switch (action.type) {
    case "SetHotpartnos":
      return action.Hotpartnos;
    default:
      return state;
  }
};
// ActiveRouteName
export const ActiveRouteName = (state = "", action) => {
  switch (action.type) {
    case "SetActiveRouteName":
      return action.ActiveRouteName;
    default:
      return state;
  }
};
// 消息列表
export const MessageData = (state = [], action) => {
  switch (action.type) {
    case "SET_MESSAGE_DATA":
      return action.MessageData;
    case "ADD_MESSAGE_DATA":
      const Data = JSON.parse(state);
      Data.unshift(action.Message);
      return Data;
    default:
      return state;
  }
};
