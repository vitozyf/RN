/* @flow */
import React, { Component } from "react";
import Yunext from "./Yunext";
import Stocks from "./Stocks";
import { View, StyleSheet, Text } from "react-native";
import { ZnlInput } from "@components";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { WithSearchHandler } from "@components/HOC";
import { createMaterialTopTabNavigator } from "react-navigation";
import { connect } from "react-redux";

const styles = StyleSheet.create({
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

  tabBarStyle: {
    backgroundColor: "#fff",
  },
  labelStyle: {
    fontWeight: "bold",
  },
  indicatorStyle: {
    height: 0,
  },
});

const navigationOptions = {
  activeTintColor: "#ee7700",
  inactiveTintColor: "#333",
  pressOpacity: 1,
  style: styles.tabBarStyle,
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
    return {
      headerTitle: (
        <ZnlInput
          style={styles.SearchInputBox}
          inputStyle={styles.SearchInput}
          returnKeyType="search"
          onSubmitEditing={() => onSearchHandler()}
          onChangeText={onChangeText}
          defaultValue={KeyWord}
          placeholder="请输入型号进行搜索"
        >
          <FontAwesome name={"search"} size={24} style={styles.FontAwesome} />
        </ZnlInput>
      ),
      // headerRight: <HeaderRight style={styles.HeaderRight}/>,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTitleStyle: {
        color: "#333",
      },
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
    console.log(11111, RouterName);
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
    // this.setState({
    //   KeyWord: value,
    // });
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
