import React, { Component } from "react";
import Home from "@router/router-pages/Home"; // 首页
import Login from "@router/router-pages/Login"; // 登录
import ChangePwd from "@router/router-pages/ChangePwd"; // 修改密码
import News from "@router/router-pages/News"; // 芯扒客
import Setting from "@router/router-pages/Setting"; // 设置
import Register from "@router/router-pages/Register"; // 注册
import BaseInfo from "@router/router-pages/BaseInfo"; // 基本信息
import Membership from "@router/router-pages/Membership"; // 会员身份
import HelpPage from "@router/router-pages/HelpPage"; // 会员身份
import TestPageScreen from "./router-pages/TestPage"; // 测试页

import { createDrawerNavigator } from "react-navigation";
import CustomDrawerContentComponent from "./DrawerContentComponent";

const SimpleAppNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      path: "/Home",
    },
    Login: {
      screen: Login,
      path: "/Login",
    },
    Register: {
      screen: Register,
      path: "/Register",
    },
    ChangePwd: {
      screen: ChangePwd,
      path: "/ChangePwd",
    },
    News: {
      screen: News,
      path: "/News",
    },
    Setting: {
      screen: Setting,
      path: "/Setting",
    },
    BaseInfo: {
      screen: BaseInfo,
      path: "/BaseInfo",
    },
    Membership: {
      screen: Membership,
      path: "/Membership",
    },
    HelpPage: {
      screen: HelpPage,
      path: "/HelpPage",
    },
    TestPage: TestPageScreen,
  },
  {
    initialRouteName: "Home",
    drawerPosition: "left",
    drawerWidth: 250,
    contentComponent: CustomDrawerContentComponent,
    drawerLockMode: "locked-closed",
    contentOptions: {
      activeTintColor: "#ee7700",
    },
  }
);

export default SimpleAppNavigator;
