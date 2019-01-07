import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import { ZnlInput, ZnlButton, ZnlHeader, ZnlProgress } from "@components";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppInit } from "@src/utils/appInit";
import Icon from "@components/Iconfont/CloudIcon";
import DeviceInfo from "react-native-device-info";
import store from "../../store";
const AppUniqueID = DeviceInfo.getUniqueID();
const MobileBrand = DeviceInfo.getBrand();
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
      Time: 0,
      secureTextEntry: true,
      AppOpenID: "",
      AppCode: "",
      IsChangedPhone: false,
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
  wechatLoginHandler = () => {
    // 验证表单
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
    } else if (!AccountName) {
      errMessage = "账号不能为空";
    } else if (!PhoneNumber) {
      errMessage = "手机号不能为空";
    } else if (!SmsCode) {
      errMessage = "短信验证码不能为空";
    } else if (!Password) {
      errMessage = "密码不能为空";
    } else if (Password.length < 6 || Password.length > 16) {
      errMessage = "密码长度6-16位";
    } else if (Password !== RePassword) {
      errMessage = "两次密码输入不一致";
    }
    if (errMessage) {
      return Cloud.$Toast.show(errMessage);
    }
    // 绑定微信
    const { wechat } = this.props;
    let scope = "snsapi_userinfo";
    //判断微信是否安装
    wechat.isWXAppInstalled().then(isInstalled => {
      if (isInstalled) {
        //发送授权请求
        wechat
          .sendAuthRequest(scope)
          .then(responseCode => {
            //返回code码，通过code获取access_token
            const code = parseInt(responseCode.errCode);
            if (code === 0) {
              Cloud.$get(
                `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${
                  Cloud.$CONFIG.appid
                }&secret=${Cloud.$CONFIG.secret}&code=${
                  responseCode.code
                }&grant_type=authorization_code`,
                null,
                {
                  nativeApi: true,
                }
              ).then(data => {
                if (data.openid) {
                  this.setState(
                    {
                      AppOpenID: data.openid,
                      AppCode: responseCode.code,
                    },
                    () => {
                      this.RegisterHandler();
                    }
                  );
                }
              });
            } else if (code === -4) {
              Cloud.$Toast.show("用户拒绝授权");
            } else if (code === -6) {
              Cloud.$Toast.show("APP签名错误");
            } else if (code === 2) {
              Cloud.$Toast.show("用户取消授权操作");
            } else {
              Alert.alert("登录授权失败", code, [{ text: "确定" }]);
            }
          })
          .catch(err => {
            Alert.alert("登录授权发生错误：", err.message, [{ text: "确定" }]);
          });
      } else {
        Alert.alert("您未安装微信", "请先安装微信客户端再用微信登录方式", [
          { text: "确定" },
        ]);
      }
    });
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
      AppOpenID,
      AppCode,
      IsChangedPhone,
    } = this.state;
    const regData = {
      ContactCompanyName,
      ContactName,
      PhoneNumber,
      SmsCode,
      AccountName,
      Password,
      RePassword,
      SmsGuid,
      AppOpenID,
      AppUniqueID,
      MobileBrand,
      AppCode,
      IsChangedPhone,
    };
    Cloud.$post("user/reg", regData, { onlydata: false })
      .then(async data => {
        if (data.Code === 200) {
          const resData = data.Result.Data;
          const info = resData.Data;
          if (resData.Code === 0) {
            const { SetUserInfo, navigation } = this.props;
            await Cloud.$setStorage(Cloud.$CONFIG.TOKEN, info.Token || "");
            await Cloud.$setStorage(
              Cloud.$CONFIG.AvatarPath,
              info.AvatarPath || ""
            );
            await Cloud.$setStorage(
              Cloud.$CONFIG.NickName,
              info.NickName || ""
            );
            await AppInit(store);
            navigation.navigate("Home");
          } else if (resData.Code === 2) {
            // 微信号已经被绑定
            Alert.alert(
              "绑定微信",
              "您的微信已绑定其他账号，是否切换绑定当前账号？",
              [
                {
                  text: "取消",
                },
                {
                  text: "切换绑定",
                  onPress: () => {
                    this.setState(
                      {
                        IsChangedPhone: true,
                      },
                      () => {
                        this.RegisterHandler();
                      }
                    );
                  },
                },
              ]
            );
          } else {
            Cloud.$Toast.show(resData.Message);
          }
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

  renderCloseBtn = () => {
    const { secureTextEntry } = this.state;
    const name = secureTextEntry ? "input_view" : "input_hidden";
    return (
      <Icon.Button
        name={name}
        backgroundColor="#fff"
        color="#ccc"
        size={16}
        borderRadius={0}
        activeOpacity={1}
        iconStyle={{ marginRight: 0 }}
        onPress={() => {
          this.setState({
            secureTextEntry: !secureTextEntry,
          });
        }}
      />
    );
  };

  render() {
    const data = [
      {
        key: 1,
        value: "填写资料",
      },
      {
        key: 2,
        value: "绑定微信",
      },
      {
        key: 3,
        value: "注册完成",
      },
    ];
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.Page}>
        <View style={styles.pagebox}>
          <ZnlProgress data={data} active={1} />
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
                  autoFocus={false}
                />
              </View>
              <View style={styles.InputBox}>
                <ZnlInput
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={value => {
                    this.onChangeText(value, "ContactName");
                  }}
                  placeholder="联系人"
                />
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
                  placeholder="验证码"
                />
                <ZnlButton
                  style={styles.ButtonMessage}
                  textStyle={styles.ButtonMessageText}
                  onPress={this.GetCode}
                  disabled={this.state.Time != 0}
                >
                  {this.state.Time === 0
                    ? "获取验证码"
                    : `${this.state.Time}秒后重发`}
                </ZnlButton>
              </View>
              <View style={styles.InputBox}>
                <ZnlInput
                  style={styles.Input}
                  inputStyle={styles.inputIn}
                  onChangeText={value => {
                    this.onChangeText(value, "Password");
                  }}
                  placeholder="6-16位密码"
                  secureTextEntry={this.state.secureTextEntry}
                  renderCloseBtn={this.renderCloseBtn}
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
                  secureTextEntry={this.state.secureTextEntry}
                  renderCloseBtn={this.renderCloseBtn}
                />
              </View>
            </View>
          </View>

          <ZnlButton
            type="main"
            style={styles.Button}
            onPress={this.wechatLoginHandler}
          >
            下一步
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
  return Object.assign({}, { wechat: state.wechat }, props);
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
