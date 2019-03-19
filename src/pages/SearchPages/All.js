/**
 * 全部搜索结果
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import SerchList from "./SerchList";
import SearchListItem from "./SearchListItem";
type Props = {
  navigation: INavigation,
  KeyWord: string,
  SetBomSearchInfo: Function,
  datas: Array<any>,
  PageIndex: number,
  TotalCount: number,
  TotalPage: number,
  PageSize: number,
};

class AllSearchRes extends Component<Props> {
  static navigationOptions = () => {
    return {
      tabBarLabel: "全部",
    };
  };

  onSearchHandler = (pageindex = 1, isconcat?: boolean = false) => {
    const {
      SetBomSearchInfo,
      TotalCount,
      TotalPage,
      PageSize,
      KeyWord,
      datas,
    } = this.props;
    const serchData = {
      PageSize,
      KeyWord,
      PageIndex: pageindex,
    };
    let searchApi = { searchApi: false };
    let onlydata = { onlydata: true };
    let url = `appget/yunext`;
    Cloud.$post(url, serchData, { loading: false, ...searchApi, ...onlydata })
      .then(data => {
        if (data) {
          let PageIndex: number;
          let TotalCount: number;
          let TotalPage: number;
          let StartIndex: number;
          let Datas = [];
          const YunExtStocks = data.YunExtStocks;
          PageIndex = YunExtStocks ? YunExtStocks.Data.PageIndex : 1;
          TotalCount = YunExtStocks ? YunExtStocks.Data.TotalCount : 1;
          TotalPage = YunExtStocks ? YunExtStocks.Data.TotalPage : 1;
          Datas = YunExtStocks ? YunExtStocks.Data.ResultList : [];
          const computedDatas = isconcat ? datas.concat(Datas) : Datas;
          SetBomSearchInfo({
            Yunext: {
              datas: computedDatas,
              PageIndex,
              TotalCount,
              TotalPage,
              showFoot: PageIndex === TotalPage ? 1 : 0,
            },
          });
        }
      })
      .catch(err => {
        Cloud.$addLog("Yunext.js-onSearchHandler", err.message);
      });
  };
  render() {
    const { navigation, datas, SetBomSearchInfo } = this.props;

    // const AllResYunextDatas = datas.length > 2 ? [datas[0], datas[1]] : datas;
    const AllResYunextData0 = datas[0] || { Supplier: {} };
    const AllResYunextData1 = datas[1] || { Supplier: {} };
    return (
      <View style={styles.viewbox}>
        <View style={styles.block}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>云价格</Text>
          </View>

          <View style={{ height: 104 }}>
            {/* <SerchList
              {...this.props}
              datas={AllResYunextDatas}
              ActiveTab="yunext"
              onSearchHandler={this.onSearchHandler}
              SetBomSearchInfo={SetBomSearchInfo}
            /> */}
            <SearchListItem value={AllResYunextData0} navigation={navigation} />
            <SearchListItem value={AllResYunextData1} navigation={navigation} />
          </View>

          <TouchableOpacity
            style={styles.moreDataButton}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("Yunext");
            }}
          >
            <Text style={styles.moreDataButtonText}>加载更多</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  willFocusListener: any = null;
  componentWillMount() {
    const { navigation } = this.props;
    this.willFocusListener = navigation.addListener(
      "willFocus",
      this.willFocusHandler
    );
  }
  componentWillUnmount() {
    this.willFocusListener.remove();
  }
  willFocusHandler = () => {
    this.props.SetBomSearchInfo({
      RouterName: "yunext",
    });
  };
}
const styles = StyleSheet.create({
  viewbox: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  block: {
    marginTop: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    paddingLeft: 10,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  moreDataButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  moreDataButtonText: {
    color: "#EE7700",
  },
});
const mapStateToProps = (state, props) => {
  return Object.assign(
    {},
    { KeyWord: state.BomSearchInfo.KeyWord, ...state.BomSearchInfo.Yunext },
    props
  );
};
const mapDispatchToProps = dispatch => {
  return {
    SetBomSearchInfo: BomSearchInfo => {
      return dispatch({
        type: "SetBomSearchInfo",
        BomSearchInfo,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllSearchRes);
