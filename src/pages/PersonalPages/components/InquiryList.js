/**
 * 询价列表
 * @flow
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";

type Props = {
  onPressItem: Function,
  id: string,
  selected: boolean,
  title: string,
};
class MyListItem extends React.PureComponent<Props> {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: textColor }}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

type InquiryListProps = {
  data: Array<any>,
  ActiveRouteName: string,
};
type InquiyListState = {
  selected: Map<string, boolean>,
};
class InquiryList extends React.PureComponent<
  InquiryListProps,
  InquiyListState
> {
  state = { selected: (new Map(): Map<string, boolean>) };

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  };

  _renderItem = ({ item }) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  _renderListEmptyComponent = () => {
    const { ActiveRouteName } = this.props;
    return (
      <View style={styles.containerCenter}>
        {ActiveRouteName === "OutgoingInquiry" ? (
          <View style={styles.nullDataBox}>
            <Image
              style={styles.nullDataImage}
              source={require("./img/enquiry-send_default_pic.png")}
            />
            <View style={styles.alignItemsCenter}>
              <Text style={styles.nullDataText}>暂无数据，请登录&nbsp;</Text>
              <Text
                style={[styles.nullDataText, { color: "#ee7700" }]}
                selectable={true}
              >
                www.bom.ai
              </Text>
            </View>
            <Text style={styles.nullDataText}>发起一次询价吧</Text>
          </View>
        ) : (
          <View style={styles.nullDataBox}>
            <Image
              style={styles.nullDataImage}
              source={require("./img/enquiry-received_default_pic.png")}
            />
            <Text style={styles.nullDataText}>暂无数据</Text>
          </View>
        )}
      </View>
    );
  };

  //   shouldComponentUpdate(nextProps, nextState) {
  //     console.log(333, nextProps);
  //     return true;
  //   }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ListEmptyComponent={this._renderListEmptyComponent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alignItemsCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  containerCenter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nullDataBox: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
    width: 250,
  },
  nullDataImage: {
    width: 156,
    height: 108,
    marginBottom: 12,
  },
  nullDataText: {
    color: "#999",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
  },
});

export default InquiryList;
