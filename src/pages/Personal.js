/* @flow */
import React, { Component } from "react";
import PersonalCenter from "@pages/PersonalPages";
import SettingScreen from "@pages/Setting/Setting";
import AboutScreen from "@pages/Setting/About";
import LegalProtection from "@pages/Setting/LegalProtection";

import BaseInfoScreen from "@pages/BaseInfoPages/BaseInfoScreen";

import MembershipScreen from "@pages/MembershipPages/MembershipScreen";
import HelpPageMem from "@pages/MembershipPages/HelpPage";

import Entypo from "react-native-vector-icons/Entypo";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";
import { Image } from "react-native";

const IndexPages = createStackNavigator(
  {
    PersonalCenter: {
      screen: PersonalCenter,
      path: "/Personal/index",
    },
    Setting: {
      screen: SettingScreen,
      path: "/Personal/Setting",
    },
    About: {
      screen: AboutScreen,
      path: "/Personal/About",
    },
    LegalProtection: {
      screen: LegalProtection,
      path: "/Personal/LegalProtection",
    },
    BaseInfo: {
      screen: BaseInfoScreen,
      path: "/Personal/BaseInfo",
    },
    Membership: {
      screen: MembershipScreen,
      path: "/Personal/Membership",
    },
    HelpPageMem: {
      screen: HelpPageMem,
      path: "/Personal/HelpPage",
    },
  },
  {
    initialRouteName: "PersonalCenter",
    headerLayoutPreset: "center",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#fff",
        height: 0,
        lineHeight: 0,
      },
      headerTitleStyle: {
        color: "#fff",
        fontSize: 20,
      },
    },
  }
);
type Props = {
  navigation: INavigation,
};
class Index extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    return {
      tabBarVisible,
      title: "个人中心",
      activeTintColor: "#ee7700",
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const Icon = focused
          ? require("./assets/img/tab_bomai_p.png")
          : require("./assets/img/tab_bomai_n.png");
        return <Image source={Icon} />;
      },
    };
  };
  static router = IndexPages.router;
  render() {
    return <IndexPages navigation={this.props.navigation} />;
  }
}

const mapStateToProps = (state, props) => {
  return props;
};

export default connect(mapStateToProps)(Index);
