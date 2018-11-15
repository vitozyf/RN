/* @flow */
import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     AvatarPath:
  //       "http://bom-ai-read.oss-cn-shenzhen.aliyuncs.com/makesureFile/JCNEeK_1540978339916.jpg",
  //   };
  // }
  onPress = () => {
    const { navigation } = this.props;
    navigation.openDrawer();
  };
  // componentWillMount() {
  //   console.log(1111111, this.state, this.props);
  //   Cloud.$getStorage(Cloud.$CONFIG.AvatarPath).then(data => {
  //     if (data) {
  //       this.setState({
  //         AvatarPath: `https:${data}`,
  //       });
  //     }
  //   });
  // }
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
};
class Bom extends Component<BonProps> {
  static navigationOptions = ({ navigation }) => {
    return {
      // title: '首页 | BomAi',
      headerTitle: (
        <HeaderTitle title="首页 | BomAi" textStyle={{ color: "#fff" }} />
      ),
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
          <Image
            style={styles.HomeLogo}
            source={{
              uri:
                "http://bom-ai-read.oss-cn-shenzhen.aliyuncs.com/makesureFile/eBPk33_1539748592007.png",
              cache: "force-cache",
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.SearchBox}
          onPress={this.toSearchPage}
          activeOpacity={1}
        >
          <FontAwesome name={"search"} size={24} style={styles.FontAwesome} />
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
    paddingBottom: 50,
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
    height: 40,
    paddingBottom: 30,
  },
  HomeLogo: {
    width: 270,
    height: 50,
  },
  SearchBox: {
    paddingLeft: 40,
    borderRadius: 10,
    fontSize: 16,
    color: "#333333",
    borderWidth: 1,
    borderColor: "#ee7700",
    height: 40,
    marginLeft: 30,
    marginRight: 30,
  },
  FontAwesome: {
    position: "absolute",
    left: 10,
    top: 8,
    color: "#999",
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bom);
