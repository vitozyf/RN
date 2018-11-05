import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ZnlHeader, ZnlInput, ZnlButton, HeaderRight} from '@components';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {AppInit} from '@src/utils/appInit'
import { Input } from 'react-native-elements';
console.log(1111, Input)

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
        SmsGuid: ''
    }
  }
//   static navigationOptions = ({ navigation }) => {
//     return {
//       title: '注册',
//     };
//   };
  static navigationOptions = ({ navigation }) => {
    const goBackHome = navigation.getParam('goBackHome');
    const HeaderLeft = (
      <TouchableOpacity
        onPress={goBackHome}
        activeOpacity={0.8}
        style={styles.iconbox}>
        <Icon 
          name='md-close'
          color="#999"
          size={26}
          style={styles.icon}
          >
        </Icon>
      </TouchableOpacity>
    )
    return {
      headerLeft: HeaderLeft,
      title: '注册',
      headerRight: (<HeaderRight />),
    };
  };
  goBackHome = () => {
    const {DrawerNav} = this.props;
    DrawerNav.navigate('Home');
  }
  GetCode = () => {
    const {PhoneNumber} = this.state;
    Cloud.$post('user/sms-challenge', {
        PhoneNumber
    }).then(data => {
      if (data) {
        this.setState({
          SmsGuid: data
        })
        Cloud.$Toast.show('短信已发送');
      }
    })
  }
  RegisterHandler = () => {
    Cloud.$post('user/reg', this.state).then(async (data) => {
      if (data) {
        const {SetUserInfo, DrawerNav} = this.props;
        await Cloud.$setStorage(Cloud.$CONFIG.TOKEN, data.Token || '');
        await Cloud.$setStorage(Cloud.$CONFIG.AvatarPath, data.AvatarPath || '');
        await Cloud.$setStorage(Cloud.$CONFIG.NickName, data.NickName || '');
        await AppInit({
          dispatch: SetUserInfo
        })
        DrawerNav.navigate('Home');
      }
      
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
      <KeyboardAwareScrollView>
        <View style={styles.Page}>
          {/* <ZnlHeader onPressIcon={this.goBackHome}></ZnlHeader> */}
          <View style={styles.Body}>
            {/* <View style={styles.title}>
              <Text style={styles.titleText}>注册</Text>
            </View> */}
            <View>
              {/* <View style={styles.InputBox}>
              <Input
                placeholder='INPUT WITH ICON'
                leftIcon={{ type: 'font-ionicons', name: 'md-close' }}
              />
              </View> */}
              <View style={styles.InputBox}>
                <ZnlInput 
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={(value) => {this.onChangeText(value, 'ContactCompanyName')}}
                  placeholder="公司名称"
                  autoFocus={true}>
                </ZnlInput>
              </View>
              <View style={styles.InputBox}>
                <ZnlInput 
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={(value) => {this.onChangeText(value, 'ContactName')}}
                  placeholder="联系人名称">
                </ZnlInput>
              </View>
              <View style={styles.InputBox}>
                <ZnlInput 
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={(value) => {this.onChangeText(value, 'PhoneNumber')}}
                  placeholder="手机号">
                </ZnlInput>
              </View>
              <View style={styles.InputBoxMessage}>
                <ZnlInput 
                  style={styles.InputMessage}
                  inputStyle={styles.inputIn}
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
                  inputStyle={styles.inputIn}
                  onChangeText={(value) => {this.onChangeText(value, 'AccountName')}}
                  placeholder="账号">
                </ZnlInput>
              </View>
              <View style={styles.InputBox}>
                <ZnlInput 
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={(value) => {this.onChangeText(value, 'Password')}}
                  placeholder="密码"
                  secureTextEntry={true}>
                </ZnlInput>
              </View>
              <View style={styles.InputBox}>
                <ZnlInput 
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={(value) => {this.onChangeText(value, 'Password')}}
                  placeholder="再次输入密码"
                  secureTextEntry={true}>
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
      </KeyboardAwareScrollView>
    )
  }
  componentWillMount() {
    this.props.navigation.setParams({
      goBackHome: this.goBackHome
    })
  }
}

const styles = StyleSheet.create({
  Page: {
    backgroundColor: '#fff',
    flex: 1,
    paddingBottom: 200,
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
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
  },
  inputIn: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  InputMessage: {
    borderWidth: 0,
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
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
  },
  iconbox: {
    marginLeft: 5,
    width: 30,
    marginRight: 10
  },
  icon: {
    lineHeight: 48,
    textAlign: 'center'
  }
})

const mapStateToProps = (state, props) => {
  return Object.assign({}, {DrawerNav: state.Navigations.DrawerNav}, props);
}
const mapDispatchToProps = (dispatch) => {
  return {
    SetUserInfo: (SetUserInfo) => {
      return dispatch(SetUserInfo)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
