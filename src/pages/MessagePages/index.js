/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ZnlHeader } from "@components";
import MessageList from "./MessageList";
import { connect } from "react-redux";

type Props = {
  navigation: INavigation,
  SET_MESSAGE_DATA: Function,
  MessageData: Array<any>,
};
class MessagePages extends Component<Props> {
  static navigationOptions = () => {
    return {
      header: <ZnlHeader title="消息" hideLeft={true} />,
    };
  };
  getMessageData = () => {
    const { SET_MESSAGE_DATA } = this.props;
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
    SET_MESSAGE_DATA(data);
  };
  componentWillMount() {
    this.getMessageData();
  }
  render() {
    const { navigation, MessageData } = this.props;
    return (
      <View style={styles.container}>
        <MessageList data={MessageData} navigation={navigation} />
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

const mapStateToProps = (state, props) => {
  return Object.assign({}, { MessageData: state.MessageData }, props);
};

const mapDispatchToProps = dispatch => {
  return {
    SET_MESSAGE_DATA: MessageData => {
      return dispatch({
        type: "SET_MESSAGE_DATA",
        MessageData,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagePages);
