/* @flow */
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { HeaderTitle, HeaderRight } from "@components";
type Props = {
  navigation: any,
  AvatarPath: string,
};
type State = {
  AvatarPath: string,
};
class HeaderLeft extends Component<Props, State> {
  onPress = () => {
    const { navigation } = this.props;
    navigation.openDrawer();
  };
  render() {
    const { AvatarPath } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.onPress}>
        <Image
          style={styles.headerLeftImg}
          source={{
            uri: AvatarPath,
          }}
        />
      </TouchableOpacity>
    );
  }
}

const HeaderLeftCom = connect((state, props) => {
  return Object.assign({}, { AvatarPath: state.UserInfo.AvatarPath }, props);
})(HeaderLeft);

type BonProps = {
  navigation: any,
  SetIsTabBarShow: any,
  SetStatusBarStyle: Function,
};
class Bom extends Component<BonProps> {
  static navigationOptions = ({ navigation }) => {
    return {
      // title: '首页 | BomAi',
      headerTitle: <HeaderTitle title="BomAi" textStyle={{ color: "#fff" }} />,
      headerLeft: <HeaderLeftCom navigation={navigation} />,
      headerRight: <HeaderRight />,
    };
  };
  toSearchPage = () => {
    const { navigation } = this.props;
    navigation.navigate("SearchPage");
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.ImgBox}>
          <ImageBackground
            source={require("./img/bg_texture.png")}
            style={styles.ImageBackground}
          >
            <Image
              source={require("./img/bomai_logo.png")}
              style={styles.HomeLogo}
            />
          </ImageBackground>
        </View>
        <TouchableOpacity
          style={styles.SearchBox}
          onPress={this.toSearchPage}
          activeOpacity={1}
        >
          <View style={styles.FontAwesomeBox}>
            <FontAwesome name={"search"} size={18} style={styles.FontAwesome} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  willFocusListener: any = null;
  componentWillMount() {
    const { navigation } = this.props;
    this.willFocusListener = navigation.addListener(
      "willFocus",
      this.willFocusHandler
    );
  }
  componentWillUnmount() {
    this.willFocusListener.remove();
  }
  willFocusHandler = () => {
    this.props.SetStatusBarStyle("light-content");
    this.props.SetIsTabBarShow(
      this.props.navigation.state.routeName === "Bom" ||
        this.props.navigation.state.routeName === "ErpIndex"
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingBottom: 100,
  },
  headerLeftImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  ImgBox: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ImageBackground: {
    width: 320,
    height: 105,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  HomeLogo: {
    position: "absolute",
    bottom: 10,
  },
  SearchBox: {
    paddingLeft: 40,
    borderRadius: 4,
    fontSize: 16,
    color: "#333333",
    borderWidth: 1,
    borderColor: "#ee7700",
    height: 40,
    marginLeft: 30,
    marginRight: 30,
  },
  FontAwesomeBox: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#ee7700",
    height: 38,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  FontAwesome: {
    color: "#fff",
  },
});

const mapStateToProps = (state, props) => {
  return props;
};
const mapDispatchToProps = dispatch => {
  return {
    SetIsTabBarShow: IsTabBarShow => {
      return dispatch({
        type: "SetIsTabBarShow",
        IsTabBarShow,
      });
    },
    SetStatusBarStyle: StatusBarStyle => {
      return dispatch({
        type: "SetStatusBarStyle",
        StatusBarStyle,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bom);
