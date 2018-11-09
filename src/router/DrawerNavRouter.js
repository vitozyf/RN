import React, { Component } from 'react';
import Home from '@router/router-pages/Home'; // 首页
import Login from '@router/router-pages/Login'; // 登录
import Register from '@router/router-pages/Register'; // 注册
import BaseInfo from '@router/router-pages/BaseInfo'; // 基本信息
import Membership from '@router/router-pages/Membership'; // 会员身份
import {
    createDrawerNavigator
} from 'react-navigation';

import CustomDrawerContentComponent from './DrawerContentComponent';

const SimpleAppNavigator = createDrawerNavigator({
  Home: {
    screen: Home,
    path: '/Home'
  },
  Login: {
    screen: Login,
    path: '/Login'
  },
  Register: {
    screen: Register,
    path: '/Register'
  },
  BaseInfo: {
    screen: BaseInfo,
    path: '/BaseInfo'
  },
  Membership: {
    screen: Membership,
    path: '/Membership'
  }
},{
  initialRouteName: 'Home',
  drawerPosition: 'left',
  contentComponent: CustomDrawerContentComponent,
  swipeEnabled: false,
  animationEnabled: true,
  lazy: true,
  tabBarPosition:'bottom',
});

export default SimpleAppNavigator;

