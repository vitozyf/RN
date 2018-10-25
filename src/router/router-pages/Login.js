import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ZnlHeader, ZnlInput, ZnlButton} from '@components';
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
    $post('user/login', this.state).then(data => {
      if (data) {
        $setStorage($CONFIG.AvatarPath, data.AvatarPath);
        $setStorage($CONFIG.NickName, data.NickName);
        $setStorage($CONFIG.PhoneNumber, this.state.PhoneNumber);
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
  
  render() {
    return (
      <View style={styles.Page}>
        <ZnlHeader onPressIcon={this.goBackHome} leftIcon="md-close"></ZnlHeader>
        <View style={styles.Body}>
          <View style={styles.title}>
            <Text style={styles.titleText}>手机号登录</Text>
            <Text style={styles.titleText}>ERP登录</Text>
          </View>
          <View>
            <View style={styles.InputBox}>
              <ZnlInput 
                style={styles.Input}
                onChangeText={(value) => {this.onChangeText(value, 'PhoneNumber')}}
                placeholder="手机号">
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
  },
  titleText: {
    fontSize: 28,
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

export default Login;