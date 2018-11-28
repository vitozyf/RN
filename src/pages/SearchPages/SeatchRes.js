/* @flow */
import React, { Component } from "react";
import Yunext from "./Yunext";
import Stocks from "./Stocks";
import { View, StyleSheet, Text } from "react-native";
import { ZnlInput, ZnlHeader, HeaderRight } from "@components";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { WithSearchHandler } from "@components/HOC";
import { createMaterialTopTabNavigator } from "react-navigation";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  SearchInputBox: {
    height: 32,
    flex: 1,
    marginRight: 10,
  },
  SearchInput: {
    borderRadius: 0,
  },
  HeaderRight: {
    marginRight: 10,
  },
  FontAwesome: {
    paddingLeft: 5,
    paddingRight: 5,
    color: "#999",
  },
  lineBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  verticalline: {
    width: 1,
    height: 20,
    backgroundColor: "#E6E6E6",
    marginLeft: 4,
    marginRight: 8,
  },

  tabBarStyle: {
    backgroundColor: "#fff",
  },
  labelStyle: {
    fontWeight: "bold",
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: "#ee7700",
  },
});

const navigationOptions = {
  activeTintColor: "#ee7700",
  inactiveTintColor: "#333",
  pressOpacity: 1,
  style: styles.tabBarStyle,
  tabStyle: {
    height: 44,
  },
  labelStyle: styles.labelStyle,
  indicatorStyle: styles.indicatorStyle,
};

const TabNav = createMaterialTopTabNavigator(
  {
    Yunext: {
      screen: Yunext,
      path: "/Home/Bom/Yunext",
    },
    Stocks: {
      screen: Stocks,
      path: "/Home/Bom/Stocks",
    },
  },
  {
    initialRouteName: "Yunext",
    lazy: true,
    tabBarOptions: navigationOptions,
    backBehavior: "none",
  }
);

type Props = {
  navigation: INavigation,
  SetBomSearchInfo: Function,
  KeyWord: string,
  PageIndex: number,
  TotalCount: number,
  TotalPage: number,
  PageSize: number,
  RouterName: string,
};
type State = {
  YunExtStocks: Array<any>,
  datas: Array<any>,
  SupplierProducts: Array<any>,
  StartIndex: number,
  ActiveTab: string,
  showFoot: number,
  isLoading: boolean,
  showHeader: boolean,
};

class SeatchRes extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      YunExtStocks: [],
      datas: [],
      SupplierProducts: [],
      StartIndex: 0,
      ActiveTab: "yunext",
      showFoot: 0,
      isLoading: false,
      showHeader: true,
    };
  }
  static router = TabNav.router;
  static navigationOptions = ({ navigation }: any) => {
    const KeyWord = navigation.getParam("KeyWord", "");
    const onSearchHandler: Function = navigation.getParam("onSearchHandler");
    const onChangeText: Function = navigation.getParam("onChangeText");
    const inputRenderLeft = () => {
      return (
        <View style={styles.lineBox}>
          <FontAwesome name={"search"} size={18} style={styles.FontAwesome} />
          <View style={styles.verticalline} />
        </View>
      );
    };
    const renderCenter = () => {
      return (
        <ZnlInput
          style={styles.SearchInputBox}
          inputStyle={styles.SearchInput}
          returnKeyType="search"
          onSubmitEditing={() => onSearchHandler()}
          onChangeText={onChangeText}
          placeholder="请输入型号进行搜索"
          renderLeft={inputRenderLeft}
          defaultValue={KeyWord}
        />
      );
    };
    return {
      header: (
        <ZnlHeader
          renderCenter={renderCenter}
          onPressIcon={() => {
            navigation.goBack();
          }}
          renderRight={() => {
            return (
              <HeaderRight
                style={styles.HeaderRight}
                title="取消"
                onPress={() => {
                  navigation.navigate("Bom");
                }}
              />
            );
          }}
        />
      ),
    };
  };

  // 参数传递进header
  passParameterHandler() {
    const { navigation, KeyWord } = this.props;
    const { onSearchHandler, onChangeText } = this;
    navigation.setParams({ KeyWord });
    navigation.setParams({ onSearchHandler });
    navigation.setParams({ onChangeText });
  }
  onSearchHandler = (name, isconcat?: boolean = false) => {
    const {
      SetBomSearchInfo,
      PageIndex,
      TotalCount,
      TotalPage,
      PageSize,
      KeyWord,
      RouterName,
    } = this.props;
    // 修改搜索记录
    Cloud.$setArrayStorage(Cloud.$CONFIG.KeyWords, KeyWord, 8);
    // 处理搜索
    this.setState({ isLoading: true });
    const serchData = {
      PageSize,
      KeyWord,
      PageIndex: 1,
      StartIndex: 0,
    };
    let searchApi = { searchApi: false };
    let onlydata = { onlydata: true };
    let url = "";
    const CurrentName = name ? name : RouterName;
    switch (CurrentName) {
      case "yunext":
        serchData.PageIndex = PageIndex;
        url = `appget/${CurrentName}`;
        break;
      case "getyunexttopstocks":
        serchData.StartIndex = 1;
        searchApi.searchApi = true;
        onlydata.onlydata = false;
        url = `${CurrentName}`;
        break;
      default:
        break;
    }
    Cloud.$post(url, serchData, {
      loading: CurrentName === "yunext",
      ...searchApi,
      ...onlydata,
    })
      .then(data => {
        this.setState({ isLoading: false });
        if (data) {
          let PageIndex: number;
          let TotalCount: number;
          let TotalPage: number;
          let StartIndex: number;
          let Datas = [];
          switch (CurrentName) {
            case "yunext":
              const YunExtStocks = data.YunExtStocks;
              PageIndex = YunExtStocks ? YunExtStocks.Data.PageIndex : 1;
              TotalCount = YunExtStocks ? YunExtStocks.Data.TotalCount : 1;
              TotalPage = YunExtStocks ? YunExtStocks.Data.TotalPage : 1;
              Datas = YunExtStocks ? YunExtStocks.Data.ResultList : [];
              SetBomSearchInfo({
                Yunext: {
                  datas: Datas,
                  PageIndex,
                  TotalCount,
                  TotalPage,
                  showFoot: PageIndex === TotalPage ? 1 : 0,
                },
              });
              break;
            case "getyunexttopstocks":
              const SupplierProducts = data.Result.Data.SpotStockResult.Data;
              StartIndex = SupplierProducts ? SupplierProducts.SartIndex : 0;
              TotalCount = SupplierProducts ? SupplierProducts.TotalCount : 0;
              Datas = SupplierProducts ? SupplierProducts.ResultList : [];
              SetBomSearchInfo({
                Stocks: {
                  datas: Datas,
                  StartIndex,
                  TotalCount,
                  showFoot: StartIndex === TotalCount ? 1 : 0,
                },
              });

              break;
            default:
              break;
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  onChangeText = (value: string) => {
    this.props.SetBomSearchInfo({
      KeyWord: value,
    });
  };
  setStateHandler = (stateName: string, value: string, bc: Function) => {
    this.setState(
      {
        [stateName]: value,
      },
      () => {
        if (bc) {
          bc();
        }
      }
    );
  };
  render() {
    return <TabNav navigation={this.props.navigation} />;
  }
  componentWillMount() {
    this.passParameterHandler();
    this.onSearchHandler();
    const { navigation } = this.props;
    this.onSearchHandler("getyunexttopstocks");
  }
}

const mapStateToProps = (state, props) => {
  return Object.assign(
    {},
    {
      KeyWord: state.BomSearchInfo.KeyWord,
      RouterName: state.BomSearchInfo.RouterName,
      ...state.BomSearchInfo.Yunext,
    },
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
)(SeatchRes);
