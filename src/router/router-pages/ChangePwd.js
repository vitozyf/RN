import React, { Component } from "react";
import ChangePwdScreen from "@pages/ChangePwdPages/ChangePwd";

import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";

const IndexPages = createStackNavigator(
  {
    ChangePwd: {
      screen: ChangePwdScreen,
      path: "/ChangePwd/Index",
    },
  },
  {
    initialRouteName: "ChangePwd",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#fff",
        height: 44,
        lineHeight: 44,
      },
      headerTitleStyle: {
        color: "#333",
        fontSize: 20,
      },
    },
  }
);

const Index = class Index extends Component {
  static navigationOptions = {
    drawerLabel: "修改密码",
  };
  static router = IndexPages.router;
  render() {
    return <IndexPages navigation={this.props.navigation} />;
  }
};

const mapStateToProps = (state, props) => {
  return props;
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
