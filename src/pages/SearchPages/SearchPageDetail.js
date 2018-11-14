import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { BackTop } from "@components";

import { ZnlInput } from "@components";
import SerchList from "./SerchList";

type Props = {
  navigation: INavigation,
  KeyWord: string,
  PageIndex: number,
  PageSize: number,
  TotalCount: number,
  TotalPage: number,
  YunExtStocks: Array<any>,
  datas: Array<any>,
  SupplierProducts: Array<any>,
  StartIndex: number,
  ActiveTab: string,
  showFoot: number,
  isLoading: boolean,
  showHeader: boolean,
};

class SearchPage extends Component<Props> {
  // 参数传递进header
  passParameterHandler() {
    const { navigationm, KeyWord } = this.props;
    const { ActiveTab } = this.state;
    const { onChangeText, onSearchHandler } = this;
    navigation.setParams({
      method: {
        KeyWord,
        onChangeText,
        onSearchHandler,
        ActiveTab,
      },
    });
  }
  render() {
    const {
      datas,
      ActiveTab,
      KeyWord,
      PageIndex,
      StartIndex,
      TotalCount,
      showFoot,
      isLoading,
    } = this.props;
    return (
      <View style={styles.SearchPage}>
        {/* {Header} */}
        <View>
          <SerchList
            datas={datas}
            ActiveTab={ActiveTab}
            setActiveTab={this.setActiveTab}
            PageIndex={PageIndex}
            StartIndex={StartIndex}
            TotalCount={TotalCount}
            isLoading={isLoading}
            setStateHandler={this.setStateHandler}
            showFoot={showFoot}
            onSearchHandler={this.onSearchHandler}
            style={styles.SerchList}
          />
        </View>
      </View>
    );
  }
  didBlurSubscription: any = null;
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
  SearchPage: {
    // paddingTop: 20,
    // paddingLeft: 5,
    // paddingRight: 5,
    backgroundColor: "#fff",
    flex: 1,
  },
  SearchBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
  },
  iconStyle: {
    marginRight: 10,
    width: 10,
  },
  SearchInputBox: {
    flex: 1,
    height: 40,
    paddingRight: 20,
  },
  SearchInput: {
    borderRadius: 10,
    paddingLeft: 40,
    flex: 1,
  },
  FontAwesome: {
    position: "absolute",
    left: 10,
    top: 8,
    color: "#999",
  },
  cancelBtn: {
    marginLeft: 10,
  },
  cancelText: {
    textAlign: "center",
    fontSize: 20,
    lineHeight: 46,
  },
  SerchList: {
    height: "100%",
    paddingBottom: 50,
  },
});

const mapStateToProps = (state, props) => {
  return props;
};

export default connect(mapStateToProps)(SearchPage);
