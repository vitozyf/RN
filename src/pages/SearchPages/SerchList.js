/* @flow */
import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { BackTop } from "@components";
import { connect } from "react-redux";
import { ISIOS } from "@src/utils/system";
import Icon from "@components/Iconfont/CloudIcon";

const ITEM_HEIGHT = 30; // list行高
const HEADER_HEIGHT = 50; // 头部高

type Props = {
  value: Object,
  ActiveTab: string,
  navigation: INavigation,
};
type State = {
  listRow: Object | null,
};

class ListRow extends PureComponent<Props> {
  toCompanyDetail = listRow => {
    const { navigation } = this.props;
    navigation.push("CompanyInfo", {
      listRow,
    });
  };
  RowClickHandler = value => {
    const companyId = value.Supplier.Id;
    const companyName = value.SupplierName;
    if ((companyId || companyName) && !value.IsInvisibleSupplier) {
      this.toCompanyDetail(value);
    }
  };
  render() {
    const { value, ActiveTab } = this.props;
    const IsInvisibleSupplierStyle = value.IsInvisibleSupplier
      ? styles.colorccc
      : null;
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
      case 5:
        StockTypeTextEle = (
          <Text style={[styles.StockTypeCommon, styles.StockType5]}>
            订货服务
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
      case 7:
        StockTypeTextEle = (
          <Text style={[styles.StockTypeCommon, styles.StockType7]}>
            品牌替代
          </Text>
        );
        break;
      default:
        break;
    }
    // 数据、样式区分
    let ComputedData = {};
    let ActiveStyle = {};
    let ViewQty = "";
    switch (ActiveTab) {
      case "yunext":
        ComputedData.UnitPriceText = value.UnitPriceText; // 价格
        ComputedData.QuotedPhrase = value.QuotedPhrase; // 发布时间
        StockTypeTextEle = null;
        ActiveStyle = styles.yunextTitle;
        ViewQty = value.QuantityPhrase;
        break;
      case "getyunexttopstocks":
        ComputedData.UnitPriceText = value.Properties;
        ComputedData.QuotedPhrase = value.PDatePhrase;
        ActiveStyle = styles.stocksTitle;
        ViewQty = value.Qty;
        break;
      default:
        break;
    }

    return (
      <TouchableOpacity
        style={styles.FlatListRow}
        activeOpacity={0.8}
        onPress={() => {
          this.RowClickHandler(value);
        }}
      >
        {/* top */}
        <View style={[styles.FlatListRowTop]}>
          <View style={styles.FlatListRowTopTitleBox}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={[
                styles.TextCommon,
                value.SType === 3 ? styles.TextRed : null,
                styles.FlatListRowTopTitle,
                ActiveStyle,
              ]}
            >
              {value.PartNo}&nbsp;
            </Text>
            <View style={[styles.StockTypeTextEleBox]}>{StockTypeTextEle}</View>
          </View>

          <View style={styles.FlatListRowTopConteneBox}>
            <Text
              style={[
                styles.TextColor333,
                styles.TextCommon,
                value.SType === 3 ? styles.TextRed : null,
              ]}
            >
              {ComputedData.QuotedPhrase && (
                <Text
                  style={[
                    styles.color999,
                    styles.TextSize12,
                    value.SType === 3 ? styles.TextRed : null,
                  ]}
                >
                  ({ComputedData.QuotedPhrase}){" "}
                </Text>
              )}
              <Text
                style={[
                  styles.TextColor333,
                  ActiveTab === "getyunexttopstocks" ? styles.colorMain : null,
                  ActiveTab === "getyunexttopstocks" ? styles.FontBold : null,
                ]}
              >
                {ActiveTab === "getyunexttopstocks" && (
                  <Icon name="amount_ic" size={12} />
                )}
                {ViewQty}
              </Text>
              <Text
                style={[
                  styles.ColorMain,
                  styles.FontBold,
                  value.SType === 3 ? styles.TextRed : null,
                ]}
              >
                {ComputedData.UnitPriceText}
              </Text>
            </Text>
          </View>
        </View>
        {/* bottom */}
        <View style={[styles.FlatListRowBottom]}>
          <Text
            style={[
              styles.TextCommonBottom,
              value.SType === 3 ? styles.TextRed : null,
              IsInvisibleSupplierStyle,
              styles.fontSize13,
            ]}
          >
            {value.Brand} | {value.Package} | {value.MakeAges}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[
              styles.TextCommonBottom,
              styles.TextCommonBottomSupplierName,
              value.SType === 3 ? styles.TextRed : null,
              IsInvisibleSupplierStyle,
              styles.fontSize13,
            ]}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;{value.SupplierName}
          </Text>
        </View>
        {/* getyunexttopstocks */}
        {ActiveTab === "getyunexttopstocks" && (
          <View style={styles.stocksBottom}>
            <Text
              style={[
                styles.color666,
                styles.stocksBottomText,
                styles.fontSize13,
              ]}
            >
              {value.Description}
            </Text>
            <Text
              style={[
                styles.color666,
                styles.stocksBottomText,
                styles.fontSize13,
              ]}
            >
              {value.Depot}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

type SerchListProps = {
  showFoot: boolean,
  datas: Array<any>,
  onSearchHandler: Function,
  SetHeaderHeight: Function,
  setActiveTab: Function,
  PageIndex: number,
  ActiveTab: string,
  StartIndex: number,
  TotalCount: number,
  isLoading: boolean,
  TotalPage: number,
  PageSize: number,
  navigation: INavigation,
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
  // 滚动
  onScroll = event => {
    const that = this;
    // const { SetHeaderHeight } = this.props;
    let newScrollOffset = event.nativeEvent.contentOffset.y;
    // console.log(newScrollOffset);

    // 搜索栏
    // if (newScrollOffset <= 60 && newScrollOffset >= 0) {
    //   SetHeaderHeight((ISIOS ? 64 : 44) - newScrollOffset);
    //   console.log((ISIOS ? 64 : 44) - newScrollOffset);
    // }

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
      <ListRow value={item} ActiveTab={ActiveTab} navigation={navigation} />
    );
  };
  flatList: any;
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
            length: 48,
            offset: (48 + 1) * index,
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
  didBlurSubscription: any;
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
  // common
  colorMain: {
    color: "#ee7700",
  },
  colorccc: {
    color: "#ccc",
  },
  color666: {
    color: "#666",
  },
  fontSize13: {
    fontSize: 13,
  },
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
    paddingLeft: 8,
    paddingRight: 8,
  },
  TextCommon: {
    lineHeight: 22,
    fontSize: 15,
  },
  TextCommonBottom: {
    fontSize: 13,
    lineHeight: 18,
    color: "#666",
  },
  TextCommonBottomSupplierName: {
    maxWidth: 180,
    color: "#000",
  },
  yunextTitle: {},
  stocksTitle: {
    // color: "#000",
  },
  FlatListRowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 4,
    paddingBottom: 4,
  },
  FlatListRowTopTitleBox: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",

    flexWrap: "wrap",
  },
  FlatListRowTopTitle: {
    // fontWeight: "bold",
    maxWidth: 175,
  },
  FlatListRowTopConteneBox: {
    flexWrap: "wrap",
    marginLeft: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  TextRed: {
    color: "red",
  },
  TextColor333: {
    color: "#333",
  },
  color999: {
    color: "#999",
  },
  TextSize12: {
    fontSize: 12,
  },
  ColorMain: {
    color: "#EF7609",
  },
  FontBold: {
    fontWeight: "bold",
  },
  FlatListRowBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 3,
  },
  // 现货类型
  StockTypeTextEleBox: {
    // width: 80,
  },
  StockTypeCommon: {
    fontSize: 12,
    lineHeight: 16,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 2,
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
  StockType5: {
    color: "#fff",
    backgroundColor: "#269AF3",
    borderColor: "#269AF3",
  },
  StockType9: {
    color: "#FFF",
    backgroundColor: "#00bedb",
    borderColor: "#00bedb",
  },
  StockType7: {
    color: "#006DCC",
    backgroundColor: "#CCE7FF",
    borderColor: "#006DCC",
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
  // 现货
  stocksBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 4,
  },
  stocksBottomText: {
    lineHeight: 18,
  },
});

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
