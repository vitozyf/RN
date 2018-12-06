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
import DdeviceInfo from "react-native-device-info";

const Height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  containerbox: {
    height: Height,
  },
  header: {
    // flexDirection: "row",
    // alignItems: "center",
    height: 120,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    // paddingRight: 10,
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
    borderRadius: 4,
    marginTop: -20,
  },
  headerName: {},
  NickName: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  // UserIdentity: {
  //   paddingLeft: 3,
  //   paddingRight: 3,
  //   backgroundColor: "#048FE0",
  //   color: "#fff",
  //   borderRadius: 3,
  // },
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
    backgroundColor: "#048FE0",
    color: "#fff",
    borderColor: "#048FE0",
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
    // height: Height,
    // justifyContent: 'space-between',
  },
  footer: {
    // backgroundColor: '#f2f2f2',
    position: "absolute",
    bottom: 1,
    height: 50,
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
  // {
  //   key: "Register",
  //   routeName: 'Register'
  // },
  // {
  //   key: "Login",
  //   routeName: 'Login'
  // }
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
  toBaseInfo = () => {
    const { navigation } = this.props;
    navigation.navigate("BaseInfo");
  };
  toMembership = () => {
    const { navigation } = this.props;
    navigation.navigate("Membership");
  };
  getVersionApp() {
    const Version = DdeviceInfo.getVersion();
    const Url = ISDEBUG
      ? "appget/getversioninfo?isDebug=true"
      : "appget/getversioninfo";
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
                <View style={{ paddingLeft: 8 }}>
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
      console.log(err);
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
          onPress={this.toMembership}
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
          onPress={this.toBaseInfo}
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

        <DrawerItems {...this.props} items={items} />
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

    return <ScrollView style={styles.containerbox}>{Container}</ScrollView>;
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
