import React, {Component} from 'react';
import { View, Text, StatusBar } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import ZnlButton from '../components/ZnlButton';
// import Pages from '../router';

class Cloud extends Component{
  static navigationOptions = ({ navigation }) => {
    return {
      title: '云价格',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return <Entypo name={'icloud'} size={ 20 } color={focused ? '#ee7700' : '#333'} />;
      },
    };
  };
  render() {
    const {navigation} = this.props;
    return(
      <View>
        <Text>云价格</Text>
        <StatusBar  
          barStyle="light-content"
          backgroundColor="#6a51ae" />
        <ZnlButton onPress={() => {navigation.navigate('Home')}}>
          跳转到Home
        </ZnlButton>
      </View>
      // <Pages />
    )
  }
}

export default Cloud; 