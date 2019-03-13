import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Linking,
} from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import { ISDEBUG, ISANDROID, ISIOS } from "@src/utils/system";
import { ZnlModal } from "@components";
import DeviceInfo from "react-native-device-info";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const items = [];
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
  getVersionApp = url => {
    const Version = DeviceInfo.getVersion();
    const Url = url || "appget/getversioninfo";
    !__DEV__ &&
      Cloud.$get(Url, null, { onlydata: false }).then(data => {
        if (data.Code === 200) {
          const ResData = data.Result;
          // 允许更新
          if (ResData.AllowUpdate) {
            const downloadUrl = ResData.DownloadUrl;
            if (ResData.Version !== Version) {
              const value = ResData.UpdateLog.Content.join("\n");
              this.getVersionAppHandler({
                title: ResData.UpdateLog.Title,
                value,
                DownloadUrl: downloadUrl,
                Version: ResData.Version,
              });
            }
          }
          return;
        }
      });
  };
  getVersionAppHandler = ({ title, value, DownloadUrl, Version }) => {
    Alert.alert(title || "更新提示", value || "有新版本，是否更新?", [
      {
        text: "下次更新",
      },
      {
        text: "更新",
        onPress: () => {
          if (ISANDROID) {
            const InstallApk = require("@components/InstallApk").default;
            InstallApk.show(DownloadUrl, Version);
          } else if (ISIOS) {
            Linking.openURL(
              "https://itunes.apple.com/us/app/%E6%AD%A3%E8%83%BD%E9%87%8F%E7%94%B5%E5%AD%90%E7%BD%91/id1443457324?l=zh&ls=1&mt=8"
            ).catch(err => {
              Cloud.$addLog(
                "DrawerContentComponent.js-confirmHandler",
                err.message || err.toString()
              );
            });
          }
        },
      },
    ]);
  };
  render() {
    return (
      <ScrollView>
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: "always", horizontal: "never" }}
        >
          <DrawerItems {...this.props} />
        </SafeAreaView>
      </ScrollView>
    );
  }
  componentDidMount() {
    // const testarr = ["1, aaa", "2: bbb"];

    if (ISANDROID) {
      this.getVersionApp();
      // this.getVersionAppHandler({
      //   title: "更新提示",
      //   value: testarr.join("\n"),
      //   DownloadUrl:
      //     "http://admin.bom.ai/chanel/Content/Files/ede45b8d-705b-4dec-a053-427c0e3bb0f7/bomai_dev_1_1_6_1552358752000.apk",
      // });
    } else if (ISIOS) {
      this.getVersionApp("appget/getversioninfo?IsIos=true");
    }
  }
}

const mapStateToProps = (state, props) => {
  return props;
};

const MyScrollViewWithConnect = connect(mapStateToProps)(MyScrollView);

const CustomDrawerContentComponent = props => {
  const { navigation } = props;
  return <MyScrollViewWithConnect navigation={navigation} {...props} />;
};

export default CustomDrawerContentComponent;
