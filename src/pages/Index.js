import React, {Component} from 'react';
import Bom from './IndexPages/bom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  createStackNavigator
} from 'react-navigation';

const IndexPages = createStackNavigator(
  {
    Bom: {
      screen: Bom,
    }
  },
  {
    initialRouteName: 'Bom',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ee7700',
        height: 48,
        lineHeight: 48,
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 20,
      },
    }
  }
);

export default class Index extends Component{
  static navigationOptions = ({ navigation }) => {
    return {
      title: '首页',
      activeTintColor: '#ee7700',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return (
        <Ionicons 
          name={'md-home'} 
          size={ 20 } 
          color={focused ? '#ee7700' : '#333'} />
        );
      },
    };
  };
  render() {
    // rootnav.openDrawer()
    return (
        <IndexPages></IndexPages>
    )
  }
}