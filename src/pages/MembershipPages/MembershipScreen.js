import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { HeaderTitle, HeaderRight } from "@components";

class MembershipScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const goBack = () => {
      navigation.navigate("Home");
    };
    return {
      headerTitle: <HeaderTitle title="会员身份" />,
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
  toHelpPage = () => {
    const { navigation } = this.props;
    navigation.push("HelpPage");
  };
  render() {
    const { UserIdentity } = this.props;
    console.log(111, UserIdentity);
    let UserIdentityEle = [];
    for (const key in UserIdentity) {
      let titleClass = "textTitle4";
      switch (key) {
        case "正品企业":
          titleClass = "textTitle4";
          break;
        case "正品物料":
          titleClass = "textTitle8";
          break;
        case "保证有料":
          titleClass = "textTitle6";
          break;
        case "优势推广":
          titleClass = "textTitle9";
          break;
        case "Erp会员":
          titleClass = "textTitleErp";
          break;
        default:
          break;
      }
      UserIdentityEle.push(
        <View style={styles.rowView} key={key}>
          <Text
            style={[styles.textCommon, styles.textTitle, styles[titleClass]]}
          >
            {key}
          </Text>
          <Text
            style={[
              styles.textCommon,
              UserIdentity[key] ? styles.textTrue : styles.textFalse,
            ]}
          >
            {UserIdentity[key] && <AntDesign name="checkcircleo" size={16} />}
            {UserIdentity[key] ? "已开通" : "未开通"}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {UserIdentityEle}
        <View style={styles.helpBox}>
          <Text style={styles.helpText} onPress={this.toHelpPage}>
            我要帮助
          </Text>
        </View>
      </View>
    );
  }
  componentWillMount() {
    this.props.SetStatusBarStyle("dark-content");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  rowView: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
    paddingLeft: 10,
    paddingRight: 10,
  },
  textCommon: {
    fontSize: 18,
  },
  textTitle: {
    color: "#FFF",
    borderWidth: 1,
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 3,
    width: 90,
    textAlign: "center",
  },
  textTitle4: {
    backgroundColor: "#FF2200",
    borderColor: "#FF2200",
  },
  textTitle8: {
    backgroundColor: "#FF6200",
    borderColor: "#FF6200",
  },
  textTitle6: {
    backgroundColor: "#FDF7A0",
    color: "#FF0000",
    borderColor: "#FF0000",
  },
  textTitle9: {
    backgroundColor: "#009DD9",
    borderColor: "#009DD9",
  },
  textTitleErp: {
    backgroundColor: "#33CC99",
    borderColor: "#33CC99",
  },
  textTrue: {
    color: "#09BB07",
  },
  textFalse: {
    color: "#999",
  },
  helpBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingBottom: 30,
  },
  helpText: {
    color: "#576B95",
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
const mapDispatchToProps = dispatch => {
  return {
    SetStatusBarStyle: StatusBarStyle => {
      return dispatch({
        type: "SetStatusBarStyle",
        StatusBarStyle,
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembershipScreen);
