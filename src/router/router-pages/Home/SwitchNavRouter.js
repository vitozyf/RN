import React, {Component} from 'react';
import BottomTabNavRouter from './BottomTabNavRouter';
import SearchStackNavRouter from './SearchStackNavRouter';
// import ErpList from '@pages/ErpPages/ErpList';

import { 
  createSwitchNavigator,
} from 'react-navigation';


const SwitchNav = createSwitchNavigator(
  {
    TabNav: BottomTabNavRouter,
    SearchPage: SearchStackNavRouter,
    // ErpList: ErpList
  },
  {
    initialRouteName: 'TabNav'
  }
)


export default SwitchNav;