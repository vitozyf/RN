/**
 * 深圳市正能量网络技术有限公司 手机APP
 * @flow
 */
import "./Global";
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "@src/store";
import DrawerNavRouter from "@router/DrawerNavRouter";
import { AppInit } from "@src/utils/appInit";
// import { hubConnection } from "@src/utils/signalr";
import CustomStore from "./src/utils/jumpUtils";
import codePush from "react-native-code-push";
import { ISANDROID, ISIOS } from "@src/utils/system";
import SplashScreen from "react-native-splash-screen";
import {
  getActiveRouteName,
  routerChangeHandler,
} from "@router/routerChangeHandler";
import { View, Text, AppState, Platform, Linking } from "react-native";
import * as wechat from "react-native-wechat";
import config from "./src/utils/config";
import { ErrorBoundary } from "@components";
import {
  openNotificationListener,
  handleAppStateChange,
} from "@src/utils/EventListenersHandler";
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

    // 链接signalr
    // hubConnection();
  }

  componentDidMount() {
    if (ISANDROID && !__DEV__) {
      this.syncImmediate(); //开始检查更新
    }
    // 启动屏结束
    SplashScreen.hide();

    // 监听点开通知事件
    AppInit.JPushModule.addReceiveOpenNotificationListener(
      openNotificationListener
    );
    if (ISIOS) {
      // 应用未启动的通知监听
      AppInit.JPushModule.addOpenNotificationLaunchAppListener(
        openNotificationListener
      );
    }
    // 监听从APP到前台事件
    AppState.addEventListener("change", handleAppStateChange);
  }
  componentWillUnmount() {
    AppInit.JPushModule.removeReceiveOpenNotificationListener(
      openNotificationListener
    );
    if (ISIOS) {
      AppInit.JJPushModule.removeOpenNotificationLaunchAppEventListener(
        openNotificationListener
      );
    }
    AppState.removeEventListener("change", handleAppStateChange);
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
