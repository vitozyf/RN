import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ZnlButton from '../components/ZnlButton';
import ZnlInput from '../components/ZnlInput';
import {$post} from '../utils';
import {setStorage} from '../utils';
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

  login = () => {
    $post('user/login', {
      PhoneNumber: "13729093675",
      Password: "123456",
      IsFreeLogin: true
    })
    .then(data => {
      if (data.Code === 0) {
        setStorage(CONFIG.TOKEN, data.Data.Token);
        this.props.SetIsLogin(true);
      } else {
        this.props.SetIsLogin(false);
      }
    })
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.titleText}>正能量云平台</Text>
        <ZnlInput placeholder="请输入账号">
        </ZnlInput>
        <ZnlInput placeholder="请输入密码">
        </ZnlInput>
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
    SetIsLogin : (IsLogin) => {
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