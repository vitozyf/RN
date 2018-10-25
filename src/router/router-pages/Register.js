import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ZnlHeader, ZnlInput, ZnlButton} from '@components';
// import {$post} from '@src/utils';
class Register extends Component{
  constructor(props) {
    super(props);
    this.state = {
        ContactCompanyName: '', // 公司名
        ContactName: '', // 联系人名称
        PhoneNumber: '', // 手机号
        SmsCode: '', // 短信验证码
        AccountName: '', // 账号
        Password: '', // 密码
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: '注册',
    };
  };
  goBackHome = () => {
    const {navigation} = this.props;
    navigation.navigate('Home');
  }
  GetCode = () => {
    console.log('messageCode')
  }
  RegisterHandler = () => {
    console.log('RegisterHandler', this.state);
    $post('user/reg', this.state).then(data => {
      console.log(111, data);
    }).catch(err => {
      console.log(222, err);
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
        <ZnlHeader onPressIcon={this.goBackHome}></ZnlHeader>
        <View style={styles.Body}>
          <View style={styles.title}>
            <Text style={styles.titleText}>注册</Text>
          </View>
          <View>
            <View style={styles.InputBox}>
              <ZnlInput 
                style={styles.Input}
                onChangeText={(value) => {this.onChangeText(value, 'ContactCompanyName')}}
                placeholder="公司名称">
              </ZnlInput>
            </View>
            <View style={styles.InputBox}>
              <ZnlInput 
                style={styles.Input}
                onChangeText={(value) => {this.onChangeText(value, 'ContactName')}}
                placeholder="联系人名称">
              </ZnlInput>
            </View>
            <View style={styles.InputBox}>
              <ZnlInput 
                style={styles.Input}
                onChangeText={(value) => {this.onChangeText(value, 'PhoneNumber')}}
                placeholder="手机号">
              </ZnlInput>
            </View>
            <View style={styles.InputBoxMessage}>
              <ZnlInput 
                style={styles.InputMessage}
                onChangeText={(value) => {this.onChangeText(value, 'SmsCode')}}
                placeholder="短信验证码">
              </ZnlInput>
              <ZnlButton
               style={styles.ButtonMessage}
               textStyle={styles.ButtonMessageText}
               onPress={this.GetCode}>
                获取验证码
              </ZnlButton>
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
        </View>

        <ZnlButton
          type="main"
          style={styles.Button}
          onPress={this.RegisterHandler}
          >
          确定
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
    paddingBottom: 20,
  },
  titleText: {
    fontSize: 28,
  },
  InputBox: {
    marginBottom: 16
  },
  InputBoxMessage: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  InputMessage: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    // width: 200,
    flex: 1
  },
  ButtonMessage: {
    height: 32,
    borderRadius: 10,
    width: 120,
    backgroundColor: '#fff',
    borderWidth: 1,
    justifyContent: 'center',
    marginLeft: 10,
    // flex: 1
  },
  ButtonMessageText: {
    color: '#999',
    borderColor: '#999',
  },
  Button: {
    width: '100%',
    height: 48,
  }
})

export default Register;