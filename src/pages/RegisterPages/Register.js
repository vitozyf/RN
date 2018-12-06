import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ZnlInput, ZnlButton, ZnlHeader } from "@components";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppInit } from "@src/utils/appInit";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ContactCompanyName: "", // 公司名
      ContactName: "", // 联系人名称
      PhoneNumber: "", // 手机号
      SmsCode: "", // 短信验证码
      AccountName: "", // 账号
      Password: "", // 密码
      RePassword: "",
      SmsGuid: "",
    };
  }
  // static navigationOptions = ({ navigation }) => {
  //   const goBackHome = () => {
  //     navigation.navigate("Home");
  //   };
  //   const HeaderLeft = (
  //     <TouchableOpacity
  //       onPress={goBackHome}
  //       activeOpacity={0.8}
  //       style={styles.iconbox}
  //     >
  //       <Icon name="md-close" color="#999" size={26} style={styles.icon} />
  //     </TouchableOpacity>
  //   );
  //   return {
  //     headerLeft: HeaderLeft,
  //     title: "注册",
  //     headerRight: <HeaderRight />,
  //   };
  // };
  static navigationOptions = ({ navigation }) => {
    const goBack = () => {
      navigation.navigate("Login");
    };
    return {
      header: <ZnlHeader title="注册" onPressIcon={goBack} />,
    };
  };
  GetCode = () => {
    const { PhoneNumber } = this.state;
    if (Cloud.$CONFIG.RegPhoneNumber.test(PhoneNumber)) {
      Cloud.$post("user/sms-challenge", {
        PhoneNumber,
      }).then(data => {
        if (data) {
          this.setState({
            SmsGuid: data,
          });
          Cloud.$Toast.show("短信已发送");
        }
      });
    } else {
      Cloud.$Toast.show("请输入正确的手机号");
    }
  };
  RegisterHandler = () => {
    const {
      ContactCompanyName,
      ContactName,
      PhoneNumber,
      SmsCode,
      AccountName,
      Password,
      RePassword,
      SmsGuid,
    } = this.state;
    let errMessage = "";
    if (!ContactCompanyName) {
      errMessage = "公司名不能为空";
    } else if (!ContactName) {
      errMessage = "联系人不能为空";
    } else if (!PhoneNumber) {
      errMessage = "手机号不能为空";
    } else if (!SmsCode) {
      errMessage = "短信验证码不能为空";
    } else if (!AccountName) {
      errMessage = "账号不能为空";
    } else if (!Password) {
      errMessage = "密码不能为空";
    } else if (Password !== RePassword) {
      errMessage = "两次密码输入不一致";
    }
    if (errMessage) {
      return Cloud.$Toast.show(errMessage);
    }
    Cloud.$post("user/reg", this.state)
      .then(async data => {
        if (data) {
          const { SetUserInfo, navigation } = this.props;
          await Cloud.$setStorage(Cloud.$CONFIG.TOKEN, data.Token || "");
          await Cloud.$setStorage(
            Cloud.$CONFIG.AvatarPath,
            data.AvatarPath || ""
          );
          await Cloud.$setStorage(Cloud.$CONFIG.NickName, data.NickName || "");
          await AppInit({
            dispatch: SetUserInfo,
          });
          navigation.navigate("Home");
        }
      })
      .catch(err => {
        // console.log(222, err);
      });
  };
  onChangeText = (value, name) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    return (
      <KeyboardAwareScrollView style={styles.Page}>
        <View style={styles.Page}>
          <View style={styles.title}>
            <Text style={styles.titleText}>注册账号</Text>
          </View>
          <View style={styles.Body}>
            <View>
              <View style={styles.InputBox}>
                <ZnlInput
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={value => {
                    this.onChangeText(value, "ContactCompanyName");
                  }}
                  placeholder="公司名称"
                  autoFocus={true}
                />
              </View>
              <View style={styles.InputBox}>
                <ZnlInput
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={value => {
                    this.onChangeText(value, "ContactName");
                  }}
                  placeholder="联系人名称"
                />
              </View>
              <View style={styles.InputBox}>
                <ZnlInput
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={value => {
                    this.onChangeText(value, "PhoneNumber");
                  }}
                  placeholder="手机号"
                />
              </View>
              <View style={styles.InputBoxMessage}>
                <ZnlInput
                  style={styles.InputMessage}
                  inputStyle={styles.inputIn}
                  onChangeText={value => {
                    this.onChangeText(value, "SmsCode");
                  }}
                  placeholder="短信验证码"
                />
                <ZnlButton
                  style={styles.ButtonMessage}
                  textStyle={styles.ButtonMessageText}
                  onPress={this.GetCode}
                >
                  获取验证码
                </ZnlButton>
              </View>
              <View style={styles.InputBox}>
                <ZnlInput
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={value => {
                    this.onChangeText(value, "AccountName");
                  }}
                  placeholder="账号"
                />
              </View>
              <View style={styles.InputBox}>
                <ZnlInput
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={value => {
                    this.onChangeText(value, "Password");
                  }}
                  placeholder="密码"
                  secureTextEntry={true}
                />
              </View>
              <View style={styles.InputBox}>
                <ZnlInput
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={value => {
                    this.onChangeText(value, "RePassword");
                  }}
                  placeholder="再次输入密码"
                  secureTextEntry={true}
                />
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
    );
  }
}

const styles = StyleSheet.create({
  Page: {
    backgroundColor: "#fff",
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
  },
  title: {
    paddingBottom: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
  },
  Body: {
    paddingTop: 20,
  },
  InputBox: {
    marginBottom: 16,
  },
  InputBoxMessage: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  Input: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  inputIn: {},
  InputMessage: {
    borderWidth: 0,
    borderBottomWidth: 1,
    // borderColor: '#ccc',
    // width: 200,
    flex: 1,
  },
  ButtonMessage: {
    height: 40,
    borderRadius: 2,
    width: 120,
    backgroundColor: "#fff",
    borderWidth: 1,
    justifyContent: "center",
    marginLeft: 10,
    // flex: 1
  },
  ButtonMessageText: {
    color: "#999",
    borderColor: "#999",
  },
  Button: {
    width: "100%",
    height: 48,
    borderRadius: 2,
  },
  iconbox: {
    marginLeft: 5,
    width: 30,
    marginRight: 10,
  },
  icon: {
    lineHeight: 48,
    textAlign: "center",
  },
});

const mapStateToProps = (state, props) => {
  return props;
};
const mapDispatchToProps = dispatch => {
  return {
    SetUserInfo: SetUserInfo => {
      return dispatch(SetUserInfo);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
