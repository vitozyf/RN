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
type State = {
  visible: boolean,
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  syncImmediate() {
    codePush.sync({
      //安装模式
      //ON_NEXT_RESUME 下次恢复到前台时
      //ON_NEXT_RESTART 下一次重启时
      //IMMEDIATE 马上更新
      installMode: codePush.InstallMode.ON_NEXT_RESUME,
      //对话框
      updateDialog: {
        //是否显示更新描述
        appendReleaseDescription: true,
        //更新描述的前缀。 默认为"Description"
        descriptionPrefix: "更新内容：",
        //强制更新按钮文字，默认为continue
        mandatoryContinueButtonLabel: "立即更新",
        //强制更新时的信息. 默认为"An update is available that must be installed."
        mandatoryUpdateMessage: "",
        //非强制更新时，按钮文字,默认为"ignore"
        optionalIgnoreButtonLabel: "稍后",
        //非强制更新时，确认按钮文字. 默认为"Install"
        optionalInstallButtonLabel: "后台更新",
        //非强制更新时，检查到更新的消息文本
        optionalUpdateMessage: "有新版本了，是否更新？",
        //Alert窗口的标题
        title: "更新提示",
      },
    });
  }
  componentWillMount() {
    AppInit(store);
    // codePush.disallowRestart(); //禁止重启
  }
  componentDidMount() {
    if (ISANDROID && !__DEV__) {
      this.syncImmediate(); //开始检查更新
    }
    SplashScreen.hide();
  }
  render() {
    const { visible } = this.state;
    return (
      <Provider store={store}>
        <DrawerNavRouter
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = getActiveRouteName(currentState);
            setIsTabBarShow(currentScreen, store.getState());
          }}
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
