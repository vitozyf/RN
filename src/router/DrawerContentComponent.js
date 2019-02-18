import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  Linking,
  Dimensions,
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
if (ISDEBUG) {
  items.push({
    key: "News",
    routeName: "News",
  });
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
              "https://itunes.apple.com/us/app/%E6%AD%A3%E8%83%BD%E9%87%8F%E7%94%B5%E5%AD%90%E7%BD%91/id1443457324?l=zh&ls=1&mt=8",
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
    this.getVersionApp();
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
