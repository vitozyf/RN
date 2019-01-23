import React, { Component } from "react";
import SettingScreen from "@pages/Setting/Setting";
import AboutScreen from "@pages/Setting/About";

import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";

const IndexPages = createStackNavigator(
  {
    Setting: {
      screen: SettingScreen,
      path: "/Setting/Setting",
    },
    About: {
      screen: AboutScreen,
      path: "/Setting/About",
    },
  },
  {
    initialRouteName: "Setting",
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
    drawerLabel: "设置",
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
