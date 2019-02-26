// @flow
import React, { Component } from "react";
import { View, StyleSheet, Text, Linking, Image } from "react-native";
import { ZnlHeader } from "@components";
import { connect } from "react-redux";
import DeviceInfo from "react-native-device-info";
import Icon from "@components/Iconfont/CloudIcon";

type Props = {
  navigation: INavigation,
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
          title="关于我们"
          style={{ backgroundColor: "#fff" }}
          onPressIcon={onPressIcon}
        />
      ),
    };
  };

  render() {
    const Version = DeviceInfo.getVersion();
    return (
      <View style={styles.container}>
        <View style={[styles.logoBox, styles.flexCenter]}>
          <Image style={styles.logo} source={require("./img/icon-60.png")} />
        </View>
        <View style={styles.flexCenter}>
          <Text style={styles.header}>正能量电子网</Text>
        </View>
        <View style={styles.flexCenter}>
          <Text style={styles.color999}>V{Version}</Text>
        </View>

        <View style={[styles.componentBox, styles.flexCenter]}>
          <Text style={styles.component}>深圳市正能量网络技术有限公司</Text>
        </View>

        <View style={[styles.row, styles.flexCenter]}>
          <Text style={styles.textSmall}>官方网站： https://www.bom.ai</Text>
        </View>
        <View style={[styles.row, styles.flexCenter]}>
          <Text style={styles.textSmall}>微信公众号： 正能量大数据</Text>
        </View>
        <View style={[styles.row, styles.flexCenter]}>
          <Text style={styles.textSmall}>
            客服热线：
            <Text
              style={[styles.telText]}
              onPress={() => {
                Linking.openURL("tel:400-699-2899");
              }}
            >
              <Icon name="phone_ic" size={16} />
              400-699-2899
            </Text>
          </Text>
        </View>
        <View style={[styles.row, styles.flexCenter]}>
          <Text style={styles.textSmall}>
            深圳销售咨询：
            <Text
              style={[styles.telText]}
              onPress={() => {
                Linking.openURL("tel:0755-83939177");
              }}
            >
              <Icon name="phone_ic" size={16} />
              0755-83939177
            </Text>
          </Text>
        </View>
        <View style={[styles.row, styles.flexCenter]}>
          <Text style={styles.textSmall}>
            上海销售咨询：
            <Text
              style={[styles.telText]}
              onPress={() => {
                Linking.openURL("tel:021-31122838");
              }}
            >
              <Icon name="phone_ic" size={16} />
              021-31122838
            </Text>
          </Text>
        </View>
        <View style={[styles.row, styles.flexCenter]}>
          <Text style={styles.textSmall} selectable={true}>
            销售QQ： 1828076009
          </Text>
        </View>
        <View style={[styles.row, styles.flexCenter]}>
          <Text style={styles.textSmall}>
            深圳office：深圳市福田区华强北街道荔村社区华强北路2006号桑达418栋4层（曼哈双创中心）A39室
          </Text>
        </View>
        <View style={[styles.row, styles.flexCenter]}>
          <Text style={styles.textSmall}>
            上海office：上海市静安区天目西路218嘉里不夜城b座1207
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flexCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  color999: {
    color: "#666",
  },
  telText: {
    color: "#2288cc",
  },
  textSmall: {
    fontSize: 12,
  },
  logoBox: {
    paddingTop: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  header: {
    lineHeight: 50,
    fontSize: 20,
    fontWeight: "bold",
  },
  componentBox: {
    paddingTop: 30,
  },
  component: {
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
const mapStateToProps = (state, props) => {
  return props;
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
