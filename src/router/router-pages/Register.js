import React, { Component } from "react";
import RegisterScreen from "@pages/RegisterPages/Register";

import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";

const IndexPages = createStackNavigator(
  {
    Register: {
      screen: RegisterScreen,
      path: "/Register/Index",
    },
  },
  {
    initialRouteName: "Register",
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
    drawerLabel: "注册",
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
