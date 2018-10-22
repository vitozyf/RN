import React, {Component} from 'react';
import { View, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

class Cloud extends Component{
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'ERP',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <Entypo name={'icloud'} size={ 20 } color={focused ? '#ee7700' : '#333'} />;
      },
    };
  };
  render() {
    return(
      <View>
        <Text>云价格</Text>
      </View>
    )
  }
}

export default Cloud; 