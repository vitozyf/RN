import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  BackHandler,
} from "react-native";
import { ZnlInput, ZnlButton, ZnlHeader } from "@components";
import Icon from "react-native-vector-icons/Ionicons";
import { AppInit } from "@src/utils/appInit";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {
  navigation: INavigation,
  SetUserInfo: Function,
};
type State = {
  CompanyName: string,
  PhoneNumber: string,
  AccountName: string,
  Password: string,
  LoginType: number,
  OpenId: "",
};
class Login extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      CompanyName: "", // 公司名
      PhoneNumber: "", // 手机号
      AccountName: "", // 账号
      Password: "", // 密码
      LoginType: 0, // 登录方式:0 手机号, 1 erp
      OpenId: "",
      IsFreeLogin: true,
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: <ZnlHeader hideLeft={true} title="登录" />,
    };
  };
  ToRegister = () => {
    const { navigation } = this.props;
    navigation.navigate("Register");
  };
  goBackHome = () => {
    const { navigation } = this.props;
    navigation.navigate("Home");
  };
  readLoginInfo = () => {
    Cloud.$getStorage(Cloud.$CONFIG.LoginCompanyName).then(CompanyName => {
      this.setState({ CompanyName });
    });
    Cloud.$getStorage(Cloud.$CONFIG.LoginPhoneNumber).then(PhoneNumber => {
      this.setState({ PhoneNumber });
    });
    Cloud.$getStorage(Cloud.$CONFIG.LoginAccountName).then(AccountName => {
      this.setState({ AccountName });
    });
    Cloud.$getStorage(Cloud.$CONFIG.LoginPassword).then(Password => {
      this.setState({ Password });
    });
  };
  componentWillMount() {
    this.readLoginInfo();
  }
  LoginHandler = () => {
    const { SetUserInfo } = this.props;
    Cloud.$Loading.show();
    const { CompanyName, PhoneNumber, AccountName, Password } = this.state;
    Cloud.$setStorage(Cloud.$CONFIG.LoginCompanyName, CompanyName);
    Cloud.$setStorage(Cloud.$CONFIG.LoginPhoneNumber, PhoneNumber);
    Cloud.$setStorage(Cloud.$CONFIG.LoginAccountName, AccountName);
    Cloud.$setStorage(Cloud.$CONFIG.LoginPassword, Password);

    Cloud.$post("user/login", this.state, { loading: false })
      .then(async data => {
        Cloud.$Loading.hidden();
        if (data) {
          await Cloud.$setStorage(
            Cloud.$CONFIG.AvatarPath,
            data.AvatarPath || ""
          );
          await Cloud.$setStorage(Cloud.$CONFIG.NickName, data.NickName || "");
          await Cloud.$setStorage(
            Cloud.$CONFIG.PhoneNumber,
            this.state.PhoneNumber || ""
          );
          await Cloud.$setStorage(Cloud.$CONFIG.TOKEN, data.Token || "");
          await AppInit({
            dispatch: SetUserInfo,
          });
          this.goBackHome();
        }
      })
      .catch(err => {
        Cloud.$Loading.hidden();
      });
  };
  onChangeText = (value, name) => {
    this.setState({
      [name]: value,
    });
  };
  toggleLoginTypeHandler = () => {
    const { LoginType } = this.state;
    this.setState({
      LoginType: LoginType === 0 ? 1 : 0,
    });
  };
  wechatLoginHandler = () => {
    const { wechat } = this.props;
    // snsapi_userinfo
    let scope = "snsapi_base";
    let state = "wechat_sdk_demo";
    //判断微信是否安装
    wechat.isWXAppInstalled().then(isInstalled => {
      if (isInstalled) {
        // 检查是否支持微信开放接口
        wechat.isWXAppSupportApi().then(isSupport => {
          if (isSupport) {
            //发送授权请求
            wechat
              .sendAuthRequest(scope, Cloud.$CONFIG.ClientSecret)
              .then(responseCode => {
                //返回code码，通过code获取access_token
                // this.getAccessToken(responseCode.code);
                const code = parseInt(res.errCode);
                if (code === 0 && responseCode.code) {
                  // Cloud.$setStorage(Cloud.$CONFIG.TOKEN, responseCode.code);
                  // this.goBackHome();
                  this.setState(
                    {
                      OpenId: responseCode.code,
                    },
                    () => {
                      this.LoginHandler();
                    }
                  );
                } else if (code === -4) {
                  Cloud.$Toast.show("用户拒绝授权");
                } else if (code === -6) {
                  Cloud.$Toast.show("APP签名错误");
                } else if (code === 2) {
                  Cloud.$Toast.show("用户取消授权操作");
                } else {
                  Alert.alert("登录授权失败", code, [{ text: "确定" }]);
                }
                // Alert.alert(
                //   "登录授权成功：",
                //   `${responseCode.code}-${responseCode.errCode}`,
                //   [{ text: "确定" }]
                // );
              })
              .catch(err => {
                Alert.alert("登录授权发生错误：", err.message, [
                  { text: "确定" },
                ]);
              });
          } else {
            Alert.alert("版本不支持", "您的微信版本不支持，请升级微信后再试", [
              { text: "确定" },
            ]);
          }
        });
      } else {
        Platform.OS == "ios"
          ? // ? Alert.alert("没有安装微信", "是否安装微信？", [
            Alert.alert("您未安装微信", "请先安装微信客户端再用微信登录方式", [
              { text: "确定" },
              // { text: "确定", onPress: () => this.installWechat() },
            ])
          : Alert.alert("您未安装微信", "请先安装微信客户端再用微信登录方式", [
              { text: "确定" },
            ]);
      }
    });
  };

  handleBackPress = () => {
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  render() {
    const { LoginType } = this.state;
    const LoginForm =
      LoginType === 0 ? (
        <View>
          <View style={styles.InputBox}>
            <ZnlInput
              key="PhoneNumber"
              style={styles.znlInputBox}
              inputStyle={styles.Input}
              onChangeText={value => {
                this.onChangeText(value, "PhoneNumber");
              }}
              placeholder="手机号"
              autoFocus={false}
              defaultValue={this.state.PhoneNumber}
            />
          </View>
          <View style={styles.InputBox}>
            <ZnlInput
              key="Password"
              style={styles.znlInputBox}
              inputStyle={styles.Input}
              onChangeText={value => {
                this.onChangeText(value, "Password");
              }}
              placeholder="密码"
              secureTextEntry={true}
              onSubmitEditing={this.LoginHandler}
              TReturnKeyType="go"
              defaultValue={this.state.Password}
            />
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.InputBox}>
            <ZnlInput
              key="CompanyName"
              style={styles.znlInputBox}
              inputStyle={styles.Input}
              onChangeText={value => {
                this.onChangeText(value, "CompanyName");
              }}
              placeholder="公司名"
              autoFocus={true}
              defaultValue={this.state.CompanyName}
            />
          </View>
          <View style={styles.InputBox}>
            <ZnlInput
              key="AccountName"
              style={styles.znlInputBox}
              inputStyle={styles.Input}
              onChangeText={value => {
                this.onChangeText(value, "AccountName");
              }}
              placeholder="账号"
              defaultValue={this.state.AccountName}
            />
          </View>
          <View style={styles.InputBox}>
            <ZnlInput
              key="PasswordErp"
              style={styles.znlInputBox}
              inputStyle={styles.Input}
              onChangeText={value => {
                this.onChangeText(value, "Password");
              }}
              placeholder="密码"
              secureTextEntry={true}
              onSubmitEditing={this.LoginHandler}
              TReturnKeyType="go"
              defaultValue={this.state.Password}
            />
          </View>
        </View>
      );
    const TitleText = LoginType === 0 ? "手机号登录" : "ERP登录";
    const TitleNav = LoginType === 1 ? "手机号登录>>" : "ERP登录>>";
    return (
      <KeyboardAwareScrollView style={styles.Page}>
        <View style={styles.Page}>
          <View style={styles.Body}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{TitleText}</Text>
              <Text
                style={styles.otherLoginTitle}
                onPress={this.toggleLoginTypeHandler}
              >
                {TitleNav}
              </Text>
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
            type="light"
            style={styles.ButtonReg}
            onPress={this.ToRegister}
          >
            注册
          </ZnlButton>
        </View>
        <View style={styles.wechatLoginBox}>
          <View style={styles.wechatLoginTitle}>
            <View style={styles.wechatLoginLine} />
            <View>
              <Text style={styles.wechatLoginText}>其他登录方式.</Text>
            </View>
            <View style={styles.wechatLoginLine} />
          </View>
          <View style={styles.wechatLogin}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.wechatLoginHandler}
              style={styles.wechatLoginImg}
            >
              <Image source={require("./img/wechat_ic.png")} />
            </TouchableOpacity>
          </View>
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
    paddingTop: 10,
  },
  Body: {
    paddingTop: 20,
  },
  title: {
    paddingBottom: 50,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
  },
  otherLoginTitle: {
    fontSize: 16,
    color: "#4A90E2",
  },
  InputBox: {
    marginBottom: 16,
  },
  znlInputBox: {
    // width: 360
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  Input: {
    borderWidth: 0,
    paddingLeft: 5,
    // borderBottomWidth: 1,
    // borderColor: "#ccc",
  },
  Button: {
    width: "100%",
    height: 48,
    borderRadius: 2,
  },
  ButtonReg: {
    width: "100%",
    height: 48,
    borderRadius: 2,
    marginTop: 20,
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
  wechatLoginBox: {
    marginTop: 30,
    // backgroundColor: "#ccc",
  },
  wechatLoginTitle: {
    height: 50,
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wechatLoginLine: {
    width: 90,
    height: 1,
    backgroundColor: "#E6E6E6",
    marginLeft: 10,
    marginRight: 10,
  },
  wechatLoginText: {
    color: "#999",
    fontSize: 12,
  },
  wechatLogin: {
    alignItems: "center",
  },
  wechatLoginImg: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
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
)(Login);
