// @flow
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { ZnlHeader, ZnlCardList, ZnlButton, ZnlModal } from "@components";
import { connect } from "react-redux";
import DeviceInfo from "react-native-device-info";
import Icon from "@components/Iconfont/CloudIcon";

const Version = DeviceInfo.getVersion();
type Props = {
  navigation: INavigation,
  ClearUserInfo: Function,
};
type State = {
  modalVisible: boolean,
};
class Setting extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const onPressIcon = () => {
      navigation.navigate("Home");
    };
    return {
      header: (
        <ZnlHeader
          title="设置"
          style={{ backgroundColor: "#fff" }}
          onPressIcon={onPressIcon}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  getVersionApp() {
    if (Platform.OS === "android") {
      const Url = "appget/getversioninfo";
      Cloud.$get(Url, null, { onlydata: false }).then(data => {
        if (data && data.Code === 200) {
          const ResData = data.Result;
          const downloadUrl = Platform.select({
            ios:
              "https://itunes.apple.com/cn/app/%E7%A5%9E%E5%A5%87%E8%84%91%E6%B3%A2/id882399484?mt=12",
            android: ResData.DownloadUrl,
          });
          if (ResData.Version !== Version) {
            Alert.alert(
              "检测到新版本，是否更新",
              `新版本： ${ResData.Version}`,
              [
                { text: "取消" },
                {
                  text: "确定",
                  onPress: () => {
                    if (Platform.OS === "android") {
                      Linking.openURL(downloadUrl).catch(err => {
                        Cloud.$addLog(
                          "DrawerContentComponent.js-confirmHandler",
                          err.message || err.toString()
                        );
                      });
                    } else if (Platform.OS === "ios") {
                      Cloud.$Toast.show("检测到新版本，请打开应用商店下载");
                    }
                  },
                },
              ]
            );
          } else {
            Cloud.$Toast.show("当前版本为最新版本！");
          }
        }
      });
    }
  }

  _renderRowVersion = item => {
    return (
      <TouchableOpacity
        style={styles.baseRow}
        onPress={item.onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.baseRowTitle}>{item.key}</Text>
        <Text style={styles.baseRowValue}>
          {item.Version && (
            <Text>
              版本{item.Version}
              &nbsp;&nbsp;&nbsp;
            </Text>
          )}
          <Icon name="right_arrow" size={14} style={styles.iconfont} />
        </Text>
      </TouchableOpacity>
    );
  };

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  closeModal = cb => {
    this.setState(
      {
        modalVisible: false,
      },
      () => {
        if (typeof cb === "function") {
          cb();
        }
      }
    );
  };

  logoutHandler = () => {
    const { navigation, ClearUserInfo } = this.props;
    Cloud.$post("user/logout", null, { onlydata: false }).then(data => {
      if (data.Result.isSuccess) {
        this.closeModal(() => {
          Cloud.$clearAllStorage();
          navigation.navigate("Login");
        });
      }
      ClearUserInfo && ClearUserInfo();
    });
  };

  render() {
    const DatasVersion = [
      {
        key: "版本更新",
        Version,
        onPress: this.getVersionApp,
      },
    ];
    const DatasAbout = [
      {
        key: "法律条款与隐私政策",
        onPress: () => {
          // Linking.openURL("https://static.bom.ai/appdownload/about.html").catch(
          //   err => {
          //     Cloud.$addLog(
          //       "DrawerContentComponent.js-confirmHandler",
          //       err.message || err.toString()
          //     );
          //   }
          // );
          this.props.navigation.push("LegalProtection");
        },
      },
      {
        key: "关于我们",
        onPress: () => {
          this.props.navigation.push("About", { Version });
        },
      },
    ];
    const { modalVisible } = this.state;

    return (
      <View style={styles.container}>
        <ZnlCardList datas={DatasVersion} renderRow={this._renderRowVersion} />
        <ZnlCardList datas={DatasAbout} renderRow={this._renderRowVersion} />

        <View style={styles.buttonBox}>
          <ZnlButton style={styles.button} type="warn" onPress={this.openModal}>
            退出登录
          </ZnlButton>
        </View>

        <ZnlModal
          visible={modalVisible}
          title="确定要退出登录吗？"
          value="退出登录后，您将无法查看云价格"
          cancelHandler={this.closeModal}
          confirmHandler={this.logoutHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  buttonBox: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 2,
  },
});
const mapStateToProps = (state, props) => {
  return props;
};
const mapDispatchToProps = dispatch => {
  return {
    ClearUserInfo: () => {
      return dispatch({
        type: "ClearUserInfo",
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
