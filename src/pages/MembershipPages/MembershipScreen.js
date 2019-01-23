/* @flow */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ZnlHeader, ZnlCardList } from "@components";

type Props = {
  navigation: INavigation,
  UserIdentity: Object,
};
class MembershipScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const goBack = () => {
      navigation.navigate("Home");
    };
    return {
      header: <ZnlHeader title="会员身份" onPressIcon={goBack} />,
    };
  };
  _renderRow = item => {
    return (
      <View style={styles.rowView}>
        <Text
          style={[styles.textCommon, styles.textTitle, styles[item.titleClass]]}
        >
          {item.key}
        </Text>
        <Text
          style={[
            styles.textCommon,
            item.value ? styles.textTrue : styles.textFalse,
          ]}
        >
          {item.value && <AntDesign name="checkcircleo" size={16} />}
          {item.value ? "已开通" : "未开通"}
        </Text>
      </View>
    );
  };
  render() {
    const { UserIdentity } = this.props;
    let UserIdentitys = [];
    for (const key in UserIdentity) {
      let titleClass = "textTitle4";
      switch (key) {
        case "正品企业":
          titleClass = "textTitle4";
          break;
        case "正品物料":
          titleClass = "textTitle8";
          break;
        case "订货服务":
          titleClass = "textTitle5";
          break;
        case "保证有料":
          titleClass = "textTitle6";
          break;
        case "优势推广":
          titleClass = "textTitle9";
          break;
        case "品牌替代":
          titleClass = "textTitle7";
          break;
        case "ERP会员":
          titleClass = "textTitleErp";
          break;
        default:
          break;
      }
      UserIdentitys.push({
        key,
        titleClass,
        value: UserIdentity[key],
      });
    }
    return (
      <View style={styles.container}>
        <ZnlCardList datas={UserIdentitys} renderRow={this._renderRow} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  rowView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textCommon: {
    fontSize: 15,
  },
  textTitle: {
    color: "#FFF",
    borderWidth: 1,
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 3,
    width: 64,
    borderRadius: 3,
    lineHeight: 24,
    textAlign: "center",
    fontSize: 14,
  },
  textTitle4: {
    backgroundColor: "#FF2200",
    borderColor: "#FF2200",
  },
  textTitle8: {
    backgroundColor: "#FF6200",
    borderColor: "#FF6200",
  },
  textTitle5: {
    backgroundColor: "#269AF3",
    borderColor: "#269AF3",
  },
  textTitle6: {
    backgroundColor: "#FDF7A0",
    color: "#FF0000",
    borderColor: "#FF0000",
  },
  textTitle9: {
    backgroundColor: "#00BEDB",
    borderColor: "#00BEDB",
  },
  textTitle7: {
    color: "#006DCC",
    backgroundColor: "#CCE7FF",
    borderColor: "#006DCC",
  },
  textTitleErp: {
    backgroundColor: "#167CDB",
    borderColor: "#167CDB",
  },
  textTrue: {
    color: "#09BB07",
  },
  textFalse: {
    color: "#999",
  },
});

const mapStateToProps = (state, props) => {
  return Object.assign(
    {},
    {
      UserIdentity: state.UserInfo.UserIdentity,
    },
    props
  );
};
export default connect(mapStateToProps)(MembershipScreen);
