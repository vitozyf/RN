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
import { HeaderTitle } from "@components";
type Props = {
  navigation: any,
  AvatarPath: string,
};
type State = {
  AvatarPath: string,
};

type BonProps = {
  navigation: any,
};
class Bom extends Component<BonProps> {
  static navigationOptions = ({ navigation }) => {
    // console.log(111, navigation);
    return {
      headerTitle: (
        <HeaderTitle title="正能量电子网" textStyle={{ color: "#fff" }} />
      ),
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingBottom: 100,
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

export default connect(mapStateToProps)(Bom);
