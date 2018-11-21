import React, { Component } from "react";
import { connect } from "react-redux";
import { CustomTabComponent } from "@components";

import {
  createBottomTabNavigator, // 底部
} from "react-navigation";

import IndexScreen from "@pages/Bom";
import ErpScreen from "@pages/Erp";

// tab导航
const navigationOptions = {
  activeTintColor: "#ee7700",
  style: {
    height: 50,
  },
};

const TabNav = createBottomTabNavigator(
  {
    Home: {
      screen: IndexScreen,
      path: "/Home/Bom",
    },
    Erp: {
      screen: ErpScreen,
      path: "/Home/Erp",
    },
  },
  {
    initialRouteName: "Home",
    tabBarOptions: navigationOptions,
    tabBarComponent: CustomTabComponent,
  }
);

class BottomTabNavRouter extends Component {
  static router = TabNav.router;
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     drawerLockMode: "unlocked",
  //   };
  // };
  render() {
    return <TabNav navigation={this.props.navigation} />;
  }
}

const mapStateToProps = (state, props) => {
  return props;
};

export default connect(mapStateToProps)(BottomTabNavRouter);
