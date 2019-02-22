/* @flow */
import React, { Component } from "react";
import PersonalCenter from "@pages/PersonalPages";
import SettingScreen from "@pages/PersonalPages/Setting"; // 设置
import AboutScreen from "@pages/PersonalPages/About"; // 关于
import LegalProtection from "@pages/PersonalPages/LegalProtection"; // 法律条款
import BaseInfoScreen from "@pages/PersonalPages/BaseInfoScreen"; // 基本信息
import MembershipScreen from "@pages/PersonalPages/MembershipScreen"; // 会员
import HelpPageMem from "@pages/PersonalPages/HelpPage"; // 帮助
import News from "@pages/PersonalPages/News"; // 芯扒客
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
    News: {
      screen: News,
      path: "/Personal/News",
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
          ? require("./assets/img/tab_center_ic_p.png")
          : require("./assets/img/tab_center_ic_n.png");
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
