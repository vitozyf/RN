// @flow
import React, { Component } from "react";
import { View, StyleSheet, Text, WebView } from "react-native";
import { ZnlHeader } from "@components";
import { connect } from "react-redux";

type Props = {
  navigation: INavigation,
};
type State = {};
class LegalProtection extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const onPressIcon = () => {
      navigation.goBack();
    };
    return {
      header: (
        <ZnlHeader
          title="法律条款与隐私政策"
          style={{ backgroundColor: "#fff" }}
          onPressIcon={onPressIcon}
        />
      ),
    };
  };

  componentWillMount() {
    Cloud.$Loading.show();
  }
  onLoadEnd = () => {
    Cloud.$Loading.hidden();
  };

  render() {
    return (
      <WebView
        source={{ uri: "https://static.bom.ai/appdownload/about.html" }}
        onLoadEnd={this.onLoadEnd}
      />
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
)(LegalProtection);
