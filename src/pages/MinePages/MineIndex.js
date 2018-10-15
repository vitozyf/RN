import React, {Component} from 'react';
import { View, Text } from 'react-native';
import ZnlButton from '../../components/ZnlButton';

class Cloud extends Component{
  static navigationOptions = ({ navigation }) => {
    return {
      title: '我的',
    };
  };
  render() {
    const {navigation} = this.props;

    return(
      <View>
        <Text>我的</Text>
        <ZnlButton onPress={() => {navigation.navigate('MainLogin')}}>
          跳转到登录
        </ZnlButton>
      </View>
    )
  }
}

export default Cloud; 