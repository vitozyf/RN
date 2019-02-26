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
} from "react-native";

const ITEM_HEIGHT = 72;

type Props = {
  data: Array<any>,
  navigation: INavigation,
};
type State = {
  refreshing: boolean,
};
class MessageList extends React.PureComponent<Props, State> {
  state = { refreshing: false };

  _keyExtractor = (item, index) => item.id;

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
      } else if (item.MsgType === 3) {
        this.toPage({
          name: "OutgoingInquiry",
          params: { active: "already" },
        });
      }
    };
    return (
      <TouchableOpacity
        style={styles.messageRow}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View style={styles.massageRowLeft}>
          <Image
            style={styles.messagePic}
            source={
              item.MsgType === 2
                ? require("./img/message_enquiry_ic.png")
                : item.MsgType === 3
                ? require("./img/message_quote_ic.png")
                : require("./img/message_system_pic.png")
            }
          />
          <View style={item.IsHaveNewMsg ? styles.IsHaveNewMsg : null} />
        </View>
        <View style={styles.massageRowRight}>
          <View style={styles.massageTitleBox}>
            <Text style={styles.massageTitle}>
              {item.MsgType === 2
                ? "询价通知"
                : item.MsgType === 3
                ? "报价通知"
                : "系统通知"}
            </Text>
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

  onRefresh = () => {
    console.log(111111);
  };
  onEndReached = () => {
    console.log(3333333);
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
    backgroundColor: "#f5f5f5",
    paddingLeft: 12,
    paddingRight: 12,
  },
  messageRow: {
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: "row",
  },
  massageRowLeft: {
    paddingTop: (ITEM_HEIGHT - 48) / 2,
    paddingBottom: (ITEM_HEIGHT - 48) / 2,
  },
  IsHaveNewMsg: {
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
