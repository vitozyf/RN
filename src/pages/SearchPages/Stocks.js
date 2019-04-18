/* @flow */
import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import SerchList from "./SerchList";

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

class Stocks extends Component<Props> {
  static navigationOptions = () => {
    return {
      tabBarLabel: "现货库存",
    };
  };
  onSearchHandler = (startindex = 0, isconcat?: boolean = false) => {
    const {
      SetBomSearchInfo,
      TotalCount,
      TotalPage,
      PageSize,
      KeyWord,
      datas,
    } = this.props;
    console.log(111, startindex);
    const serchData = {
      PageSize,
      KeyWord,
      StartIndex: startindex,
    };
    let searchApi = { searchApi: true };
    let onlydata = { onlydata: false };
    let url = `getyunexttopstocks`;
    Cloud.$post(url, serchData, { loading: false, ...searchApi, ...onlydata })
      .then(data => {
        if (data) {
          let PageIndex: number;
          let TotalCount: number;
          let TotalPage: number;
          let StartIndex: number;
          let Datas = [];
          const SupplierProducts = data.Result.Data.SpotStockResult.Data;
          StartIndex = SupplierProducts ? SupplierProducts.SartIndex : 0;
          TotalCount = SupplierProducts ? SupplierProducts.TotalCount : 0;
          Datas = SupplierProducts ? SupplierProducts.ResultList : [];
          SetBomSearchInfo({
            Stocks: {
              datas: isconcat ? datas.concat(Datas) : Datas,
              StartIndex,
              TotalCount,
              showFoot: StartIndex === TotalCount ? 1 : 0,
            },
          });
        }
      })
      .catch(err => {
        Cloud.$addLog("Stocks.js-onSearchHandler", err.message);
      });
  };

  render() {
    const { datas } = this.props;
    return (
      <View>
        <SerchList
          datas={datas}
          ActiveTab="getyunexttopstocks"
          onSearchHandler={this.onSearchHandler}
          {...this.props}
        />
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
      RouterName: "getyunexttopstocks",
    });
  };
}

const mapStateToProps = (state, props) => {
  return Object.assign(
    {},
    { KeyWord: state.BomSearchInfo.KeyWord, ...state.BomSearchInfo.Stocks },
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
)(Stocks);
