/* @flow */
import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { HeaderTitle } from "@components";

type ErpIndexProps = {
  navigation: INavigation,
  ErpUserRoleList: Array<any>,
  HomeUserInfo: any,
};

class ErpIndex extends Component<ErpIndexProps> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <HeaderTitle title="ERP" textStyle={{ color: "#fff" }} />,
    };
  };
  toErpList(name) {
    const { navigation, ErpUserRoleList } = this.props;
    // 成本价 true 允许  ， false  不允许看
    const NoSeeStockCost = !ErpUserRoleList.find(item => {
      return item.Code === "NoSeeStockCost";
    });
    navigation.push("ErpList", { name, NoSeeStockCost });
  }

  render() {
    const { ErpUserRoleList, HomeUserInfo } = this.props;
    const IsMainAccount = HomeUserInfo ? HomeUserInfo.IsMainAccount : false;
    let AppErpUserRoleList = ErpUserRoleList || [];
    if (IsMainAccount) {
      AppErpUserRoleList = [
        {
          Code: "StkStock",
        },
        {
          Code: "PastStkIn",
        },
        {
          Code: "PastStkOut",
        },
        {
          Code: "PastInquire",
        },
        {
          Code: "PastQuote",
        },
      ];
    }

    // 库存
    const ShowStkStock = AppErpUserRoleList.find((item: any) => {
      return item.Code === "StkStock";
    });
    // 入库
    const ShowPastStkIn = AppErpUserRoleList.find((item: any) => {
      return item.Code === "PastStkIn";
    });
    // 出库
    const ShowPastStkOut = AppErpUserRoleList.find((item: any) => {
      return item.Code === "PastStkOut";
    });
    // 询价
    const ShowPastInquire = AppErpUserRoleList.find((item: any) => {
      return item.Code === "PastInquire";
    });
    // 报价
    const ShowPastQuote = AppErpUserRoleList.find((item: any) => {
      return item.Code === "PastQuote";
    });
    if (AppErpUserRoleList.length > 0) {
      return (
        <View style={styles.container}>
          {!!ShowStkStock && (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => {
                this.toErpList("StkStock");
              }}
            >
              <Image
                style={styles.titleicon}
                source={require("./img/list-wh_ic.png")}
              />
              <Text style={styles.title}>库存</Text>
              <AntDesign style={styles.icon} name="right" size={20} />
            </TouchableOpacity>
          )}

          {!!ShowPastStkIn && (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => {
                this.toErpList("StkInRecord");
              }}
            >
              <Image
                style={styles.titleicon}
                source={require("./img/list-into-wh_ic.png")}
              />

              <Text style={styles.title}>入库</Text>
              <AntDesign style={styles.icon} name="right" size={20} />
            </TouchableOpacity>
          )}

          {!!ShowPastStkOut && (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => {
                this.toErpList("StkOutByModel");
              }}
            >
              <Image
                style={styles.titleicon}
                source={require("./img/list-go-out-wh_ic.png")}
              />
              <Text style={styles.title}>出库</Text>
              <AntDesign style={styles.icon} name="right" size={20} />
            </TouchableOpacity>
          )}

          {!!ShowPastInquire && (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => {
                this.toErpList("StkInquireRecord");
              }}
            >
              <Image
                style={styles.titleicon}
                source={require("./img/list-askprice_ic.png")}
              />
              <Text style={styles.title}>询价</Text>
              <AntDesign style={styles.icon} name="right" size={20} />
            </TouchableOpacity>
          )}

          {!!ShowPastQuote && (
            <TouchableOpacity
              style={styles.row}
              activeOpacity={0.8}
              onPress={() => {
                this.toErpList("HisOfferPrice");
              }}
            >
              <Image
                style={styles.titleicon}
                source={require("./img/list-quote_ic.png")}
              />
              <Text style={styles.title}>报价</Text>
              <AntDesign style={styles.icon} name="right" size={20} />
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.norule}>
          <Image
            style={styles.nullDataImage}
            source={require("./img/erp-permission_default_pic.png")}
          />
          <Text style={styles.noruleText}>您没有权限访问</Text>
          <Text style={styles.noruleText}>请联系主账号开通权限</Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    borderBottomWidth: 1,
    borderColor: "#E6E6E6",
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  title: {
    flex: 1,
    fontSize: 15,
    // textAlign: 'left',
  },
  titleicon: {
    marginLeft: 16,
    marginRight: 8,
  },
  icon: {
    width: 50,
    textAlign: "center",
    color: "#999",
    fontWeight: "bold",
  },
  norule: {
    flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    paddingTop: 168,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  noruleText: {
    fontSize: 16,
    color: "#999",
    lineHeight: 22,
  },
  nullDataImage: {
    width: 156,
    height: 108,
    marginBottom: 12,
  },
});

const mapStateToProps = (state, props) => {
  return Object.assign(
    {},
    {
      ErpUserRoleList: state.ErpUserRoleList,
      HomeUserInfo: state.UserInfo.HomeUserInfo,
    },
    props
  );
};

export default connect(mapStateToProps)(ErpIndex);
