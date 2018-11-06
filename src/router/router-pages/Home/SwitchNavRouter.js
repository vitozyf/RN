import React, {Component} from 'react';
import {connect} from 'react-redux';
import BottomTabNavRouter from './BottomTabNavRouter';
import SearchStackNavRouter from './SearchStackNavRouter';
import ErpList from '@pages/ErpPages/ErpList';

import { 
  createSwitchNavigator,
} from 'react-navigation';


const SwitchNav = createSwitchNavigator(
  {
    TabNav: BottomTabNavRouter,
    SearchPage: SearchStackNavRouter,
    ErpList: ErpList
  },
  {
    initialRouteName: 'TabNav'
  }
)

const SwitchNavRouter = class App extends Component {
  render() {
    return (
      <SwitchNav />
    );
  }
}


export default connect(
  // mapStateToProps
)(SwitchNavRouter);