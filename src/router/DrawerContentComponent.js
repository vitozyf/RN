import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Linking,
  Dimensions,
  Alert,
} from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import { ISDEBUG, ISANDROID, ISIOS } from "@src/utils/system";
import { ZnlModal } from "@components";
import DeviceInfo from "react-native-device-info";

const Height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  containerbox: {
    flex: 1,
  },
  container: {
    height: Height - 30,
    justifyContent: "space-between",
  },
  DrawerItems: {
    flex: 1,
    justifyContent: "flex-start",
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
  getVersionApp() {
    const Version = DeviceInfo.getVersion();
    const Url = "appget/getversioninfo";
    !__DEV__ &&
      Cloud.$get(Url, null, { onlydata: false }).then(data => {
        if (data.Code === 200) {
          const ResData = data.Result;
          const downloadUrl = ResData.DownloadUrl;
          if (ResData.Version !== Version) {
            const value = ResData.UpdateLog.Content.join("\n");
            this.getVersionAppHandler({
              title: ResData.UpdateLog.Title,
              value,
              DownloadUrl: downloadUrl,
            });
          }
        }
      });
  }
  getVersionAppHandler({ title, value, DownloadUrl }) {
    Alert.alert(title || "更新提示", value || "有新版本，是否更新?", [
      {
        text: "下次更新",
      },
      {
        text: "更新",
        onPress: () => {
          const InstallApk = require("@components/InstallApk").default;
          InstallApk.show(DownloadUrl);
        },
      },
    ]);
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
    const { visible, title, value } = this.state;

    // 自定义区域
    const CustomDrawer = (
      <View style={styles.container}>
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
    // const testarr = ["1, aaa", "2: bbb"];
    // console.log(111, testarr.join("\n"));

    if (ISANDROID) {
      this.getVersionApp();
      // this.getVersionAppHandler({
      //   title: "更新提示",
      //   value: testarr.join("\n"),
      //   DownloadUrl:
      //     "http://admin.bom.ai/chanel/Content/Files/ede45b8d-705b-4dec-a053-427c0e3bb0f7/bomai_1_1_1_1550744651000.apk",
      // });
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
