/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
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
      <View style={styles.messageRow}>
        <View style={styles.massageRowLeft}>
          <Image
            style={styles.messagePic}
            source={require("./img/message_enquiry_ic.png")}
          />
        </View>
        <View style={styles.massageRowRight}>
          <View style={styles.massageTitleBox}>
            <Text style={styles.massageTitle}>报价通知</Text>
            <Text style={styles.massageTime}>15:37</Text>
          </View>
          <View>
            <Text style={styles.messageContent}>您收到了型号为BAV99的报价</Text>
          </View>
        </View>
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
    backgroundColor: "#fff",
  },
  messageRow: {
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: "row",
  },
  massageRowLeft: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  messagePic: {
    width: 48,
    height: 47,
    marginRight: 8,
  },
  massageRowRight: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  massageTitleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  massageTitle: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    marginBottom: 4,
  },
  massageTime: {
    fontSize: 12,
    color: "#B3B3B3",
  },
  messageContent: {
    fontSize: 14,
    color: "#999999",
    lineHeight: 20,
  },
});

export default MessagePages;
