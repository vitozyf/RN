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
  CONCAT_MESSAGE_DATA: Function,
  MessageData: Array<any>,
};
type State = {
  showFoot: boolean,
};
class MessagePages extends Component<Props, State> {
  static navigationOptions = () => {
    return {
      header: <ZnlHeader title="消息" hideLeft={true} />,
    };
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      showFoot: false,
    };
  }
  getMessageData = (count = 50, minMsgId = 0) => {
    const { SET_MESSAGE_DATA, CONCAT_MESSAGE_DATA } = this.props;

    Cloud.$get(`im/getappmsglistsync?count=${count}&minMsgId=${minMsgId}`).then(
      res => {
        const data = res || [];
        if (data.length < 50) {
          this.setState({
            showFoot: true,
          });
        }
        if (minMsgId === 0) {
          SET_MESSAGE_DATA(data);
        } else {
          CONCAT_MESSAGE_DATA(data);
        }
      }
    );

    // 数据模拟
    // const data = [];
    // for (let index = minMsgId + 1; index < minMsgId + 51; index++) {
    //   data.push({
    //     MsgType: index % 2 === 0 ? 2 : 3,
    //     MsgContent: "您收到了型号为BAV99的报价",
    //     MsgTimePhrase: "15:37" + "--" + index,
    //     IsReaded: index % 2 === 0,
    //     Id: index,
    //   });
    // }
    // if (minMsgId != 0) {
    //   data.pop();
    // }
    // console.log(111, data.length);
    // 数据模拟结束
  };
  getMoreMesageData = () => {
    const { MessageData } = this.props;
    this.getMessageData(50, MessageData[MessageData.length - 1].Id);
  };
  componentWillMount() {
    this.getMessageData();
  }
  render() {
    const { navigation, MessageData } = this.props;
    const { showFoot } = this.state;
    return (
      <View style={styles.container}>
        <MessageList
          data={MessageData}
          navigation={navigation}
          getMessageData={this.getMessageData}
          getMoreMesageData={this.getMoreMesageData}
          showFoot={showFoot}
        />
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
    CONCAT_MESSAGE_DATA: MessageData => {
      return dispatch({
        type: "CONCAT_MESSAGE_DATA",
        MessageData,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagePages);
