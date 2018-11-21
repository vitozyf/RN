import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ZnlInput, ZnlButton, HeaderRight } from "@components";
import Icon from "react-native-vector-icons/Ionicons";
import { AppInit } from "@src/utils/appInit";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {
  navigation: INavigation,
  SetUserInfo: Function,
  SetStatusBarStyle: Function,
};
type State = {
  CompanyName: string,
  PhoneNumber: string,
  AccountName: string,
  Password: string,
  LoginType: number,
};
class Login extends Component<Props, Stateå> {
  constructor(props) {
    super(props);
    this.state = {
      CompanyName: "", // 公司名
      PhoneNumber: "", // 手机号
      AccountName: "", // 账号
      Password: "", // 密码
      LoginType: 0, // 登录方式:0 手机号, 1 erp
    };
  }
  static navigationOptions = ({ navigation }) => {
    const goBackHome = () => {
      navigation.navigate("Home");
    };
    const HeaderLeft = (
      <TouchableOpacity
        onPress={goBackHome}
        activeOpacity={0.8}
        style={styles.iconbox}
      >
        <Icon name="md-close" color="#999" size={26} style={styles.icon} />
      </TouchableOpacity>
    );
    return {
      headerLeft: HeaderLeft,
      title: "",
      headerRight: <HeaderRight />,
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
  LoginHandler = () => {
    const { SetUserInfo } = this.props;
    // Cloud.$Loading.show();
    Cloud.$post("user/login", this.state, { loading: true })
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

  render() {
    const { LoginType } = this.state;
    const LoginForm =
      LoginType === 0 ? (
        <View>
          <View style={styles.InputBox}>
            <ZnlInput
              style={styles.znlInputBox}
              inputStyle={styles.Input}
              onChangeText={value => {
                this.onChangeText(value, "PhoneNumber");
              }}
              placeholder="手机号"
              autoFocus={true}
            />
          </View>
          <View style={styles.InputBox}>
            <ZnlInput
              style={styles.znlInputBox}
              inputStyle={styles.Input}
              onChangeText={value => {
                this.onChangeText(value, "Password");
              }}
              placeholder="密码"
              secureTextEntry={true}
            />
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.InputBox}>
            <ZnlInput
              style={styles.znlInputBox}
              inputStyle={styles.Input}
              onChangeText={value => {
                this.onChangeText(value, "CompanyName");
              }}
              placeholder="公司名"
              autoFocus={true}
            />
          </View>
          <View style={styles.InputBox}>
            <ZnlInput
              style={styles.znlInputBox}
              inputStyle={styles.Input}
              onChangeText={value => {
                this.onChangeText(value, "AccountName");
              }}
              placeholder="账号"
            />
          </View>
          <View style={styles.InputBox}>
            <ZnlInput
              style={styles.znlInputBox}
              inputStyle={styles.Input}
              onChangeText={value => {
                this.onChangeText(value, "Password");
              }}
              placeholder="密码"
              secureTextEntry={true}
            />
          </View>
        </View>
      );
    const TitleText = LoginType === 0 ? "手机号登录" : "ERP登录";
    const TitleNav = LoginType === 1 ? "手机号登录 >>" : "ERP登录 >>";
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

          <ZnlButton style={styles.ButtonReg} onPress={this.ToRegister}>
            注册
          </ZnlButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
  componentWillMount() {
    this.props.SetStatusBarStyle("dark-content");
  }
}

const styles = StyleSheet.create({
  Page: {
    backgroundColor: "#fff",
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
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
    fontSize: 28,
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
  },
  ButtonReg: {
    width: "100%",
    height: 48,
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
});
const mapStateToProps = (state, props) => {
  return props;
};
const mapDispatchToProps = dispatch => {
  return {
    SetUserInfo: SetUserInfo => {
      return dispatch(SetUserInfo);
    },
    SetStatusBarStyle: StatusBarStyle => {
      return dispatch({
        type: "SetStatusBarStyle",
        StatusBarStyle,
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
