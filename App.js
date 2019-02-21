/* @flow */
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "@src/store";
import DrawerNavRouter from "@router/DrawerNavRouter";
import "./Global";
import { AppInit } from "@src/utils/appInit";
import CustomStore from "./src/utils/jumpUtils";
import codePush from "react-native-code-push";
import { ISANDROID } from "@src/utils/system";
import SplashScreen from "react-native-splash-screen";
import {
  getActiveRouteName,
  routerChangeHandler,
} from "@router/routerChangeHandler";
import { View, Text, AppState, Platform, Linking } from "react-native";
import * as wechat from "react-native-wechat";
import config from "./src/utils/config";
import { ErrorBoundary } from "@components";

// 深圳市正能量网络技术有限公司
// 调试模式下刷新到本页
// const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;
// codepush配置
let codePushOptions;
if (ISANDROID && !__DEV__) {
  codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  };
}
type Props = {};
class App extends Component<Props> {
  syncImmediate = () => {
    codePush.sync({
      installMode: codePush.InstallMode.ON_NEXT_RESUME,
    });
  };
  componentWillMount() {
    // 注册微信SDK
    wechat.registerApp(config.appid).then(res => {
      store.dispatch({
        type: "SetWechat",
        wechat,
      });
    });

    // 初始化方法
    AppInit(store, CustomStore);
    // codePush.disallowRestart(); //禁止重启
    store.dispatch({
      type: "SetStatusBarStyle",
      StatusBarStyle: {
        TextColor: "light-content",
        BackgroundColor: "#2C2D31",
      },
    });
  }
  // 清空角标
  clearBadge = () => {
    if (Platform.OS == "ios") {
      AppInit.JPushModule.setBadge(0, success => {});
    }
  };
  // 获取新版本地址
  getversioninfo = () => {
    Cloud.$get("appget/getversioninfo", null, { onlydata: false }).then(
      data => {
        if (data.Code === 200) {
          const ResData = data.Result;
          const downloadUrl = Platform.select({
            ios:
              "https://itunes.apple.com/cn/app/%E7%A5%9E%E5%A5%87%E8%84%91%E6%B3%A2/id882399484?mt=12",
            android: ResData.DownloadUrl,
          });
          Linking.openURL(downloadUrl).catch(err => {
            console.log(err);
          });
        }
      }
    );
  };
  // 点击消息通知
  openNotificationListener = (map: any) => {
    this.clearBadge();
    if (map.extras && map.extras.type === "1") {
      // this.getversioninfo();
    }
  };
  // 前后台切换
  _handleAppStateChange = nextAppState => {
    if (nextAppState === "active") {
      this.clearBadge();
    }
  };
  componentDidMount() {
    if (ISANDROID && !__DEV__) {
      this.syncImmediate(); //开始检查更新
    }
    SplashScreen.hide();

    // 监听点开通知事件
    AppInit.JPushModule.addReceiveOpenNotificationListener(
      this.openNotificationListener
    );
    // 监听从APP到前台事件
    AppState.addEventListener("change", this._handleAppStateChange);
  }
  componentWillUnmount() {
    AppInit.JPushModule.removeReceiveOpenNotificationListener(
      this.openNotificationListener
    );
    AppInit.JPushModule.clearAllNotifications();
    AppState.removeEventListener("change", this._handleAppStateChange);
  }
  render() {
    return (
      <Provider store={store}>
        <ErrorBoundary>
          <DrawerNavRouter
            onNavigationStateChange={(prevState, currentState) => {
              const currentScreen = getActiveRouteName(currentState);
              if (store.getState().ActiveRouteName !== currentScreen) {
                store.dispatch({
                  type: "SetActiveRouteName",
                  ActiveRouteName: currentScreen,
                });
              }
              routerChangeHandler(currentScreen);
            }}
            // persistenceKey={navigationPersistenceKey}
            ref={navigator => {
              CustomStore.navigator = navigator;
            }}
          />
        </ErrorBoundary>
      </Provider>
    );
  }
}

if (ISANDROID && !__DEV__) {
  App = codePush(codePushOptions)(App);
}

export default App;
