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
import { ZnlHeader, ZnlCardList, ZnlButton } from "@components";
import { connect } from "react-redux";
import DeviceInfo from "react-native-device-info";
import Icon from "@components/Iconfont/CloudIcon";

const Version = DeviceInfo.getVersion();
type Props = {
  navigation: INavigation,
  ClearUserInfo: Function,
};
type State = {};
class Setting extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const onPressIcon = () => {
      navigation.goBack();
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

  getVersionApp = () => {
    const that = this;
    if (Platform.OS === "android") {
      const Url = "appget/getversioninfo";
      Cloud.$get(Url, null, { onlydata: false }).then(data => {
        if (data && data.Code === 200) {
          const ResData = data.Result;
          const downloadUrl = ResData.DownloadUrl;
          if (ResData.AllowUpdate) {
            // 允许通知
            if (ResData.Version === Version) {
              Cloud.$Toast.show("当前为最新版本！");
            } else {
              const value = ResData.UpdateLog.Content.join("\n");
              that.getVersionAppHandler({
                title: ResData.UpdateLog.Title,
                value,
                DownloadUrl: downloadUrl,
                Version: ResData.Version,
              });
            }
          } else {
            Cloud.$Toast.show("当前为最新版本！");
          }
        }
      });
    } else if (Platform.OS === "ios") {
      Linking.openURL(
        "https://itunes.apple.com/us/app/%E6%AD%A3%E8%83%BD%E9%87%8F%E7%94%B5%E5%AD%90%E7%BD%91/id1443457324?l=zh&ls=1&mt=8"
      ).catch(err => {
        Cloud.$addLog(
          "DrawerContentComponent.js-confirmHandler",
          err.message || err.toString()
        );
      });
    }
  };
  getVersionAppHandler = ({ title, value, DownloadUrl, Version }) => {
    Alert.alert(title || "更新提示", value || "有新版本，是否更新?", [
      {
        text: "下次更新",
      },
      {
        text: "更新",
        onPress: () => {
          const InstallApk = require("@components/InstallApk").default;
          InstallApk.show(DownloadUrl, Version);
        },
      },
    ]);
  };

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
    Alert.alert("确定要退出登录吗？", "退出登录后，您将无法查看云价格?", [
      {
        text: "取消",
      },
      {
        text: "退出",
        onPress: () => {
          this.logoutHandler();
        },
      },
    ]);
  };

  logoutHandler = () => {
    const { navigation, ClearUserInfo } = this.props;
    navigation.goBack(null);
    Cloud.$post("user/logout", null, { onlydata: false }).then(data => {
      if (data.Result.isSuccess) {
        Cloud.$clearAllStorage();
        navigation.navigate("Login");
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
    if (Platform.OS === "ios") {
      DatasVersion.push({
        key: "去评分",
        onPress: this.getVersionApp,
      });
    }
    const DatasAbout = [
      {
        key: "法律条款与隐私政策",
        onPress: () => {
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

    return (
      <View style={styles.container}>
        <ZnlCardList datas={DatasVersion} renderRow={this._renderRowVersion} />
        <ZnlCardList datas={DatasAbout} renderRow={this._renderRowVersion} />

        <View style={styles.buttonBox}>
          <ZnlButton style={styles.button} type="warn" onPress={this.openModal}>
            退出登录
          </ZnlButton>
        </View>
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
