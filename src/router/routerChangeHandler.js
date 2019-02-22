import store from "@src/store";
import { BackTop } from "@components";
import { HeaderHeightInit } from "@src/utils/constant";
import { StatusBar } from "react-native";
import { ISANDROID } from "@src/utils/system";

/**
 * 获取当前路由名称
 * @param {*} navigationState
 */
export function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export function routerChangeHandler(routerName) {
  // 是否隐藏下面tab栏
  const IsTabBarShow =
    routerName === "Bom" ||
    routerName === "ErpIndex" ||
    routerName === "PersonalCenter" ||
    routerName === "MessageIndex";
  if (store.getState().IsTabBarShow !== IsTabBarShow) {
    store.dispatch({
      type: "SetIsTabBarShow",
      IsTabBarShow,
    });
  }
  // 状态栏样式

  // 状态栏背景色
  if (routerName === "PersonalCenter") {
    store.dispatch({
      type: "SetStatusBarStyle",
      StatusBarStyle: {
        TextColor: "light-content",
        BackgroundColor: "#EE7700",
      },
    });
  } else {
    const NewTextColor =
      routerName === "Bom" || routerName === "ErpIndex"
        ? "light-content"
        : "dark-content";
    const NewBackgroundColor =
      routerName === "Bom" || routerName === "ErpIndex"
        ? "#2C2D31"
        : "rgba(248,248,248,0.82)";
    const StatusBarStyle = store.getState().StatusBarStyle;
    if (
      StatusBarStyle.TextColor !== NewTextColor ||
      StatusBarStyle.BackgroundColor !== NewBackgroundColor
    ) {
      store.dispatch({
        type: "SetStatusBarStyle",
        StatusBarStyle: {
          TextColor: NewTextColor,
          BackgroundColor: NewBackgroundColor,
        },
      });
    }
  }
  // 允许回到顶部组件显示的路由
  if (
    routerName !== "ErpList" &&
    routerName !== "Yunext" &&
    routerName !== "Stocks"
  ) {
    BackTop.hidden();
  }
  // 允许搜索tab栏隐藏的路由
  if (routerName !== "Yunext" && routerName !== "Stocks") {
    if (store.getState().HeaderHeight !== HeaderHeightInit) {
      store.dispatch({
        type: "SetHeaderHeight",
        HeaderHeight: HeaderHeightInit,
      });
    }
  }
}
