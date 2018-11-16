import React, { Component } from "react";
import ErpIndex from "@pages/ErpPages/ErpIndex";
import ErpList from "@pages/ErpPages/ErpList";

import Entypo from "react-native-vector-icons/Entypo";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";

const IndexPages = createStackNavigator(
  {
    ErpIndex: {
      screen: ErpIndex,
      path: "/Home/Erp/Index",
    },
    ErpList: {
      screen: ErpList,
      path: "/Home/Erp/ErpList",
    },
  },
  {
    initialRouteName: "ErpIndex",
    headerLayoutPreset: "center",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#2C2D31",
        height: 44,
        lineHeight: 44,
      },
      headerTitleStyle: {
        color: "#fff",
        fontSize: 20,
      },
    },
  }
);

class Index extends Component {
  static navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    return {
      tabBarVisible,
      title: "ERP",
      activeTintColor: "#ee7700",
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        return (
          <Entypo
            name={"icloud"}
            size={20}
            color={focused ? "#ee7700" : "#333"}
          />
        );
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
