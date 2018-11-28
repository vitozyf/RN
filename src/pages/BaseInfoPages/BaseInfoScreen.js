/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { ZnlButton, ZnlModal } from "@components";
import { HeaderTitle, HeaderRight } from "@components";
type State = {
  modalVisible: boolean,
};
type Props = {
  navigation: INavigation,
  ClearUserInfo: Function,
  NickName: string,
  PhoneNumber: string,
  HomeUserInfo?: Object,
};
class BaseInfoScreen extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const goBack = () => {
      navigation.navigate("Home");
    };
    return {
      headerTitle: <HeaderTitle title="基本信息" />,
      headerLeft: (
        <Icon.Button
          size={26}
          name="md-arrow-back"
          backgroundColor="#fff"
          color="#333"
          iconStyle={{ marginLeft: 5 }}
          onPress={goBack}
        />
      ),
      headerRight: <HeaderRight />,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  _toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
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
    const { modalVisible } = this.state;
    const { NickName, PhoneNumber, HomeUserInfo } = this.props;
    const { ExpirationDateStr, CompanyName } = HomeUserInfo || {};
    return (
      <View style={styles.container}>
        <View style={styles.rowBox}>
          <View style={styles.baseRow}>
            <Text style={styles.baseRowTitle}>公司名</Text>
            <Text style={styles.baseRowValue}>{CompanyName}</Text>
          </View>

          <View style={styles.baseRow}>
            <Text style={styles.baseRowTitle}>微信</Text>
            <Text style={styles.baseRowValue}>{NickName}</Text>
          </View>

          <View style={styles.baseRow}>
            <Text style={styles.baseRowTitle}>手机号</Text>
            <Text style={styles.baseRowValue}>{PhoneNumber}</Text>
          </View>

          <View style={styles.baseRow}>
            <Text style={styles.baseRowTitle}>到期时间</Text>
            <Text style={styles.baseRowValue}>{ExpirationDateStr}</Text>
          </View>
        </View>

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
    backgroundColor: "#f5f5f5",
  },
  rowBox: {
    backgroundColor: "#fff",
    marginTop: 8,
  },
  baseRow: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    // paddingLeft: 10,
    marginLeft: 12,
    paddingRight: 10,
  },
  baseRowTitle: {
    fontSize: 15,
  },
  baseRowValue: {
    maxWidth: 280,
    fontSize: 15,
    color: "#999",
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
    // backgroundColor: '#E64340',
    // color: '#ccc'
  },
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, state.UserInfo, props);
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
)(BaseInfoScreen);
