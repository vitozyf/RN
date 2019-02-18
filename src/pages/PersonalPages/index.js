// @flow
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { connect } from "react-redux";
import DeviceInfo from "react-native-device-info";
import { ISIOS, ISDEBUG } from "@src/utils/system";
import { ZnlCardList, ZnlHeader } from "@components";
import Icon from "@components/Iconfont/CloudIcon";

type Props = {
  AvatarPath: string,
  NickName: string,
  UserIdentity: Object,
  navigation: INavigation,
};
class PersonalCenter extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <ZnlHeader
          hideLeft={true}
          title=""
          style={{ backgroundColor: "#fff" }}
        />
      ),
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
          <Icon name="right_arrow" size={14} style={styles.iconfont} />
        </Text>
      </TouchableOpacity>
    );
  };
  render() {
    const { AvatarPath, NickName, UserIdentity } = this.props;

    // 用户身份
    let UserIdentityView = [];
    for (const key in UserIdentity) {
      // console.log(key, UserIdentity[key]);
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
      // if (UserIdentity[key]) {
      UserIdentityView.push(
        <Text
          onPress={() => {
            this.toPage("Membership");
          }}
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
      // }
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
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.toPage("BaseInfo");
          }}
          activeOpacity={0.8}
          style={[styles.header, styles.blockview]}
        >
          {/* <ImageBackground
            source={require("./img/center_bg_texture.png")}
            style={styles.ImageBackground}
          > */}
          <Image
            style={styles.headerLeftImg}
            source={{
              uri: AvatarPath,
            }}
          />
          <View style={styles.headerName}>
            <Text style={styles.NickName}>{NickName}</Text>
          </View>
          {/* </ImageBackground> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.toPage("Membership");
          }}
          activeOpacity={0.8}
          style={[styles.blockview, styles.MembershipView]}
        >
          <View style={styles.StockTypeBox}>{UserIdentityView}</View>
        </TouchableOpacity>

        <View style={[styles.blockview]}>
          <ZnlCardList datas={datas} renderRow={this._renderRow} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blockview: {
    backgroundColor: "#fff",
    marginBottom: 10,
    top: -20,
  },
  header: {
    height: 120,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    flexDirection: "row",
    alignItems: "center",
  },
  //   ImageBackground: {
  //     width: "100%",
  //     height: 112,
  //     flexDirection: "row",
  //     alignItems: "center",
  //   },
  headerLeftImg: {
    marginLeft: 20,
    marginRight: 20,
    width: 80,
    height: 80,
    borderRadius: 2,
  },
  headerName: {},
  NickName: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  MembershipView: {},
  StockTypeBox: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around",
    height: 50,
  },
  StockTypeCommon: {
    fontSize: 12,
    paddingLeft: 2,
    paddingRight: 2,
    borderWidth: 1,
    textAlign: "center",
    marginLeft: 5,
    marginBottom: 5,
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
    // backgroundColor: "red",
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
    },
    props
  );
};
export default connect(mapStateToProps)(PersonalCenter);
