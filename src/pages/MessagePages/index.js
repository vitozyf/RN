/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ZnlHeader } from "@components";

type Props = {};
class MessagePages extends Component<Props> {
  static navigationOptions = () => {
    return {
      header: <ZnlHeader title="消息" hideLeft={true} />,
    };
  };
  _renderRow = () => {
    return (
      <View>
        <Text>222</Text>
      </View>
    );
  };
  render() {
    return <View style={styles.container}>{this._renderRow()}</View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessagePages;
