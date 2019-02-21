import React, { Component } from "react";
import LoginScreen from "@pages/LoginPages/Login";
import LoginHelpPage from "@pages/PersonalPages/HelpPage";

import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";

const IndexPages = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      path: "/Login/Index",
    },
    LoginHelpPage: {
      screen: LoginHelpPage,
      path: "/Login/HelpPage",
    },
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
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
    drawerLabel: "登录",
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
