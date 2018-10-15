import React, {Component} from 'react';
import { Provider } from 'react-redux';
import createStore from './src/store';
import { 
  createStackNavigator, // 带标题
  createSwitchNavigator, // 全屏
  createDrawerNavigator, // 抽屉
  createBottomTabNavigator // 底部
} from 'react-navigation';

import LoginScreen from './src/pages/Login';
import IndexScreen from './src/pages/Index';
import MineScreen from './src/pages/Mine';
import CloudScreen from './src/pages/Cloud';

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
    initialRouteName: 'Cloud',
    navigationOptions: navigationOptions
  }
);

export default class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <RootStack />
      </Provider>
    );
  }
}


// import React, { Component } from 'react';
// import {
//   StyleSheet,
// } from 'react-native';
// import Pages from './src/router';
// export default class App extends Component{
//   render() {
//     return (
//       <Pages/>
//     );
//   }
// }

// const styles = StyleSheet.create({

// });