import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Linking,
} from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import { ISDEBUG, ISANDROID, ISIOS } from "@src/utils/system";
import { ZnlModal } from "@components";
import DeviceInfo from "react-native-device-info";

const Height = Dimensions.get("window").height;

// top导航栏初始高度
let FooterPaddingBottom = 0;
if (ISIOS) {
  switch (DeviceInfo.getModel()) {
    case "iPhone X":
    case "iPhone XR":
    case "iPhone XS":
    case "iPhone XS Max":
      FooterPaddingBottom = 44;
      break;
    default:
      FooterPaddingBottom = 0;
      break;
  }
}

const styles = StyleSheet.create({
  containerbox: {
    flex: 1,
  },
  header: {
    height: 120,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  ImageBackground: {
    width: "100%",
    height: 112,
    flexDirection: "row",
    alignItems: "center",
  },
  headerLeftImg: {
    marginLeft: 10,
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 2,
    marginTop: -20,
  },
  headerName: {},
  NickName: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  StockTypeBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 230,
    marginLeft: -5,
  },
  StockTypeCommon: {
    fontSize: 12,
    paddingLeft: 2,
    paddingRight: 2,
    borderWidth: 1,
    textAlign: "center",
    marginLeft: 5,
    marginBottom: 5,
    lineHeight: 16,
    borderRadius: 2,
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
  ioscontainer: {
    // height: '100%'
  },
  container: {
    height: Height - 30,
    justifyContent: "space-between",
  },
  DrawerItems: {
    flex: 1,
    justifyContent: "flex-start",
  },
  footer: {
    height: 50 + FooterPaddingBottom,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingBottom: FooterPaddingBottom,
  },
  settingBtn: {
    width: 100,
    height: 50,
  },
  settingBtnText: {
    lineHeight: 50,
    textAlign: "center",
  },
});

const items = [
  // {
  //   key: "Home",
  //   routeName: 'HOme'
  // },

  {
    key: "BaseInfo",
    routeName: "BaseInfo",
  },
  {
    key: "Membership",
    routeName: "Membership",
  },
  {
    key: "News",
    routeName: "News",
  },
];
if (ISDEBUG) {
  items.push({
    key: "Register",
    routeName: "Register",
  });
  items.push({
    key: "Login",
    routeName: "Login",
  });
  items.push({
    key: "TestPage",
    routeName: "TestPage",
  });
}

class MyScrollView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: "",
      value: "",
      DownloadUrl: "",
    };
  }
  toPage = (name, parms) => {
    const { navigation } = this.props;
    navigation.navigate(name, parms);
  };
  getVersionApp() {
    const Version = DeviceInfo.getVersion();
    const Url = "appget/getversioninfo";
    !__DEV__ &&
      Cloud.$get(Url, null, { onlydata: false }).then(data => {
        if (data.Code === 200) {
          const ResData = data.Result;
          const downloadUrl = Platform.select({
            ios:
              "https://itunes.apple.com/cn/app/%E7%A5%9E%E5%A5%87%E8%84%91%E6%B3%A2/id882399484?mt=12",
            android: ResData.DownloadUrl,
          });
          if (ResData.Version !== Version) {
            const ValueHandler = () => {
              return (
                <View style={{ paddingLeft: 10 }}>
                  {ResData.UpdateLog.Content.map((item, index) => {
                    return (
                      <Text style={{ fontSize: 16 }} key={index}>
                        {item}
                      </Text>
                    );
                  })}
                </View>
              );
            };
            if (ISANDROID) {
              this.setState({
                visible: true,
                title: ResData.UpdateLog.Title,
                value: ValueHandler,
                DownloadUrl: downloadUrl,
              });
            }
          }
        }
      });
  }
  confirmHandler = () => {
    this.setState({
      visible: false,
    });
    Linking.openURL(this.state.DownloadUrl).catch(err => {
      Cloud.$addLog(
        "DrawerContentComponent.js-confirmHandler",
        err.message || err.toString()
      );
    });
  };
  render() {
    const { AvatarPath, NickName, UserIdentity } = this.props;
    const { visible, title, value } = this.state;
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
          style={[styles.StockTypeCommon, styles[titleClass]]}
          key={key}
        >
          {key}
        </Text>
      );
      // }
    }
    // 自定义区域
    const CustomDrawer = (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.toPage("BaseInfo");
          }}
          activeOpacity={1}
          style={styles.header}
        >
          <ImageBackground
            source={require("./img/center_bg_texture.png")}
            style={styles.ImageBackground}
          >
            <Image
              style={styles.headerLeftImg}
              source={{
                uri: AvatarPath,
              }}
            />
            <View style={styles.headerName}>
              <Text style={styles.NickName}>{NickName}</Text>
              <View style={styles.StockTypeBox}>{UserIdentityView}</View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <ZnlModal
          visible={visible}
          title={title}
          value={value}
          cancelText="下次更新"
          confirmText="去更新"
          confirmHandler={this.confirmHandler}
          cancelHandler={() => {
            this.setState({ visible: false });
          }}
        />
        <View style={styles.DrawerItems}>
          <DrawerItems {...this.props} items={items} />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.settingBtn}
            onPress={() => {
              this.toPage("Setting");
            }}
          >
            <Text style={styles.settingBtnText}>设置</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.settingBtn}
            onPress={() => {
              this.toPage("HelpPage", { back: "Home" });
            }}
          >
            <Text style={styles.settingBtnText}>帮助</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    // IOS外层包裹安全区域
    const Container = Cloud.$ISIOS ? (
      <SafeAreaView
        style={styles.ioscontainer}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        {CustomDrawer}
      </SafeAreaView>
    ) : (
      CustomDrawer
    );

    return (
      <ScrollView contentContainerStyle={styles.containerbox}>
        {Container}
      </ScrollView>
    );
  }
  componentDidMount() {
    this.getVersionApp();
  }
}

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

const MyScrollViewWithConnect = connect(mapStateToProps)(MyScrollView);

const CustomDrawerContentComponent = props => {
  const { navigation } = props;
  return <MyScrollViewWithConnect navigation={navigation} {...props} />;
};

export default CustomDrawerContentComponent;
