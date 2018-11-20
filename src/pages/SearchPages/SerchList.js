import React, { PureComponent } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import PropTypes from "prop-types";
import { BackTop } from "@components";
import { connect } from "react-redux";
const ITEM_HEIGHT = 30; // list行高
const HEADER_HEIGHT = 50; // 头部高
import { ISIOS } from "@src/utils/system";

class ListRow extends PureComponent {
  render() {
    const { value, ActiveTab } = this.props;
    // 现货类型
    const StockType = value.StockType;
    let StockTypeTextEle = null;
    switch (StockType) {
      case 4:
        StockTypeTextEle = (
          <Text style={[styles.StockTypeCommon, styles.StockType4]}>
            正品企业
          </Text>
        );
        break;
      case 8:
        StockTypeTextEle = (
          <Text style={[styles.StockTypeCommon, styles.StockType8]}>
            正品物料
          </Text>
        );
        break;
      case 6:
        StockTypeTextEle = (
          <Text style={[styles.StockTypeCommon, styles.StockType6]}>
            保证有料
          </Text>
        );
        break;
      case 9:
        StockTypeTextEle = (
          <Text style={[styles.StockTypeCommon, styles.StockType9]}>
            优势库存
          </Text>
        );
        break;
      default:
        break;
    }
    // 数据区分
    let ComputedData = {};
    switch (ActiveTab) {
      case "yunext":
        ComputedData.UnitPriceText = value.UnitPriceText; // 价格
        ComputedData.QuotedPhrase = value.QuotedPhrase; // 发布时间
        StockTypeTextEle = null;
        break;
      case "getyunexttopstocks":
        ComputedData.UnitPriceText = value.Properties;
        ComputedData.QuotedPhrase = value.PDatePhrase;
        break;
      default:
        break;
    }

    return (
      <View style={styles.FlatListRow}>
        <View style={styles.FlatListRowTop}>
          <View style={styles.FlatListRowTopTitleBox}>
            <Text
              style={[
                styles.TextRed,
                styles.TextCommon,
                styles.FlatListRowTopTitle,
              ]}
            >
              <Text>{value.PartNo}&nbsp;</Text>
            </Text>
            <View style={[styles.StockTypeTextEleBox]}>{StockTypeTextEle}</View>
          </View>

          <View style={styles.FlatListRowTopConteneBox}>
            <Text
              style={[
                styles.TextRed,
                styles.TextCommon,
                styles.TextCommonBottom,
              ]}
            >
              <Text>({ComputedData.QuotedPhrase}) </Text>
              <Text>{value.QuantityPhrase} </Text>
              <Text style={styles.TextMain}>{ComputedData.UnitPriceText}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.FlatListRowBottom}>
          <Text style={[styles.TextCommon, styles.TextCommonBottom]}>
            {value.Brand} | {value.Package} | {value.MakeAges}
          </Text>
          <Text style={[styles.TextCommon, styles.TextCommonBottom]}>
            {value.SupplierName}
          </Text>
        </View>
      </View>
    );
  }
}

class SerchList extends PureComponent {
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
            没有更多数据了
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
  // 滚动
  onScroll = event => {
    const that = this;
    const { SetHeaderHeight } = this.props;
    let newScrollOffset = event.nativeEvent.contentOffset.y;
    // SetHeaderHeight(100);

    // if (newScrollOffset <= 60 && newScrollOffset >= 0) {
    //   SetHeaderHeight((ISIOS ? 64 : 44) - newScrollOffset);
    //   console.log((ISIOS ? 64 : 44) - newScrollOffset);
    // }
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
    const { ActiveTab } = this.props;
    return <ListRow value={item} ActiveTab={ActiveTab} />;
  };
  render() {
    const { datas } = this.props;
    const { refreshing } = this.state;
    return (
      <View style={[styles.SerchList]}>
        {/* {this._renderHeader()} */}
        <FlatList
          data={datas}
          extraData={this.state.selected}
          ref={ref => (this.flatList = ref)}
          keyExtractor={this._keyExtractor}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: (ITEM_HEIGHT + 1) * index,
            index,
          })}
          renderItem={this._renderItem}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={this._renderEmptyView}
          ItemSeparatorComponent={this._renderItemSeparatorComponent}
          onEndReachedThreshold={0.5}
          onEndReached={this.onEndReached}
          onRefresh={this._renderRefresh}
          refreshing={refreshing}
          onScroll={this.onScroll}
        />
      </View>
    );
  }
  componentWillMount() {
    this.didBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      payload => {
        BackTop.hidden();
      }
    );
  }
  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }
}

const styles = StyleSheet.create({
  SerchList: {
    height: "100%",
    backgroundColor: "#fff",
    // paddingBottom: 50
  },
  // 分割组件
  ItemSeparatorComponent: {
    height: 1,
    backgroundColor: "#E6E6E6",
  },
  FlatListRow: {
    // borderBottomWidth: 1,
    // borderColor: '#E6E6E6'
  },
  TextCommon: {
    lineHeight: ITEM_HEIGHT,
    fontSize: 15,
  },
  TextCommonBottom: {
    fontSize: 13,
  },
  FlatListRowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  FlatListRowTopTitleBox: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    flexWrap: "wrap",
  },
  FlatListRowTopTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  FlatListRowTopConteneBox: {
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  TextRed: {
    color: "red",
  },
  TextMain: {
    color: "#EF7609",
  },
  FlatListRowBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // ActiveTab: {
  //   color: "#ee7700",
  // },
  // 现货类型
  StockTypeTextEleBox: {
    // width: 80,
  },
  StockTypeCommon: {
    fontSize: 14,
    // lineHeight: 20,
    paddingLeft: 2,
    paddingRight: 2,
    // fontWeight: "bold",
    borderWidth: 1,
    textAlign: "center",
  },
  StockType4: {
    color: "#fff",
    backgroundColor: "#FF0000",
    borderColor: "#FF0000",
  },
  StockType6: {
    color: "#ff2200",
    backgroundColor: "#fdf7a0",
    borderColor: "#ffaa00",
  },
  StockType8: {
    color: "#fff",
    backgroundColor: "#ff6200",
    borderColor: "#ff6200",
  },
  StockType9: {
    color: "#FFF",
    backgroundColor: "#00bedb",
    borderColor: "#00bedb",
  },
  footer: {
    flexDirection: "row",
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    // backgroundColor: 'red'
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

SerchList.propTypes = {
  datas: PropTypes.array,
  style: PropTypes.object,
};

const mapStateToProps = (state, props) => {
  return props;
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
// export default SerchList;
