// @flow
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import DeviceInfo from "react-native-device-info";
import { ISIOS, ISDEBUG } from "@src/utils/system";
import { ZnlCardList, ZnlHeader } from "@components";
import Icon from "@components/Iconfont/CloudIcon";
import { HeaderHeightInit, StatusBarHeader } from "@src/utils/constant";
type Props = {
  AvatarPath: string,
  NickName: string,
  CompanyName: string,
  UserIdentity: Object,
  navigation: INavigation,
};
class PersonalCenter extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };
  toPage = (name, parms) => {
    const { navigation } = this.props;
    navigation.navigate(name, parms);
  };
  _renderRow = item => {
    return (
      <TouchableOpacity
        style={styles.baseRow}
        onPress={item.onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.baseRowTitle}>{item.key}</Text>
        <Text style={styles.baseRowValue}>
          <Icon name="right_arrow" size={15} style={[styles.iconfont]} />
        </Text>
      </TouchableOpacity>
    );
  };
  render() {
    const { AvatarPath, NickName, UserIdentity, CompanyName } = this.props;

    // 用户身份
    let UserIdentityView = [];
    for (const key in UserIdentity) {
      let titleClass = "";
      switch (key) {
        case "正品企业":
          titleClass = UserIdentity[key] ? "StockType4" : "StockTypeDis";
          break;
        case "正品物料":
          titleClass = UserIdentity[key] ? "StockType8" : "StockTypeDis";
          break;
        case "订货服务":
          titleClass = UserIdentity[key] ? "StockType5" : "StockTypeDis";
          break;
        case "保证有料":
          titleClass = UserIdentity[key] ? "StockType6" : "StockTypeDis";
          break;
        case "优势推广":
          titleClass = UserIdentity[key] ? "StockType9" : "StockTypeDis";
          break;
        case "品牌替代":
          titleClass = UserIdentity[key] ? "StockType7" : "StockTypeDis";
          break;
        case "ERP会员":
          titleClass = UserIdentity[key] ? "StockTypeErp" : "StockTypeDis";
          break;
        default:
          break;
      }
      UserIdentityView.push(
        <Text
          style={[
            styles.StockTypeCommon,
            titleClass ? styles[titleClass] : null,
            key === "正品企业" ? styles.firstIdebtity : null,
          ]}
          key={key}
        >
          {key}
        </Text>
      );
    }
    let datas = [
      {
        key: "设置",
        onPress: () => {
          this.toPage("Setting");
        },
      },
      {
        key: "帮助",
        onPress: () => {
          this.toPage("HelpPageMem");
        },
      },
      {
        key: "芯扒客",
        onPress: () => {
          this.toPage("News");
        },
      },
    ];
    if (ISDEBUG) {
      datas = datas.concat([
        {
          key: "注册",
          onPress: () => {
            this.toPage("Register");
          },
        },
        {
          key: "登录",
          onPress: () => {
            this.toPage("Login");
          },
        },
        {
          key: "测试",
          onPress: () => {
            this.toPage("TestPage");
          },
        },
      ]);
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              this.toPage("BaseInfo");
            }}
            activeOpacity={1}
            style={[styles.header]}
          >
            <ImageBackground
              source={require("./img/center_bg_texture.png")}
              style={[styles.ImageBackground]}
            >
              <View style={[styles.headerLeft]}>
                <Image
                  style={styles.headerLeftImg}
                  source={
                    AvatarPath ===
                    "https://static.bom.ai/assets/img/linked-head.png"
                      ? require("./img/head-portrait_default_pic.png")
                      : {
                          uri: AvatarPath,
                        }
                  }
                />
                <View>
                  <View>
                    <Text style={[styles.$TextColorWhite, styles.NickName]}>
                      {NickName || " "}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.$TextColorWhite, styles.CompanyName]}>
                      {CompanyName}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.headerRight]}>
                <Text style={styles.baseRowValue}>
                  <Icon
                    name="right_arrow"
                    size={15}
                    style={[styles.$TextColorWhite, styles.iconfont]}
                  />
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View style={styles.MembershipView}>
            <View style={styles.StockTypeBox}>{UserIdentityView}</View>
          </View>

          <View style={[styles.blockview]}>
            <ZnlCardList datas={datas} renderRow={this._renderRow} />
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  $TextColorWhite: {
    color: "#fff",
  },
  container: {
    flex: 1,
  },
  blockview: {
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  header: {
    height: 124 + StatusBarHeader,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    backgroundColor: "#ee7700",
  },
  ImageBackground: {
    width: "100%",
    height: 124 + StatusBarHeader,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingTop: 24 + StatusBarHeader,
  },
  headerLeft: {
    height: 60,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
  },
  headerRight: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  headerLeftImg: {
    marginLeft: 27,
    marginRight: 17,
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  NickName: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 30,
  },
  CompanyName: {
    fontSize: 14,
    fontWeight: "400",
    maxWidth: 200,
  },
  MembershipView: {
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 8,
    paddingRight: 8,
  },
  StockTypeBox: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
    // marginBottom: 10,
    backgroundColor: "#fff",
    paddingLeft: 8,
    paddingRight: 8,
    top: -20,
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { height: 4, width: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
  StockTypeCommon: {
    fontSize: 12,
    paddingLeft: 1,
    paddingRight: 1,
    borderWidth: 1,
    textAlign: "center",
    lineHeight: 20,
    borderRadius: 2,
  },
  firstIdebtity: {
    marginLeft: 0,
  },
  StockType4: {
    color: "#fff",
    backgroundColor: "#FF0000",
    borderColor: "#FF0000",
  },
  StockType6: {
    color: "#ff2200",
    backgroundColor: "#fdf7a0",
    borderColor: "#ffaa00",
  },
  StockType8: {
    color: "#fff",
    backgroundColor: "#ff6200",
    borderColor: "#ff6200",
  },
  StockType5: {
    backgroundColor: "#269AF3",
    color: "#fff",
    borderColor: "#269AF3",
  },
  StockType9: {
    color: "#FFF",
    backgroundColor: "#00bedb",
    borderColor: "#00bedb",
  },
  StockType7: {
    color: "#006DCC",
    backgroundColor: "#CCE7FF",
    borderColor: "#006DCC",
  },
  StockTypeErp: {
    backgroundColor: "#167CDB",
    color: "#fff",
    borderColor: "#167CDB",
  },
  StockTypeDis: {
    backgroundColor: "#ccc",
    color: "#666",
    borderColor: "#ccc",
  },
  settingBtnText: {
    lineHeight: 50,
    textAlign: "center",
  },
  baseRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  baseRowTitle: {
    fontSize: 15,
  },
  baseRowValue: {
    maxWidth: 280,
    fontSize: 15,
    color: "#999",
  },
  iconfont: {
    fontWeight: "bold",
  },
});
const mapStateToProps = (state, props) => {
  return Object.assign(
    {},
    {
      AvatarPath: state.UserInfo.AvatarPath,
      NickName: state.UserInfo.NickName,
      UserIdentity: state.UserInfo.UserIdentity,
      CompanyName: state.UserInfo.HomeUserInfo.CompanyName,
    },
    props
  );
};
export default connect(mapStateToProps)(PersonalCenter);
