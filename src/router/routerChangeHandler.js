import store from "@src/store";
import { BackTop } from "@components";

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

export function setIsTabBarShow(routerName, currentState) {
  const IsTabBarShow = routerName === "Bom" || routerName === "ErpIndex";
  if (currentState.IsTabBarShow !== IsTabBarShow) {
    store.dispatch({
      type: "SetIsTabBarShow",
      IsTabBarShow,
    });
  }
  const StatusBarStyle =
    routerName === "Bom" || routerName === "ErpIndex"
      ? "light-content"
      : "dark-content";
  if (currentState.StatusBarStyle !== StatusBarStyle) {
    store.dispatch({
      type: "SetStatusBarStyle",
      StatusBarStyle,
    });
  }
  if (
    routerName !== "ErpList" &&
    routerName !== "Yunext" &&
    routerName !== "Stocks"
  ) {
    BackTop.hidden();
  }
}
