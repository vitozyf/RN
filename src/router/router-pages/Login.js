import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ZnlHeader, ZnlInput, ZnlButton} from '@components';
import {AppInit} from '@src/utils/appInit';
import {connect} from 'react-redux';

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
        ContactCompanyName: '', // 公司名
        ContactName: '', // 联系人名称
        PhoneNumber: '', // 手机号
        AccountName: '', // 账号
        Password: '', // 密码
        LoginType: 0 // 登录方式:0 手机号, 1 erp
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: '登录',
    };
  };
  goBackHome = () => {
    const {navigation} = this.props;
    navigation.navigate('Home');
  }
  ToRegister = () => {
    const {navigation} = this.props;
    navigation.navigate('Register');
  }
  LoginHandler = () => {
    const {SetUserInfo} = this.props;
    Cloud.$post('user/login', this.state).then(async (data) => {
      if (data) {
        await Cloud.$setStorage(Cloud.$CONFIG.AvatarPath, data.AvatarPath);
        await Cloud.$setStorage(Cloud.$CONFIG.NickName, data.NickName);
        await Cloud.$setStorage(Cloud.$CONFIG.PhoneNumber, this.state.PhoneNumber);
        await Cloud.$setStorage(Cloud.$CONFIG.TOKEN, data.Token);
        AppInit({
          dispatch: SetUserInfo
        })
        this.goBackHome();
      }
    }).catch(err => {
      console.log(err);
    })
  }
  onChangeText = (value, name) => {
    this.setState({
      [name]: value
    })
  }
  toggleLoginTypeHandler = () => {
    const {LoginType} = this.state;
    this.setState({
      LoginType: LoginType === 0 ? 1 : 0
    })
  }
  
  render() {
    const {LoginType} = this.state;
    const LoginForm = LoginType === 0 ? (
      <View>
        <View style={styles.InputBox}>
          <ZnlInput 
            style={styles.Input}
            onChangeText={(value) => {this.onChangeText(value, 'PhoneNumber')}}
            placeholder="手机号"
            autoFocus={true}>
          </ZnlInput>
        </View>
        <View style={styles.InputBox}>
          <ZnlInput 
            style={styles.Input}
            onChangeText={(value) => {this.onChangeText(value, 'Password')}}
            placeholder="密码"
            secureTextEntry={true}>
          </ZnlInput>
        </View>
      </View>
    ) : (
      <View>
        <View style={styles.InputBox}>
          <ZnlInput 
            style={styles.Input}
            onChangeText={(value) => {this.onChangeText(value, 'ContactCompanyName')}}
            placeholder="公司名"
            autoFocus={true}>
          </ZnlInput>
        </View>
        <View style={styles.InputBox}>
          <ZnlInput 
            style={styles.Input}
            onChangeText={(value) => {this.onChangeText(value, 'AccountName')}}
            placeholder="账号">
          </ZnlInput>
        </View>
        <View style={styles.InputBox}>
          <ZnlInput 
            style={styles.Input}
            onChangeText={(value) => {this.onChangeText(value, 'Password')}}
            placeholder="密码">
          </ZnlInput>
        </View>
      </View>
    )
    const TitleText = LoginType === 0 ? '手机号登录' : 'ERP登录';
    const TitleNav = LoginType === 1 ? '手机号登录>>' : 'ERP登录>>';
    return (
      <View style={styles.Page}>
        <ZnlHeader onPressIcon={this.goBackHome} leftIcon="md-close"></ZnlHeader>
        <View style={styles.Body}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{TitleText}</Text>
            <Text style={styles.otherLoginTitle} onPress={this.toggleLoginTypeHandler}>{TitleNav}</Text>
          </View>
          {LoginForm}
        </View>

        <ZnlButton
          type="main"
          style={styles.Button}
          onPress={this.LoginHandler}
          >
          登录
        </ZnlButton>

        <ZnlButton 
          style={styles.ButtonReg}
          onPress={this.ToRegister}
          >
          注册
        </ZnlButton>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  Page: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  Body: {
    paddingTop: 20,
  },
  title: {
    paddingBottom: 50,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
  },
  otherLoginTitle: {
    fontSize: 16,
    color: '#4A90E2'
  },
  InputBox: {
    marginBottom: 16
  },
  Input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  Button: {
    width: '100%',
    height: 48,
  },
  ButtonReg: {
    width: '100%',
    height: 48,
    marginTop: 20,
  }
})
const mapStateToProps = (state, props) => {
  return props;
}
const mapDispatchToProps = (dispatch) => {
  return {
    SetUserInfo: (SetUserInfo) => {
      return dispatch(SetUserInfo)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);