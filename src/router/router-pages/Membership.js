import React, { Component } from "react";
import MembershipScreen from "@pages/MembershipPages/MembershipScreen";
import HelpPageMem from "@pages/MembershipPages/HelpPage";

import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";

const IndexPages = createStackNavigator(
  {
    Membership: {
      screen: MembershipScreen,
      path: "/Membership/Index",
    },
    HelpPageMem: {
      screen: HelpPageMem,
      path: "/Membership/HelpPage",
    },
  },
  {
    initialRouteName: "Membership",
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
    drawerLabel: "会员身份",
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
