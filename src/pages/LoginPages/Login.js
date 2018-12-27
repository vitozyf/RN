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
  Keyboard,
} from "react-native";
import { ZnlInput, ZnlButton, ZnlHeader } from "@components";
import Icon from "@components/Iconfont/CloudIcon";
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
  showWechat: boolean,
  secureTextEntry: boolean,
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
      showWechat: true,
      secureTextEntry: true, // 密码方式显示
    };
  }
  static navigationOptions = ({ navigation }) => {
    const toHelpPage = () => {
      navigation.push("LoginHelpPage");
    };
    const renderRight = () => {
      return (
        <TouchableOpacity
          style={styles.renderRightButton}
          onPress={toHelpPage}
          activeOpacity={1}
        >
          <Text style={styles.renderRightText}>帮助</Text>
        </TouchableOpacity>
      );
    };
    return {
      header: (
        <ZnlHeader
          hideLeft={true}
          title=""
          style={{ backgroundColor: "#fff" }}
          renderRight={renderRight}
        />
      ),
    };
  };
  ToRegister = () => {
    const { navigation } = this.props;
    navigation.navigate("Register");
  };
  ToChangePwd = () => {
    const { navigation } = this.props;
    navigation.navigate("ChangePwd");
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
  LoginHandler = url => {
    const { SetUserInfo } = this.props;
    Cloud.$Loading.show();
    const {
      CompanyName,
      PhoneNumber,
      AccountName,
      Password,
      OpenId,
      LoginType,
    } = this.state;
    CompanyName &&
      Cloud.$setStorage(Cloud.$CONFIG.LoginCompanyName, CompanyName);
    PhoneNumber &&
      Cloud.$setStorage(Cloud.$CONFIG.LoginPhoneNumber, PhoneNumber);
    AccountName &&
      Cloud.$setStorage(Cloud.$CONFIG.LoginAccountName, AccountName);
    Password && Cloud.$setStorage(Cloud.$CONFIG.LoginPassword, Password);

    let LoginData = {
      CompanyName,
      PhoneNumber,
      AccountName,
      Password,
      LoginType,
    };

    if (!url) {
      Cloud.$post("user/login", LoginData, { loading: false })
        .then(async data => {
          Cloud.$Loading.hidden();
          if (data) {
            await Cloud.$setStorage(
              Cloud.$CONFIG.AvatarPath,
              data.AvatarPath || ""
            );
            await Cloud.$setStorage(
              Cloud.$CONFIG.NickName,
              data.NickName || ""
            );
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
    } else {
      Cloud.$get(url + `?openId=${OpenId}`, null, { loading: false })
        .then(async data => {
          // console.log(333, data);
          Cloud.$Loading.hidden();
          if (data) {
            await Cloud.$setStorage(
              Cloud.$CONFIG.AvatarPath,
              data.AvatarPath || ""
            );
            await Cloud.$setStorage(
              Cloud.$CONFIG.NickName,
              data.NickName || ""
            );
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
    }
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
    let scope = "snsapi_userinfo";
    // let scope = "snsapi_base";
    let state = "wechat_sdk_demo";
    //判断微信是否安装
    wechat.isWXAppInstalled().then(isInstalled => {
      if (isInstalled) {
        //发送授权请求
        wechat
          .sendAuthRequest(scope)
          .then(responseCode => {
            //返回code码，通过code获取access_token
            // this.getAccessToken(responseCode.code);
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
                      OpenId: data.openid,
                    },
                    () => {
                      this.LoginHandler("user/loginwechat");
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

  keyboardDidShowListener = null;
  keyboardDidHideListener = null;

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      showWechat: false,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      showWechat: true,
    });
  };

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
    const { LoginType } = this.state;
    const TitleText = LoginType === 0 ? "手机号登录" : "ERP账号登录";
    const TitleNav = LoginType === 1 ? "手机号登录" : "ERP账号登录";
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
              secureTextEntry={this.state.secureTextEntry}
              onSubmitEditing={this.LoginHandler}
              TReturnKeyType="go"
              defaultValue={this.state.Password}
              renderCloseBtn={this.renderCloseBtn}
            />
          </View>
          <View style={styles.otherLogin}>
            <Text
              style={styles.otherLoginTitle}
              onPress={this.toggleLoginTypeHandler}
            >
              {TitleNav}
            </Text>
            <Text style={styles.changePwd} onPress={this.ToChangePwd}>
              忘记密码?
            </Text>
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
              autoFocus={false}
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
              secureTextEntry={this.state.secureTextEntry}
              onSubmitEditing={this.LoginHandler}
              TReturnKeyType="go"
              defaultValue={this.state.Password}
              renderCloseBtn={this.renderCloseBtn}
            />
          </View>

          <View style={styles.otherLogin}>
            <Text
              style={styles.otherLoginTitle}
              onPress={this.toggleLoginTypeHandler}
            >
              {TitleNav}
            </Text>
            <Text style={styles.changePwd} onPress={this.ToChangePwd}>
              忘记密码?
            </Text>
          </View>
        </View>
      );

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.Page}>
        <View style={styles.pagebox}>
          <View style={styles.Body}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{TitleText}</Text>
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

          <ZnlButton style={styles.ButtonReg} onPress={this.ToRegister}>
            注册
          </ZnlButton>
        </View>
        {this.state.showWechat && (
          <View style={styles.wechatLoginBox}>
            <View style={styles.wechatLoginTitle}>
              <View style={styles.wechatLoginLine} />
              <View>
                <Text style={styles.wechatLoginText}>
                  您还可以使用以下方式登录
                </Text>
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
        )}
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
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 0,
  },
  pagebox: {
    width: 300,
    paddingBottom: 100,
  },
  Body: {
    paddingTop: 24,
  },
  title: {
    paddingBottom: 25,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    lineHeight: 42,
    fontWeight: "500",
    color: "#333",
  },
  otherLogin: {
    paddingBottom: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otherLoginTitle: {
    fontSize: 14,
    color: "#4A90E2",
  },
  changePwd: {
    fontSize: 14,
    color: "#999",
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
    // marginTop: 30,
    // backgroundColor: "#ccc",
    width: 300,
    position: "absolute",
    bottom: 0,
    paddingBottom: 24,
  },
  wechatLoginTitle: {
    height: 50,
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wechatLoginLine: {
    // width: 90,
    flex: 1,
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
  renderRightButton: {
    width: 50,
  },
  renderRightText: {
    color: "#EE7700",
    fontSize: 17,
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
