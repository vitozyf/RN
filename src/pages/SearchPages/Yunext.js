/* @flow */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
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

class Yunext extends Component<Props> {
  static navigationOptions = () => {
    return {
      tabBarLabel: "云价格",
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
    Cloud.$post(url, serchData, { loading: true, ...searchApi, ...onlydata })
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
          SetBomSearchInfo({
            Yunext: {
              datas: isconcat ? datas.concat(Datas) : Datas,
              PageIndex,
              TotalCount,
              TotalPage,
              showFoot: PageIndex === TotalPage ? 1 : 0,
            },
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { navigation, datas, SetBomSearchInfo } = this.props;
    return (
      <View style={styles.viewbox}>
        <SerchList
          datas={datas}
          ActiveTab="yunext"
          onSearchHandler={this.onSearchHandler}
          SetBomSearchInfo={SetBomSearchInfo}
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
      RouterName: "yunext",
    });
  };
}
const styles = StyleSheet.create({
  viewbox: {},
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
)(Yunext);
