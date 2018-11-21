/* @flow */
import React, { Component } from "react";
import BomScreen from "@pages/IndexPages/BomIndex";
import SearchPageScreen from "@pages/SearchPages/SearchPage";
import SearchPageDetailScreen from "@pages/SearchPages/SearchPageDetail";
import SeatchResScreen from "@pages/SearchPages/SeatchRes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";
import { Image } from "react-native";

const IndexPages = createStackNavigator(
  {
    Bom: {
      screen: BomScreen,
      path: "/Home/Bom/Index",
    },
    SearchPage: {
      screen: SearchPageScreen,
      path: "/Home/Bom/SearchPage",
    },
    SearchPageDetail: {
      screen: SearchPageDetailScreen,
      path: "/Home/Bom/SearchPageDetail",
    },
    SeatchRes: {
      screen: SeatchResScreen,
      path: "/Home/Bom/SeatchRes",
    },
  },
  {
    initialRouteName: "Bom",
    mode: "card",
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
type Props = {
  navigation: INavigation,
};
const Index = class Index extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "BOM.AI",
      activeTintColor: "#ee7700",
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        console.log(111, focused);
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
  // componentWillMount() {
  //   const {SetBottomTabNav, navigation} = this.props;
  //   SetBottomTabNav(navigation);
  // }
};

const mapStateToProps = (state, props) => {
  return props;
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     SetBottomTabNav : (BottomTabNav) => {
//       return dispatch({
//         type: 'SetBottomTabNav',
//         BottomTabNav
//       })
//     }
//   }
// }

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(Index);
