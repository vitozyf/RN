/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
// import Icon from "react-native-vector-icons/Ionicons";
import { ZnlHeader, ZnlCardList } from "@components";
type State = {};
type Props = {
  navigation: INavigation,
  NickName: string,
  PhoneNumber: string,
  HomeUserInfo?: Object,
};
class BaseInfoScreen extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const goBack = () => {
      navigation.goBack();
    };
    return {
      header: <ZnlHeader title="基本信息" onPressIcon={goBack} />,
    };
  };
  _renderRow = item => {
    return (
      <View style={styles.baseRow}>
        <Text style={styles.baseRowTitle}>{item.key}</Text>
        <Text style={styles.baseRowValue}>{item.value}</Text>
      </View>
    );
  };
  render() {
    const { NickName, PhoneNumber, HomeUserInfo } = this.props;
    const { ExpirationDateStr, CompanyName } = HomeUserInfo || {};
    const datas = [
      {
        key: "公司名",
        value: CompanyName,
      },
      {
        key: "微信",
        value: NickName,
      },
      {
        key: "手机号",
        value: PhoneNumber,
      },
      {
        key: "到期时间",
        value: ExpirationDateStr,
      },
    ];
    return (
      <View style={styles.container}>
        <ZnlCardList datas={datas} renderRow={this._renderRow} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, state.UserInfo, props);
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseInfoScreen);
