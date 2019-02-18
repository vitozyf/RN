/* @flow */
import React, { Component } from "react";
import PersonalCenter from "@pages/PersonalPages";
import Entypo from "react-native-vector-icons/Entypo";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";
import { Image } from "react-native";

const IndexPages = createStackNavigator(
  {
    PersonalCenter: {
      screen: PersonalCenter,
      path: "/Home/Personal/index",
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
