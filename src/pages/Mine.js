import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  createStackNavigator, // 带标题
  createSwitchNavigator, // 全屏
  createDrawerNavigator,
  createBottomTabNavigator // 底部
} from 'react-navigation';
import LoginScreen from './Login';
import MineIndexScreen from './MinePages/MineIndex';


const RootStack = createDrawerNavigator(
  {
    MineIndex: MineIndexScreen,
    MainLogin: LoginScreen
  },
  {
    initialRouteName: 'MineIndex',
    drawerWidth: 100,
    drawerPosition: 'right',
    contentOptions: {
      items: ['MineIndex', 'MainLogin'],
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1
      }
    }
  }
);

class Mine extends Component{
  static navigationOptions = ({ navigation }) => {
    return {
      title: '我的',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <Ionicons name={'md-person'} size={ 20 } color={focused ? '#ee7700' : '#333'} />;
      },
    };
  };
  render() {
    return(
      // <View>
      //   <Text>我的</Text>
      // </View>
      <RootStack></RootStack>
    )
  }
}

export default Mine; 