/**
 * 询价列表
 * @flow
 */

import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import InquiryListItem from "@pages/PersonalPages/components/InquiryListItem";
import HeaderTabs from "@pages/PersonalPages/components/HeaderTabs";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type IScrollToIndexParams = {
  animated: boolean,
  index: number,
  viewOffset: number,
  viewPosition: number,
};

type InquiryListProps = {
  data: Array<any>,
  ActiveRoute: "ReceivedInquiry" | "OutgoingInquiry",
  showFoot: boolean,
  getMoreReceivedInquiryData?: Function,
  getReceivedInquiryData?: Function,
  headerHeight: number,
  loading: boolean,
  sendquotedpriceSuccess?: Function,
};
type InquiyListState = {
  refreshing: boolean,
};
class InquiryList extends React.PureComponent<
  InquiryListProps,
  InquiyListState
> {
  state = { refreshing: false };

  static defaultProps = {
    headerHeight: 48,
  };

  _keyExtractor = (item, index) => {
    if (this.props.ActiveRoute === "OutgoingInquiry") {
      return `${item.IID}-${item.BDLineGUID}`;
    } else if (this.props.ActiveRoute === "ReceivedInquiry") {
      return item.BDLineGUID;
    } else {
      return ` ${index} `;
    }
  };

  _renderItem = ({ item }) => (
    <InquiryListItem
      data={item}
      sendquotedpriceSuccess={this.props.sendquotedpriceSuccess}
      ActiveRoute={this.props.ActiveRoute}
    />
  );

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
    const { showFoot, data, loading } = this.props;
    if (showFoot && data.length > 0) {
      return (
        <View
          style={{
            height: 30,
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#fff",
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
  _renderListHeaderComponent = () => {
    const { headerHeight } = this.props;
    return <View style={{ height: headerHeight }} />;
  };

  onRefresh = () => {
    const { getReceivedInquiryData } = this.props;
    getReceivedInquiryData && getReceivedInquiryData();
  };
  onEndReached = () => {
    const { data, getMoreReceivedInquiryData, showFoot, loading } = this.props;
    if (data.length >= 10 && !showFoot && !loading) {
      getMoreReceivedInquiryData && getMoreReceivedInquiryData();
    }
  };
  scrollToIndex = (params: IScrollToIndexParams) => {
    this.FlatListRef && this.FlatListRef.scrollToIndex(params);
  };
  FlatListRef: any = null;
  render() {
    // console.log(12121212);
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
          ListHeaderComponent={this._renderListHeaderComponent}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          ref={ref => (this.FlatListRef = ref)}
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
