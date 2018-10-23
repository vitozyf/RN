import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CustomTabComponent} from '@components';

import { 
  createBottomTabNavigator, // 底部
} from 'react-navigation';

import IndexScreen from '@pages/Index';
import ErpScreen from '@pages/Erp';



// tab导航
const navigationOptions = {
  activeTintColor: '#ee7700',
};

const TabNav = createBottomTabNavigator(
  {
    Home: IndexScreen,
    Erp: ErpScreen
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: navigationOptions,
    tabBarComponent: CustomTabComponent
  }
);

const BottomTabNavRouter = class App extends Component {
  render() {
    return (
      <TabNav />
    );
  }
  componentWillMount() {
    const {SetSwitchNav, navigation} = this.props;
    SetSwitchNav(navigation);
  }
}

const mapStateToProps = (state, props) => {
  return props;
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetSwitchNav : (SwitchNav) => {
      return dispatch({
        type: 'SetSwitchNav',
        SwitchNav
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomTabNavRouter);