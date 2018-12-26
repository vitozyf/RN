import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import { ZnlInput, ZnlButton, ZnlHeader } from "@components";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CompanyName: "", // 公司名
      PhoneNumber: "", // 手机号
      Password: "", // 密码
      RePassword: "",
      SmsCode: "", // 短信验证码
      SmsGuid: "",
      Time: 0,
    };
  }
  static navigationOptions = ({ navigation }) => {
    const goBack = () => {
      navigation.navigate("Login");
    };
    return {
      header: (
        <ZnlHeader
          onPressIcon={goBack}
          title=""
          style={{ backgroundColor: "#fff" }}
        />
      ),
    };
  };
  GetCode = () => {
    const { PhoneNumber } = this.state;
    let TimeId = null;
    this.setState(
      {
        Time: 60,
      },
      () => {
        TimeId = setInterval(() => {
          let Time = this.state.Time;
          this.setState(
            {
              Time: Time - 1 < 0 ? 0 : Time - 1,
            },
            () => {
              if (this.state.Time === 0) {
                clearInterval(TimeId);
              }
            }
          );
        }, 1000);
      }
    );
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
      this.setState({
        Time: 0,
      });
      clearInterval(TimeId);
    }
  };
  ChangePwdHandler = () => {
    const {
      CompanyName,
      PhoneNumber,
      Password,
      RePassword,
      SmsCode,
    } = this.state;
    const { navigation } = this.props;
    let errMessage = "";
    if (!PhoneNumber) {
      errMessage = "手机号不能为空";
    } else if (!CompanyName) {
      errMessage = "公司名不能为空";
    } else if (!Password) {
      errMessage = "密码不能为空";
    } else if (Password.length < 6 || Password.length > 16) {
      errMessage = "密码长度6-16位";
    } else if (Password !== RePassword) {
      errMessage = "两次密码输入不一致";
    } else if (!SmsCode) {
      errMessage = "短信验证码不能为空";
    }
    if (errMessage) {
      return Cloud.$Toast.show(errMessage);
    }
    Cloud.$post(
      "user/changedpwd",
      {
        PhoneNumber,
        CompanyName,
        Password,
        SmsGuid: this.state.SmsGuid,
        SmsCode,
      },
      {
        onlydata: false,
      }
    ).then(response => {
      if (
        response.Result &&
        response.Result.Data &&
        response.Result.Data.Code === 0
      ) {
        Cloud.$Toast.show("修改密码成功");
        const timeid = setTimeout(() => {
          navigation.navigate("Login");
          clearTimeout(timeid);
        }, 1000);
      } else {
        Cloud.$Toast.show(response.Result.Data.Message || "修改密码失败");
      }
    });
  };
  onChangeText = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  handleBackPress = () => {
    this.props.navigation.navigate("Login");
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.Page}>
        <View style={styles.pagebox}>
          <View style={styles.title}>
            <Text style={styles.titleText}>修改密码</Text>
          </View>

          <View style={styles.Body}>
            <View>
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
              <View style={styles.InputBox}>
                <ZnlInput
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={value => {
                    this.onChangeText(value, "CompanyName");
                  }}
                  placeholder="公司名称"
                  autoFocus={false}
                />
              </View>
              <View style={styles.InputBox}>
                <ZnlInput
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={value => {
                    this.onChangeText(value, "Password");
                  }}
                  placeholder="6-16位密码"
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
              <View style={styles.InputBoxMessage}>
                <ZnlInput
                  style={styles.InputMessage}
                  inputStyle={styles.inputIn}
                  onChangeText={value => {
                    this.onChangeText(value, "SmsCode");
                  }}
                  placeholder="验证码"
                />
                <ZnlButton
                  style={styles.ButtonMessage}
                  textStyle={styles.ButtonMessageText}
                  onPress={this.GetCode}
                  disabled={this.state.Time != 0}
                >
                  {this.state.Time === 0 ? "获取验证码" : this.state.Time}
                </ZnlButton>
              </View>
            </View>
          </View>

          <ZnlButton
            type="main"
            style={styles.Button}
            onPress={this.ChangePwdHandler}
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
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 10,
  },
  pagebox: {
    width: 300,
    paddingBottom: 100,
  },
  title: {
    paddingTop: 24,
  },
  titleText: {
    fontSize: 30,
    lineHeight: 42,
    fontWeight: "500",
    color: "#333",
  },
  Body: {
    paddingTop: 20,
  },
  InputBox: {
    marginBottom: 4,
  },
  InputBoxMessage: {
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  Input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    height: 48,
  },
  inputIn: {},
  InputMessage: {
    borderWidth: 0,
    borderBottomWidth: 1,
    flex: 1,
  },
  ButtonMessage: {
    height: 40,
    width: 120,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderWidth: 0,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  ButtonMessageText: {
    color: "#2288CC",
    fontSize: 16,
  },
  Button: {
    width: "100%",
    height: 48,
    borderRadius: 2,
    marginTop: 30,
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

export default connect(mapStateToProps)(Register);
