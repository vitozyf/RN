import React, {Component} from 'react';
import { Provider } from 'react-redux';
import createStore from '@src/store';
import {connect} from 'react-redux';
import {CustomTabComponent} from '@components';

import { 
  createBottomTabNavigator // 底部
} from 'react-navigation';

import IndexScreen from '@pages/Index';
import MineScreen from '@pages/Mine';
import CloudScreen from '@pages/Cloud';

const store = createStore()
const navigationOptions = {
  activeTintColor: '#ee7700',
};

const RootStack = createBottomTabNavigator(
  {
    Home: IndexScreen,
    Cloud: CloudScreen,
    Mine: MineScreen
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: navigationOptions,
    tabBarComponent: CustomTabComponent
  }
);

const AppIndex = class App extends Component {
  static navigationOptions = {
    drawerLabel: '首页'
  };
  render() {
    const {SetRootNav, navigation} = this.props;
    SetRootNav(navigation);
    return (
      <Provider store = { store }>
        <RootStack />
      </Provider>
    );
  }
}

const mapStateToProps = (state, props) => {
  return props;
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetRootNav : (rootnav) => {
      return dispatch({
        type: 'SetRootNav',
        rootnav
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppIndex);