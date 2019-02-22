/**
 * 应用事件监听处理
 * @flow
 */
import { Platform } from "react-native";
import { AppInit } from "@src/utils/appInit";
import CustomStore from "@src/utils/jumpUtils";

// 清空角标
const clearBadge = () => {
  if (Platform.OS == "ios") {
    AppInit.JPushModule.setBadge(0, success => {});
  }
};
// 设置角标
const setBadge = (Badges: number) => {
  if (Platform.OS == "ios") {
    AppInit.JPushModule.setBadge(Badges, success => {});
  }
};
// 点击通知事件处理
const openNotificationListener = (map: any) => {
  clearBadge();
  if (map.extras && map.extras.type === "1") {
    if (CustomStore.navigator) {
      CustomStore.navigator._navigation.navigate("PersonalCenter");
    }
  }
};

// 前后台切换事件处理
const handleAppStateChange = (nextAppState: string) => {
  if (nextAppState === "active") {
    clearBadge();
  }
};

export { clearBadge, openNotificationListener, handleAppStateChange };
