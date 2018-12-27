// @flow
import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ZnlHeader } from "@components";
import { connect } from "react-redux";

type Props = {
  navigation: INavigation,
};
type State = {};
class Setting extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const onPressIcon = () => {
      navigation.navigate("Home");
    };
    return {
      header: (
        <ZnlHeader
          title="设置"
          style={{ backgroundColor: "#fff" }}
          onPressIcon={onPressIcon}
        />
      ),
    };
  };

  render() {
    return (
      <View>
        <Text>123</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Page: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});
const mapStateToProps = (state, props) => {
  return props;
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
