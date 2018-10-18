import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  createStackNavigator, // 带标题
  createSwitchNavigator, // 全屏
  createDrawerNavigator,
  createBottomTabNavigator // 底部
} from 'react-navigation';
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
      <View>
        <Text>我的</Text>
      </View>
    )
  }
}

export default Mine; 