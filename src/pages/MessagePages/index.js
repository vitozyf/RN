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
  render() {
    return (
      <View style={styles.container}>
        <Text>111</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MessagePages;
