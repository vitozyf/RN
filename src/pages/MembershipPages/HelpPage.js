/* @flow */
import React, { Component } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { connect } from "react-redux";
import { ZnlHeader } from "@components";
import Icon from "@components/Iconfont/CloudIcon";

type Props = {
  Sales: Object,
  navigation: INavigation,
};
class MembershipScreen extends Component<Props> {
  static defaultProps = {
    Sales: {},
  };
  static navigationOptions = ({ navigation }) => {
    const BACK = navigation.getParam("back");
    const goBack = () => {
      switch (BACK) {
        case "Membership":
          navigation.goBack();
          break;
        case "Home":
          break;
        case "Login":
          navigation.navigate("Login");
          break;
        default:
          // navigation.navigate("Home");
          navigation.goBack();
          break;
      }
    };
    return {
      header: <ZnlHeader title="帮助" onPressIcon={goBack} />,
    };
  };
  render() {
    const { Sales } = this.props;
    const SalesEle = () => {
      if (Sales.SalesName && Sales.telephone) {
        return (
          <View style={[styles.service, styles.Sales]}>
            <View style={styles.rowView}>
              <Text style={[styles.textCommon, styles.textTitle]}>业务员</Text>
              <Text style={[styles.textCommon, styles.textValue]}>
                {Sales.SalesName}
              </Text>
            </View>
            <View style={styles.rowView}>
              <Text style={[styles.textCommon, styles.textTitle]}>
                联系电话
              </Text>
              <Text
                style={[styles.textCommon, styles.textValue, styles.telText]}
                onPress={() => {
                  Linking.openURL("tel:400-699-2899");
                }}
              >
                <Icon name="phone_ic" size={16} />
                {Sales.telephone}
              </Text>
            </View>
          </View>
        );
      }
      return null;
    };
    return (
      <View style={styles.container}>
        {SalesEle()}
        <View style={styles.service}>
          <View style={styles.rowView}>
            <Text style={[styles.textCommon, styles.textTitle]}>客服</Text>
            <Text style={[styles.textCommon, styles.textValue]}>小正</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={[styles.textCommon, styles.textTitle]}>联系电话</Text>
            <Text
              style={[styles.textCommon, styles.textValue, styles.telText]}
              onPress={() => {
                Linking.openURL("tel:400-699-2899");
              }}
            >
              <Icon name="phone_ic" size={16} />
              400-699-2899
            </Text>
          </View>
        </View>
      </View>
    );
  }
  componentWillMount() {
    // const { navigation } = this.props;
    // navigation.setParams({
    //   back: navigation.getParam("back"),
    // });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  service: {
    backgroundColor: "#fff",
    marginTop: 10,
  },
  Sales: {
    // marginBottom: 10,
  },
  rowView: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
    // paddingLeft: 10,
    marginLeft: 12,
    paddingRight: 10,
  },
  textCommon: {
    fontSize: 15,
  },
  textTitle: {
    textAlign: "center",
  },
  textValue: {
    color: "#999",
  },
  telText: {
    color: "#2288CC",
  },
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, { Sales: state.UserInfo.Sales }, props);
};

export default connect(mapStateToProps)(MembershipScreen);
