import React, {Component} from 'react';
import {connect} from 'react-redux';
import BottomTabNavRouter from './BottomTabNavRouter';
import { 
  createSwitchNavigator,
} from 'react-navigation';

import SearchPageScreen from '@pages/IndexPages/SearchPage';


const SwitchNav = createSwitchNavigator(
  {
    TabNav: BottomTabNavRouter,
    SearchPage: SearchPageScreen
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

const mapStateToProps = (state, props) => {
  return props;
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetDrawerNav : (DrawerNav) => {
      return dispatch({
        type: 'SetDrawerNav',
        DrawerNav
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitchNavRouter);