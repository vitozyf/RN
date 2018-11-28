import React, { Component } from "react";
import TextView from "./TextView";
import { createStackNavigator } from "react-navigation";

const IndexPages = createStackNavigator(
  {
    TextView: {
      screen: TextView,
      path: "/TextView",
    },
  },
  {
    initialRouteName: "TextView",
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
    drawerLabel: "测试页",
  };
  static router = IndexPages.router;
  render() {
    return <IndexPages navigation={this.props.navigation} />;
  }
};

export default Index;
