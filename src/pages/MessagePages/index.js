/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ZnlHeader } from "@components";
import MessageList from "./MessageList";
type Props = {
  navigation: INavigation,
};
class MessagePages extends Component<Props> {
  static navigationOptions = () => {
    return {
      header: <ZnlHeader title="消息" hideLeft={true} />,
    };
  };
  render() {
    const data = [
      {
        MsgType: 2,
        MsgContent: "您收到了型号为BAV99的报价",
        MsgTimePhrase: "15:37",
        IsReaded: true,
        Id: 1,
      },
      {
        MsgType: 3,
        MsgContent: "您收到了型号为BAV99的报价",
        MsgTimePhrase: "15:37",
        IsReaded: true,
        Id: 2,
      },
      {
        MsgType: 2,
        MsgContent: "您收到了型号为BAV99的报价",
        MsgTimePhrase: "15:37",
        IsReaded: true,
        Id: 3,
      },
      {
        MsgType: 3,
        MsgContent: "您收到了型号为BAV99的报价",
        MsgTimePhrase: "15:37",
        IsReaded: true,
        Id: 4,
      },
      {
        MsgType: 2,
        MsgContent: "您收到了型号为BAV99的报价",
        MsgTimePhrase: "15:37",
        IsReaded: true,
        Id: 5,
      },
      {
        MsgType: 3,
        MsgContent: "您收到了型号为BAV99的报价",
        MsgTimePhrase: "15:37",
        IsReaded: true,
        Id: 6,
      },
      {
        MsgType: 1,
        MsgContent: "您收到了型号为BAV99的报价",
        MsgTimePhrase: "15:37",
        IsReaded: true,
        Id: 7,
      },
    ];
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <MessageList data={data} navigation={navigation} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default MessagePages;
