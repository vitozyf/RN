/* @flow */
import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { BackTop, ZnlInput } from "@components";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import FilterScreen from "./FilterScreen";
import { connect } from "react-redux";
import DeviceInfo from "react-native-device-info";
import { ISIOS } from "@src/utils/system";
import Icon from "@components/Iconfont/CloudIcon";

type Props = {
  value: Object,
  name: string,
};
class ListRow extends PureComponent<Props> {
  render() {
    const { value, name } = this.props;
    const StkStockView = (
      <View style={styles.FlatListRow}>
        {/* top */}
        <View style={[styles.FlatListRowTitle, styles.ViewHeight]}>
          <Text style={[styles.FlatListRowModel, styles.TextCommon]}>
            {value.Model}
          </Text>
          <View style={styles.FlatListRowRightBox}>
            <View>
              <Text style={[styles.FlatListRowInvType, styles.TextCommon]}>
                {value.InvType}
              </Text>
            </View>
            <View style={styles.FlatListRowInvTypeBox}>
              <Feather
                size={16}
                name="database"
                style={styles.FlatListRowInvQtyIcon}
              />
              <Text style={[styles.FlatListRowInvQty, styles.TextCommon]}>
                {value.InvQty}
              </Text>
            </View>
          </View>
        </View>
        {/* center */}
        <View style={[styles.FlatListRowTBody, styles.ViewHeight]}>
          <View style={styles.FlatListRowBodyLeft}>
            <Text style={[styles.TextCommon, styles.TextCommonCenter]}>
              {value.Brand}
            </Text>
            {value.Brand ? (
              <Text
                style={[
                  styles.line,
                  styles.TextCommon,
                  styles.TextCommonCenter,
                ]}
              >
                |
              </Text>
            ) : null}
            <Text style={[styles.TextCommon, styles.TextCommonCenter]}>
              {value.Packaging}
            </Text>
            {value.Packaging ? (
              <Text
                style={[
                  styles.line,
                  styles.TextCommon,
                  styles.TextCommonCenter,
                ]}
              >
                |
              </Text>
            ) : null}
            <Text style={[styles.TextCommon, styles.TextCommonCenter]}>
              {value.MakeYear}
            </Text>
          </View>

          <View>
            <Text style={[styles.TextCommon, styles.TextCommonCenter]}>
              ¥{value.BuyPrice}
            </Text>
          </View>
        </View>
      </View>
    );
    let TimeKey = "";
    let CompanyKey = "SupplierName";
    let PriceKey = "Price";
    switch (name) {
      case "StkInRecord":
        TimeKey = "ReceiveTime";
        break;
      case "StkOutByModel":
        TimeKey = "ShipTime";
        CompanyKey = "CustomerName";
        break;
      case "StkInquireRecord":
        TimeKey = "CreatedTime";
        break;
      case "HisofferpriceByModel":
        TimeKey = "QuotedTime";
        CompanyKey = "CustomerName";
        PriceKey = "QuotePrice";
        break;
      default:
        break;
    }
    // bottom
    const OtherView = (
      <View style={[styles.FlatListRow, styles.ViewHeight]}>
        <View style={styles.FlatListRowTitle}>
          <Text
            style={[
              styles.FlatListRowModel,
              styles.TextCommon,
              styles.TextCommonBottom,
            ]}
          >
            {value.Model}
          </Text>
          <View style={styles.FlatListRowRightBox}>
            <View style={styles.FlatListRowInvTypeBox}>
              {typeof value[PriceKey] !== "undefined" && (
                <Text
                  style={[
                    styles.FlatListRowInvQtyIcon,
                    styles.TextCommon,
                    styles.TextCommonBottom,
                  ]}
                >
                  ¥
                </Text>
              )}
              <Text
                style={[
                  styles.FlatListRowInvQty,
                  styles.TextCommon,
                  styles.TextCommonBottom,
                ]}
              >
                {value[PriceKey]}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.FlatListRowTBody}>
          <View style={styles.FlatListRowBodyLeft}>
            <Text style={[styles.TextCommon, styles.TextCommonBottom]}>
              {value.Brand}
            </Text>
            <Text
              style={[styles.line, styles.TextCommon, styles.TextCommonBottom]}
            >
              |
            </Text>
            <Text style={[styles.TextCommon, styles.TextCommonBottom]}>
              {value.Packaging}
            </Text>
            <Text
              style={[styles.line, styles.TextCommon, styles.TextCommonBottom]}
            >
              |
            </Text>
            <Text style={[styles.TextCommon, styles.TextCommonBottom]}>
              {value.MakeYear}
            </Text>
          </View>

          <View style={styles.FlatListRowInvTypeBox}>
            <Feather size={14} name="database" />
            <Text style={styles.TextCommon}>{value.Qty}</Text>
          </View>
        </View>

        <View style={styles.FlatListRowTBody}>
          <View style={styles.FlatListRowBodyLeft}>
            <Text style={styles.TextCommon}>{value[CompanyKey]}</Text>
          </View>

          <View style={styles.FlatListRowInvTypeBox}>
            <Text style={styles.TextCommon}>
              {value[TimeKey] ? value[TimeKey].substr(0, 10) : null}
            </Text>
          </View>
        </View>
      </View>
    );
    return name === "StkStock" ? StkStockView : OtherView;
  }
}

type SerchListProps = {
  ActiveTab: string,
  setActiveTab: Function,
  datas: Array<any>,
  navigation: INavigation,
  SetIsTabBarShow: Function,
  SetStatusBarStyle: Function,
};
type SerchListState = {
  selected: any,
  refreshing: boolean,
  viewFocus: boolean,
  datas: Array<any>,
  name: string,
  showComprehensiveRanking: boolean, // 综合排序是否显示
  MakeYear: string, // 综合排序条件 MakeYear ASC， MakeYear DESC
  InvQty: string, // 数量条件 InvQty ASC， InvQty DESC
  UpdatedTime: string, // 更新时间条件 UpdatedTime ASC， UpdatedTime DESC
  PageIndex: number,
  PageSize: number,
  TotalCount: number,
  TotalPage: number,
  DataOver: boolean, // 无更多数据
  loading: boolean,
  isFilterScreenShow: boolean, // 显示筛选条件
  StkWarehouse: Array<any>, // 仓库地址
  FieldWhereString: string, // 筛选条件
  Model: string,
  FieldWhereParams: Object, // 筛选条件对象
};
class SerchList extends PureComponent<SerchListProps, SerchListState> {
  constructor(props) {
    super(props);
    this.state = {
      selected: new Map(),
      refreshing: false,
      viewFocus: false,
      datas: [],
      name: "",
      // ScrollOffset: 0
      showComprehensiveRanking: false,
      MakeYear: "",
      InvQty: "",
      UpdatedTime: "",
      PageIndex: 1,
      PageSize: 50,
      TotalCount: 0,
      TotalPage: 0,
      DataOver: false,
      loading: false,
      isFilterScreenShow: false,
      StkWarehouse: [],
      FieldWhereString: "",
      Model: "",
      FieldWhereParams: {},
    };
  }
  static navigationOptions = ({ navigation }) => {
    const name = navigation.getParam("name");
    let Title = "";
    switch (name) {
      case "StkStock":
        Title = "库存";
        break;
      case "StkInRecord":
        Title = "入库";
        break;
      case "StkOutByModel":
        Title = "出库";
        break;
      case "StkInquireRecord":
        Title = "询价";
        break;
      case "HisofferpriceByModel":
        Title = "报价";
        break;
      default:
        break;
    }
    return {
      headerTitle: Title,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTitleStyle: {
        alignSelf: "center",
        color: "#333",
      },
      headerBackTitleStyle: {
        color: "#333",
      },
    };
  };
  showComprehensiveRankingHandler = value => {
    this.setState({
      showComprehensiveRanking: value,
    });
  };
  // 触发搜索
  onSearch(state) {
    this.setState(state, () => {
      this.getDatas(this.state.name);
    });
    this.setState({
      showComprehensiveRanking: false,
    });
  }
  // 点击数量
  qtyHandler = () => {
    const { InvQty, name } = this.state;
    let qtyKey = "InvQty";
    switch (name) {
      case "StkInRecord":
      case "StkOutByModel":
      case "StkInquireRecord":
      case "HisofferpriceByModel":
        qtyKey = "Qty";
        break;

      default:
        break;
    }
    let newInvQty = "";
    if (!InvQty) {
      newInvQty = `${qtyKey} ASC`;
    } else if (InvQty === `${qtyKey} ASC`) {
      newInvQty = `${qtyKey} DESC`;
    } else if (InvQty === `${qtyKey} ASC`) {
      newInvQty = "";
    }
    this.onSearch({
      InvQty: newInvQty,
    });
  };
  // 点击更新时间
  createdTimeHandler = () => {
    const { UpdatedTime, name } = this.state;
    let TimeKey = "UpdatedTime";
    switch (name) {
      case "StkInRecord":
        TimeKey = "ReceiveTime";
        break;
      case "StkOutByModel":
      case "HisofferpriceByModel":
        TimeKey = "ShipTime";
        break;
      case "StkInquireRecord":
        TimeKey = "CreatedTime";
        break;
      default:
        break;
    }
    let newUpdatedTime = "";
    if (!UpdatedTime) {
      newUpdatedTime = `${TimeKey} ASC`;
    } else if (UpdatedTime === `${TimeKey} ASC`) {
      newUpdatedTime = `${TimeKey} DESC`;
    } else if (UpdatedTime === `${TimeKey} ASC`) {
      newUpdatedTime = "";
    }
    this.onSearch({
      UpdatedTime: newUpdatedTime,
    });
  };

  // 渲染综合排序
  _renderComprehensiveRanking = () => {
    const { showComprehensiveRanking, MakeYear } = this.state;
    return (
      <Modal
        isVisible={showComprehensiveRanking}
        useNativeDriver={true}
        onBackdropPress={() =>
          this.setState({ showComprehensiveRanking: false })
        }
        onSwipe={() => this.setState({ showComprehensiveRanking: false })}
        style={styles.ComprehensiveRankingContainer}
        backdropOpacity={0.3}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={50}
      >
        <View style={styles.ComprehensiveRankingBox}>
          <TouchableOpacity
            style={styles.ComprehensiveRankingRow}
            activeOpacity={1}
            onPress={() => {
              this.onSearch({ MakeYear: "" });
            }}
          >
            <Text
              style={[
                styles.ComprehensiveRankingText,
                MakeYear === "" ? styles.colorMain : null,
              ]}
            >
              综合排序
            </Text>
            {MakeYear === "" && (
              <Text>
                <Icon
                  style={[styles.icon, styles.colorMain]}
                  name="true"
                  size={16}
                />
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ComprehensiveRankingRow}
            activeOpacity={1}
            onPress={() => {
              this.onSearch({ MakeYear: "MakeYear ASC" });
            }}
          >
            <Text
              style={[
                styles.ComprehensiveRankingText,
                MakeYear === "MakeYear ASC" ? styles.colorMain : null,
              ]}
            >
              批号由近到远
            </Text>
            {MakeYear === "MakeYear ASC" && (
              <Text>
                <Icon
                  style={[styles.icon, styles.colorMain]}
                  name="true"
                  size={16}
                />
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ComprehensiveRankingRow}
            activeOpacity={1}
            onPress={() => {
              this.onSearch({ MakeYear: "MakeYear DESC" });
            }}
          >
            <Text
              style={[
                styles.ComprehensiveRankingText,
                MakeYear === "MakeYear DESC" ? styles.colorMain : null,
              ]}
            >
              批号由远到近
            </Text>
            {MakeYear === "MakeYear DESC" && (
              <Text>
                <Icon
                  style={[styles.icon, styles.colorMain]}
                  name="true"
                  size={16}
                />
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  // 渲染筛选条件
  _renderFilterScreen = () => {
    const { isFilterScreenShow, StkWarehouse, name } = this.state;
    return (
      <FilterScreen
        isVisible={isFilterScreenShow}
        closeModal={() => {
          this.setState({ isFilterScreenShow: false });
        }}
        confirmHandler={params => {
          this.FieldWhereStringHandler(params);
        }}
        StkWarehouse={StkWarehouse}
        name={name}
      />
    );
  };
  // 处理筛选条件
  FieldWhereStringHandler = params => {
    const { name } = this.state;
    // let fieldArray = [];
    // for (const key in params) {
    //   if (params.hasOwnProperty(key) && params[key]) {
    //     fieldArray.push(`"${key}":"${params[key]}"`);
    //   }
    // }
    this.setState(
      {
        FieldWhereParams: params,
      },
      () => {
        this.getDatas(name);
      }
    );
    this.setState({ isFilterScreenShow: false });
    // this.setState({ FieldWhereString: `{${fieldArray.join(",")}}` }, () => {
    // });
  };
  // 渲染头部
  _renderHeader = () => {
    const {
      MakeYear,
      InvQty,
      UpdatedTime,
      showComprehensiveRanking,
      FieldWhereString,
      name,
    } = this.state;
    let TimeTitle = "更新时间";
    switch (name) {
      case "StkInRecord":
        TimeTitle = "收获日期";
        break;
      case "StkOutByModel":
        TimeTitle = "出货日期";
        break;
      case "StkInquireRecord":
        TimeTitle = "询价时间";
        break;
      case "HisofferpriceByModel":
        TimeTitle = "报价时间";
        break;
      default:
        break;
    }
    const inputRenderLeft = () => {
      return (
        <View style={styles.lineBox}>
          <FontAwesome name={"search"} size={18} style={styles.FontAwesome} />
          <View style={styles.verticalline} />
        </View>
      );
    };
    const renderRight = () => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.getDatas(this.state.name);
          }}
        >
          <Image
            style={styles.titleicon}
            source={require("./img/s-bar_refresh_ic.png")}
          />
        </TouchableOpacity>
      );
    };
    return (
      <View style={styles.SerchListTitle}>
        <View style={styles.SerchListTitleSearch}>
          <ZnlInput
            style={styles.SearchInputBox}
            inputStyle={styles.SearchInput}
            returnKeyType="search"
            onChangeText={value => {
              this.setState({ Model: value });
            }}
            onSubmitEditing={() => this.getDatas(this.state.name)}
            placeholder="型号"
            renderLeft={inputRenderLeft}
            renderRight={renderRight}
          />
        </View>
        <View style={styles.SerchListTitleHeader}>
          <View
            style={[
              styles.SerchListTitleHeaderView,
              { width: 110, flex: null },
            ]}
          >
            <Text
              style={[
                styles.SerchTitleBlock,
                MakeYear ? styles.colorMain : null,
              ]}
              onPress={() => {
                this.showComprehensiveRankingHandler(!showComprehensiveRanking);
              }}
            >
              综合排序
            </Text>
            <View style={styles.iconBox}>
              <Icon
                style={[
                  styles.icon,
                  MakeYear === "MakeYear ASC" ? styles.colorMain : null,
                  styles.iconTop,
                ]}
                name="arrow_up"
                size={20}
              />
              <Icon
                style={[
                  styles.icon,
                  MakeYear === "MakeYear DESC" ? styles.colorMain : null,
                  styles.iconBottom,
                ]}
                name="arrow_down"
                size={20}
              />
            </View>
          </View>
          <View style={styles.SerchListTitleHeaderView}>
            <Text
              style={[styles.SerchTitleBlock, InvQty ? styles.colorMain : null]}
              onPress={this.qtyHandler}
            >
              数量
            </Text>
            <View style={styles.iconBox}>
              <Icon
                style={[
                  styles.icon,
                  InvQty.indexOf("ASC") > -1 ? styles.colorMain : null,
                  styles.iconTop,
                ]}
                name="arrow_up"
                size={20}
              />
              <Icon
                style={[
                  styles.icon,
                  InvQty.indexOf("DESC") > -1 ? styles.colorMain : null,
                  styles.iconBottom,
                ]}
                name="arrow_down"
                size={20}
              />
            </View>
          </View>
          <View
            style={[
              styles.SerchListTitleHeaderView,
              { width: 110, flex: null },
            ]}
          >
            <Text
              style={[
                styles.SerchTitleBlock,
                UpdatedTime ? styles.colorMain : null,
              ]}
              onPress={this.createdTimeHandler}
            >
              {TimeTitle}
            </Text>
            <View style={styles.iconBox}>
              <Icon
                style={[
                  styles.icon,
                  UpdatedTime.indexOf("ASC") > -1 ? styles.colorMain : null,
                  styles.iconTop,
                ]}
                name="arrow_up"
                size={20}
              />
              <Icon
                style={[
                  styles.icon,
                  UpdatedTime.indexOf("DESC") > -1 ? styles.colorMain : null,
                  styles.iconBottom,
                ]}
                name="arrow_down"
                size={20}
              />
            </View>
          </View>
          <View style={styles.SerchListTitleHeaderView}>
            <Text
              style={[
                styles.SerchTitleBlock,
                FieldWhereString && FieldWhereString !== "{}"
                  ? styles.colorMain
                  : null,
              ]}
              onPress={() => {
                this.setState({ isFilterScreenShow: true });
              }}
            >
              筛选
            </Text>
            <View style={styles.iconBox}>
              <Icon
                style={[
                  styles.icon,
                  FieldWhereString && FieldWhereString !== "{}"
                    ? styles.colorMain
                    : null,
                  { marginLeft: -4 },
                ]}
                name="filter_o"
                size={20}
              />
            </View>
          </View>
        </View>
        {this._renderComprehensiveRanking()}
      </View>
    );
  };
  // 渲染底部
  _renderFooter = () => {
    const { DataOver, datas } = this.state;
    if (DataOver && datas.length > 0) {
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
    } else {
      return null;
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
    this.getDatas(this.state.name);
  };
  // 加载更多
  onEndReached = () => {
    const { name, PageIndex } = this.state;
    this.getDatas(name, PageIndex + 1, true);
  };
  // 滚动
  onScroll = event => {
    const { viewFocus } = this.state;
    if (!viewFocus) {
      return null;
    }
    const that = this;
    let newScrollOffset = event.nativeEvent.contentOffset.y;
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
    if (datas && datas.length > 0) {
      this.flatList.scrollToIndex({ viewPosition: 0, index: 0 });
    }
  };
  // 渲染行
  _renderItem = ({ item }) => {
    const { ActiveTab } = this.props;
    return <ListRow value={item} name={this.state.name} />;
  };
  getDatas(name, PageIndex = 1, isMoreData) {
    const {
      MakeYear,
      InvQty,
      UpdatedTime,
      PageSize,
      datas,
      DataOver,
      loading,
      // FieldWhereString,
      Model,
      FieldWhereParams,
    } = this.state;
    const searchParams = [];
    if (MakeYear) {
      searchParams.push(MakeYear);
    }
    if (InvQty) {
      searchParams.push(InvQty);
    }
    if (UpdatedTime) {
      searchParams.push(UpdatedTime);
    }
    const OrderBy = searchParams.join(",");

    // 已无数据或正在加载数据时，直接返回
    if (DataOver || loading) {
      return null;
    }

    this.setState({
      loading: true,
    });

    let fieldArray = [];
    const FWParams = Object.assign(FieldWhereParams, { Model });
    for (const key in FieldWhereParams) {
      if (FieldWhereParams.hasOwnProperty(key) && FieldWhereParams[key]) {
        fieldArray.push(`"${key}":"${FieldWhereParams[key]}"`);
      }
    }
    const FieldWhereString = `{${fieldArray.join(",")}}`;
    this.setState({
      FieldWhereString,
    });

    Cloud.$post(
      `${name}/Search`,
      {
        FieldWhereString,
        OrderBy,
        PageIndex,
        PageSize,
        isZero: true,
      },
      { erpApi: true, loading: PageIndex === 1 }
    )
      .then(data => {
        this.setState({
          loading: false,
        });
        if (data) {
          this.setState(
            {
              datas: isMoreData
                ? datas.concat(data.ResultList || [])
                : data.ResultList,
              PageIndex: data.PageIndex,
              PageSize: data.PageSize,
              TotalCount: data.TotalCount,
              TotalPage: data.TotalPage,
            },
            () => {
              // 当前请求页为最后一页且无筛选条件时设置DataOver为true
              if (
                data.PageIndex >= this.state.TotalPage &&
                MakeYear === "" &&
                InvQty === "" &&
                UpdatedTime === "" &&
                FieldWhereString === ""
              ) {
                this.setState({
                  DataOver: true,
                });
              }
            }
          );
        }
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  }
  // 获取仓库
  getStkWarehouse() {
    Cloud.$post("StkWarehouse/Search", null, { erpApi: true }).then(data => {
      if (data) {
        this.setState({
          StkWarehouse: data,
        });
      }
    });
  }
  flatList: any;
  render() {
    const { refreshing, selected, datas, name } = this.state;
    const LINE_HEIGHT = name === "StkStock" ? 48 : 70;
    return (
      <View style={[styles.SerchList]}>
        {this._renderHeader()}
        <FlatList
          data={datas}
          extraData={selected}
          ref={ref => (this.flatList = ref)}
          keyExtractor={this._keyExtractor}
          getItemLayout={(data, index) => ({
            length: LINE_HEIGHT,
            offset: (LINE_HEIGHT + 1) * index,
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
        {this._renderFilterScreen()}
      </View>
    );
  }
  willFocusListener: any;
  didBlurSubscription: any;
  componentWillMount() {
    this.setState({
      viewFocus: true,
    });
    const { navigation } = this.props;
    const name = this.props.navigation.getParam("name");
    this.setState({
      name,
    });
    this.getDatas(name);
    if (name === "StkStock") {
      this.getStkWarehouse();
    }
    this.willFocusListener = navigation.addListener(
      "willFocus",
      this.willFocusHandler
    );
    this.didBlurSubscription = navigation.addListener("willBlur", payload => {
      this.setState({
        viewFocus: false,
      });
      BackTop.hidden();
    });
  }
  componentWillUnmount() {
    this.willFocusListener.remove();
    this.didBlurSubscription.remove();
  }
  willFocusHandler = () => {
    const { SetIsTabBarShow } = this.props;
    SetIsTabBarShow(false);
    this.props.SetStatusBarStyle("dark-content");
  };
}

const styles = StyleSheet.create({
  //通用
  colorMain: {
    color: "#ee7700",
  },
  TextCommon: {
    lineHeight: 26,
  },
  TextCommonCenter: {
    lineHeight: 22,
  },
  TextCommonBottom: {
    lineHeight: 22,
  },
  // 组件
  SerchList: {
    flex: 1,
    backgroundColor: "#fff",
  },
  ViewHeight: {},
  iconBox: {
    width: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 3,
  },
  icon: {},
  iconTop: {
    position: "absolute",
    right: 0,
    top: -14,
    fontWeight: "bold",
  },
  iconBottom: {
    position: "absolute",
    right: 0,
    bottom: -14,
    fontWeight: "bold",
  },
  // header
  SerchListTitle: {
    height: 84,
    backgroundColor: "#f8f8f8",
  },
  SerchListTitleSearch: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 8,
    paddingRight: 8,
  },
  SerchListTitleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  SerchListTitleHeaderView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  lineBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  FontAwesome: {
    paddingLeft: 5,
    paddingRight: 5,
    color: "#999",
  },
  verticalline: {
    width: 1,
    height: 20,
    backgroundColor: "#E6E6E6",
    marginLeft: 4,
    marginRight: 8,
  },
  SearchInputBox: {
    width: "100%",
    height: 32,
    flex: 1,
    // borderWidth: 1,
  },
  SearchInput: {
    borderRadius: 0,
  },
  titleicon: {
    width: 30,
    height: 30,
  },
  SerchTitleBlock: {
    paddingLeft: 10,
    // paddingRight: -10,
    fontSize: 16,
  },
  // 分割组件
  ItemSeparatorComponent: {
    height: 1,
    backgroundColor: "#E6E6E6",
  },
  FlatListRow: {
    paddingLeft: 8,
    paddingRight: 8,
    // borderBottomWidth: 1,
    // borderColor: '#E6E6E6'
  },
  FlatListRowTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  FlatListRowModel: {
    fontSize: 15,
    fontWeight: "bold",
  },
  FlatListRowRightBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  FlatListRowInvTypeBox: {
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  FlatListRowInvType: {
    // color: "#ee7700",
    fontSize: 15,
  },
  FlatListRowInvQtyIcon: {
    color: "#ee7700",
    paddingRight: 3,
  },
  FlatListRowInvQty: {
    color: "#ee7700",
    fontSize: 15,
  },

  FlatListRowTBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  FlatListRowBodyLeft: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'space-between',
  },
  line: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  // 空数据
  EmptyView: {
    alignItems: "center",
  },
  EmptyText: {
    textAlign: "center",
    lineHeight: 100,
  },

  // 综合排序
  ComprehensiveRankingContainer: {
    // paddingLeft: 0,
    // paddingRight: 0,
    margin: 0,
  },
  ComprehensiveRankingBox: {
    position: "absolute",
    top: ISIOS ? (DeviceInfo.getDeviceName() === "iPhone X" ? 168 : 142) : 142,
    width: "100%",
    // left: -18,
    // width: 360,
    backgroundColor: "#fff",
  },
  ComprehensiveRankingRow: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  ComprehensiveRankingText: {},
});

const mapStateToProps = (state, props) => {
  return props;
};
const mapDispatchToProps = dispatch => {
  return {
    SetIsTabBarShow: IsTabBarShow => {
      return dispatch({
        type: "SetIsTabBarShow",
        IsTabBarShow,
      });
    },
    SetStatusBarStyle: StatusBarStyle => {
      return dispatch({
        type: "SetStatusBarStyle",
        StatusBarStyle,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SerchList);
