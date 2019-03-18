/* @flow */
import React, { PureComponent } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { BackTop } from "@components";
import { connect } from "react-redux";
import { HeaderHeightInit } from "@src/utils/constant";
import SearchListItem from "./SearchListItem";
import type { IData } from "./SearchListItem";

type SerchListProps = {
  showFoot: boolean,
  datas: Array<IData>,
  onSearchHandler: Function,
  SetHeaderHeight: Function,
  setActiveTab: Function,
  PageIndex: number,
  ActiveTab: "yunext" | "getyunexttopstocks",
  StartIndex: number,
  TotalCount: number,
  isLoading: boolean,
  TotalPage: number,
  PageSize: number,
  navigation: INavigation,
  HeaderHeight: number,
};
type SerchListState = {
  selected: any,
  refreshing: boolean,
};
class SerchList extends PureComponent<SerchListProps, SerchListState> {
  constructor(props) {
    super(props);
    this.state = {
      selected: new Map(),
      refreshing: false,
      // ScrollOffset: 0
    };
  }
  // 渲染底部
  _renderFooter = () => {
    const { showFoot, datas } = this.props;
    if (showFoot === 1 && datas.length > 0) {
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
    } else if (showFoot === 0 || datas.length === 0) {
      return (
        <View style={styles.footer}>
          <Text />
        </View>
      );
    }
  };
  // 渲染空数据
  _renderEmptyView = () => {
    return (
      <View style={styles.EmptyView}>
        <Text style={styles.EmptyText}>暂无数据</Text>
      </View>
    );
  };
  // 自定义分割线
  _renderItemSeparatorComponent = () => {
    return <View style={styles.ItemSeparatorComponent} />;
  };
  // 下拉刷新
  _renderRefresh = () => {
    const { onSearchHandler } = this.props;
    onSearchHandler(1, false);
  };
  // 加载更多
  onEndReached = () => {
    const {
      PageIndex,
      showFoot,
      onSearchHandler,
      ActiveTab,
      StartIndex,
      TotalCount,
      isLoading,
      datas,
      TotalPage,
      PageSize,
    } = this.props;
    if (showFoot === 0 && !isLoading) {
      switch (ActiveTab) {
        case "yunext":
          onSearchHandler(PageIndex + 1, true);
          break;
        case "getyunexttopstocks":
          onSearchHandler(StartIndex + 1, true);
          break;
        default:
          break;
      }
    }
  };
  currentHeaderHeight: number = HeaderHeightInit;
  // 滚动
  onScroll = event => {
    const that = this;
    const { SetHeaderHeight } = this.props;
    const { currentHeaderHeight } = this;
    let newScrollOffset = event.nativeEvent.contentOffset.y;

    // 搜索栏隐藏/显示
    if (newScrollOffset > 100 && currentHeaderHeight === HeaderHeightInit) {
      SetHeaderHeight(0);
      this.currentHeaderHeight = 0;
    } else if (newScrollOffset <= 100 && currentHeaderHeight === 0) {
      SetHeaderHeight(HeaderHeightInit);
      this.currentHeaderHeight = HeaderHeightInit;
    }

    // 回到顶部
    if (newScrollOffset > 100) {
      BackTop.show({
        onPress() {
          that.flatList.scrollToIndex({ viewPosition: 0, index: 0 });
          newScrollOffset = 0;
        },
      });
    } else {
      BackTop.hidden();
    }
  };
  // 函数用于为给定的item生成一个不重复的Key。
  _keyExtractor = (item, index) => String(index);
  // 切换tab
  setActiveTabHandler = name => {
    const { setActiveTab, datas } = this.props;
    setActiveTab(name);
    if (datas.length > 0) {
      this.flatList.scrollToIndex({ viewPosition: 0, index: 0 });
    }
  };
  // 渲染行
  _renderItem = ({ item }) => {
    const { ActiveTab, navigation } = this.props;
    return (
      <SearchListItem
        value={item}
        ActiveTab={ActiveTab}
        navigation={navigation}
      />
    );
  };
  flatList: any;
  render() {
    const { datas, ActiveTab } = this.props;
    let listDatas: Array<any> = [];
    if (ActiveTab === "getyunexttopstocks") {
      let StockType = 0;
      datas.forEach((item, index) => {
        if (StockType !== item.StockType) {
          listDatas.push({
            FlatListRowType:
              new String("485697").indexOf(String(item.StockType)) > -1 ? 1 : 2,
            StockType: item.StockType,
          });
          StockType = item.StockType;
          if (index > 0) {
            listDatas[index - 1].hideBorder = true;
          }
        }
        listDatas.push(item);
      });
    } else {
      listDatas = datas;
    }
    const { refreshing } = this.state;
    return (
      <View style={[styles.SerchList]}>
        {/* {this._renderHeader()} */}
        <FlatList
          data={listDatas}
          extraData={this.state.selected}
          ref={ref => (this.flatList = ref)}
          keyExtractor={this._keyExtractor}
          getItemLayout={(data, index) => ({
            length: 48,
            offset: (48 + 1) * index,
            index,
          })}
          renderItem={this._renderItem}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._renderEmptyView}
          onEndReachedThreshold={0.5}
          onEndReached={this.onEndReached}
          onRefresh={this._renderRefresh}
          refreshing={refreshing}
          onScroll={this.onScroll}
        />
      </View>
    );
  }
  didBlurSubscription: any;
  willFocusListener: any;
  componentWillMount() {
    const { navigation } = this.props;
    this.didBlurSubscription = navigation.addListener("willBlur", payload => {
      BackTop.hidden();
    });
    this.willFocusListener = navigation.addListener("willFocus", () => {
      this.currentHeaderHeight = HeaderHeightInit;
      if (
        this.props.datas.length <= 10 &&
        this.props.HeaderHeight !== HeaderHeightInit
      ) {
        this.props.SetHeaderHeight(HeaderHeightInit);
      }
    });
  }
  componentWillUnmount() {
    this.didBlurSubscription.remove();
    this.willFocusListener.remove();
  }
}

const styles = StyleSheet.create({
  SerchList: {
    height: "100%",
    backgroundColor: "#fff",
  },
  // 分割组件
  ItemSeparatorComponent: {
    height: 1,
    backgroundColor: "#E6E6E6",
  },

  footer: {
    flexDirection: "row",
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  // 空数据
  EmptyView: {
    alignItems: "center",
  },
  EmptyText: {
    textAlign: "center",
    lineHeight: 100,
  },
});

const mapStateToProps = (state, props) => {
  return Object.assign({}, props, {
    HeaderHeight: state.HeaderHeight,
  });
};
const mapDispatchToProps = dispatch => {
  return {
    SetHeaderHeight: HeaderHeight => {
      return dispatch({
        type: "SetHeaderHeight",
        HeaderHeight,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SerchList);
