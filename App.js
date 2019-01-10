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
  setIsTabBarShow,
} from "@router/routerChangeHandler";
import { View, Text } from "react-native";
import * as wechat from "react-native-wechat";
import config from "./src/utils/config";

// 深圳市正能量网络技术有限公司
// 调试模式下刷新到本页
const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV" : null;
// codepush配置
let codePushOptions;
if (ISANDROID && !__DEV__) {
  codePushOptions = {
    //设置检查更新的频率
    //ON_APP_RESUME APP恢复到前台的时候
    //ON_APP_START APP开启的时候
    //MANUAL 手动检查
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  };
}
type Props = {};

class App extends Component<Props> {
  syncImmediate() {
    codePush.sync({
      //安装模式
      //ON_NEXT_RESUME 下次恢复到前台时
      //ON_NEXT_RESTART 下一次重启时
      //IMMEDIATE 马上更新
      installMode: codePush.InstallMode.ON_NEXT_RESUME,
      //对话框
      // updateDialog: {
      //   //是否显示更新描述
      //   appendReleaseDescription: true,
      //   //更新描述的前缀。 默认为"Description" 更新内容
      //   descriptionPrefix: "",
      //   //强制更新按钮文字，默认为continue
      //   mandatoryContinueButtonLabel: "立即更新",
      //   //强制更新时的信息. 默认为"An update is available that must be installed."
      //   mandatoryUpdateMessage: "",
      //   //非强制更新时，按钮文字,默认为"ignore"
      //   optionalIgnoreButtonLabel: "稍后",
      //   //非强制更新时，确认按钮文字. 默认为"Install"
      //   optionalInstallButtonLabel: "后台更新",
      //   //非强制更新时，检查到更新的消息文本
      //   optionalUpdateMessage: "",
      //   //Alert窗口的标题
      //   title: "有新版本了，是否更新？",
      // },
    });
  }
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
      StatusBarStyle: "light-content",
    });
  }
  openNotificationListener = (map: any) => {
    console.log("Opening notification!");
    console.log("map.extra: " + map.extras);
    // Cloud.$Toast.show("map.extra: " + map.extras);
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
  }
  componentWillUnmount() {
    // 移除事件
    AppInit.JPushModule.removeReceiveOpenNotificationListener(
      this.openNotificationListener
    );
    AppInit.JPushModule.clearAllNotifications();
  }
  render() {
    return (
      <Provider store={store}>
        <DrawerNavRouter
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = getActiveRouteName(currentState);
            setIsTabBarShow(currentScreen, store.getState());
          }}
          // persistenceKey={navigationPersistenceKey}
          ref={navigator => {
            CustomStore.navigator = navigator;
          }}
        />
      </Provider>
    );
  }
}

if (ISANDROID && !__DEV__) {
  App = codePush(codePushOptions)(App);
}

export default App;
