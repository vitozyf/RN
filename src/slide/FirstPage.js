import React, {Component} from 'react';
import { Provider } from 'react-redux';
import createStore from '../store';
import {connect} from 'react-redux';

import { 
  createStackNavigator, // 带标题
  createSwitchNavigator, // 全屏
  createDrawerNavigator, // 抽屉
  createBottomTabNavigator // 底部
} from 'react-navigation';

import LoginScreen from '../pages/Login';
import IndexScreen from '../pages/Index';
import MineScreen from '../pages/Mine';
import CloudScreen from '../pages/Cloud';

const store = createStore()
const navigationOptions = {
  headerStyle:{
      backgroundColor: '#ee7700'
  },
  headerTintColor: '#fff',
  headerBackTitle: null,
  headerTitleStyle: {
      fontWeight: 'bold',
  },
  drawerLockMode:'locked-closed' 
};

const RootStack = createBottomTabNavigator(
  {
    Home: IndexScreen,
    // Login: LoginScreen,
    Cloud: CloudScreen,
    Mine: MineScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: navigationOptions
  }
);

const AppIndex = class App extends Component {
  static navigationOptions = {
    //tabBarLabel: '页面2',
    drawerLabel:'页面1'
};
  render() {
    // console.log(123, this.props);
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