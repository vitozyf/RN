/**
 * 询价列表
 * @flow
 */

import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import InquiryListItem from "@pages/PersonalPages/components/InquiryListItem";
import HeaderTabs from "@pages/PersonalPages/components/HeaderTabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type InquiryListProps = {
  data: Array<any>,
  ActiveRoute: string,
  showFoot: boolean,
};
type InquiyListState = {
  refreshing: boolean,
};
class InquiryList extends React.PureComponent<
  InquiryListProps,
  InquiyListState
> {
  state = { refreshing: false };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => <InquiryListItem data={item} />;

  _renderListEmptyComponent = () => {
    const { ActiveRoute } = this.props;
    return (
      <View style={styles.containerCenter}>
        {ActiveRoute === "OutgoingInquiry" ? (
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

  // 渲染底部
  _renderFooter = () => {
    const { showFoot, data } = this.props;
    if (showFoot && data.length > 0) {
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
      return null;
    }
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
      <KeyboardAwareScrollView>
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
          />
        </View>
      </KeyboardAwareScrollView>
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
    paddingLeft: 12,
    paddingRight: 12,
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
