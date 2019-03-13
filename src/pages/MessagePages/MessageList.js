/**
 * 询价列表
 * @flow
 */

import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

const ITEM_HEIGHT = 72;

type IMessageData = {
  Id: number,
  MsgType: number,
  MsgContent: string,
  MsgTimePhrase: string,
  IsReaded: boolean,
};

type Props = {
  data: Array<IMessageData>,
  navigation: INavigation,
  getMessageData: Function,
  getMoreMesageData: Function,
  showFoot: boolean,
};
type State = {
  refreshing: boolean,
};
class MessageList extends React.PureComponent<Props, State> {
  state = { refreshing: false };

  _keyExtractor = (item, index) => item.Id + "";

  toPage = ({ name, params }: any) => {
    const { navigation } = this.props;
    navigation.push(name, params);
  };

  _renderItem = ({ item }) => {
    const onPress = () => {
      if (item.MsgType === 2) {
        this.toPage({
          name: "ReceivedInquiry",
          params: { active: "waiting" },
        });
        if (!item.IsReaded) {
          item.IsReaded = true;
        }
      } else if (item.MsgType === 3) {
        this.toPage({
          name: "OutgoingInquiry",
          params: { active: "already" },
        });
      }
    };
    let MessageTitle = "";
    let MessageIcon = require("./img/message_system_pic.png");
    switch (item.MsgType) {
      case 2:
        MessageTitle = "询价通知";
        MessageIcon = require("./img/message_enquiry_ic.png");
        break;
      case 3:
        MessageTitle = "报价通知";
        MessageIcon = require("./img/message_quote_ic.png");
        break;
      default:
        MessageTitle = "系统通知";
        MessageIcon = require("./img/message_system_pic.png");
        break;
    }
    return (
      <TouchableOpacity
        style={styles.messageRow}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View style={styles.massageRowLeft}>
          <Image style={styles.messagePic} source={MessageIcon} />
          <View style={!item.IsReaded ? styles.IsReaded : null} />
        </View>
        <View style={styles.massageRowRight}>
          <View style={styles.massageTitleBox}>
            <Text style={styles.massageTitle}>{MessageTitle}</Text>
            <Text style={styles.massageTime}>{item.MsgTimePhrase}</Text>
          </View>
          <View>
            <Text style={styles.messageContent}>{item.MsgContent}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _renderListEmptyComponent = () => {
    return (
      <View style={styles.EmptyView}>
        <View style={styles.EmptyViewBox}>
          <Image
            style={styles.EmptyPic}
            source={require("./img/message_default_pic.png")}
          />
          <Text style={styles.EmptyText}>暂无询报价通知</Text>
        </View>
      </View>
    );
  };

  // 渲染底部
  _renderFooter = () => {
    const { showFoot, data } = this.props;
    if (showFoot && data.length > 10) {
      return (
        <View
          style={{
            height: 30,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text
            style={{
              color: "#999999",
              fontSize: 14,
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            没有更多数据了...
          </Text>
        </View>
      );
    } else if (!showFoot || data.length === 0) {
      return <View />;
    }
    return <View />;
  };

  onRefresh = () => {
    const { getMessageData } = this.props;
    getMessageData();
  };
  onEndReached = () => {
    const { data, getMoreMesageData, showFoot } = this.props;
    if (data.length >= 30 && !showFoot) {
      getMoreMesageData();
    }
  };

  render() {
    const { refreshing } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ListEmptyComponent={this._renderListEmptyComponent}
          ListFooterComponent={this._renderFooter}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingLeft: 12,
    paddingRight: 0,
  },
  messageRow: {
    paddingLeft: 12,
    paddingRight: 0,
    flexDirection: "row",
  },
  massageRowLeft: {
    paddingTop: (ITEM_HEIGHT - 48) / 2,
    paddingBottom: (ITEM_HEIGHT - 48) / 2,
  },
  IsReaded: {
    width: 10,
    height: 10,
    backgroundColor: "#ff2200",
    borderRadius: 5,
    position: "absolute",
    top: 7,
    right: 5,
  },
  messagePic: {
    width: 48,
    height: 48,
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
    paddingRight: 12,
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
  EmptyView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 168,
  },
  EmptyViewBox: {
    top: -30,
  },
  EmptyPic: {
    width: 156,
    height: 108,
  },
  EmptyText: {
    fontSize: 16,
    color: "#999",
    lineHeight: 22,
    textAlign: "center",
    marginTop: 12,
  },
});

export default MessageList;
