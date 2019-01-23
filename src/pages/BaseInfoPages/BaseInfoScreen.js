/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
// import Icon from "react-native-vector-icons/Ionicons";
import { ZnlButton, ZnlModal, ZnlHeader, ZnlCardList } from "@components";
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
      header: <ZnlHeader title="基本信息" onPressIcon={goBack} />,
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
  _renderRow = item => {
    return (
      <View style={styles.baseRow}>
        <Text style={styles.baseRowTitle}>{item.key}</Text>
        <Text style={styles.baseRowValue}>{item.value}</Text>
      </View>
    );
  };
  render() {
    const { modalVisible } = this.state;
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
