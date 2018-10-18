import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ZnlButton from '../components/ZnlButton';
import ZnlInput from '../components/ZnlInput';
import {$post} from '../utils';
import {setStorage, removeAllStorage} from '../utils';
import {connect} from 'react-redux';
import CONFIG from '../utils/config';

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      PhoneNumber: '',
      Password: '',
      IsFreeLogin: true
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: '登录',
    };
  };

  componentWillMount() {
    // console.log('login componentWillMount')
    // const didBlurSubscription = this.props.navigation.addListener(
    //   'didBlur',
    //   payload => {
    //     console.debug('didBlur', payload);
    //   }
    // );
  }

  login = () => {
    const {
      SetIsLogin,
      navigation
    } = this.props;
    $post('user/login', {
      PhoneNumber: this.state.PhoneNumber,
      Password: this.state.Password,
      IsFreeLogin: true
    })
    .then(data => {
      if (data) {
        setStorage(CONFIG.TOKEN, data.Token);
        setStorage(CONFIG.AvatarPath, data.AvatarPath);
        setStorage(CONFIG.NickName, data.NickName);
        SetIsLogin(true);
        navigation.navigate('Home');
      } else {
        SetIsLogin(false);
        removeAllStorage();
      }
    })
  }

  onChangeText(value, name) {
    const loginInfo = {};
    loginInfo[name] = value;
    this.setState(loginInfo);
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.titleText}>正能量云平台</Text>
        <ZnlInput 
          placeholder="请输入账号" 
          onChangeText={(value) => this.onChangeText(value, 'PhoneNumber')}
        />
        <ZnlInput 
          placeholder="请输入密码" 
          onChangeText={(value) => this.onChangeText(value, 'Password')}
          onSubmitEditing={this.login}
          secureTextEntry={true}
        />
        <ZnlButton onPress={this.login}>
          登录
        </ZnlButton>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return Object.assign({}, {IsLogin: state.IsLogin}, props);
}

const mapDispatchToProps = (dispatch) => {
  return {
    SetIsLogin: (IsLogin) => {
      return dispatch({
        type: 'SetIsLogin',
        IsLogin
      })
    }
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 80
  }
})
   
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);