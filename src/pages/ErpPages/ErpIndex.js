/* @flow */
import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { HeaderTitle, ZnlCardList } from "@components";

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

  _renderRow = (item, index) => {
    return (
      <TouchableOpacity
        style={[styles.row]}
        activeOpacity={0.8}
        onPress={item.onPress}
      >
        <Image style={styles.titleicon} source={item.image} />
        <Text style={styles.title}>{item.key}</Text>
        <AntDesign style={styles.icon} name="right" size={20} />
      </TouchableOpacity>
    );
  };

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
    let datas = [];
    if (!!ShowStkStock) {
      datas.push({
        key: "库存",
        image: require("./img/list-wh_ic.png"),
        onPress: () => {
          this.toErpList("StkStock");
        },
      });
    }
    if (!!ShowPastStkIn) {
      datas.push({
        key: "入库",
        image: require("./img/list-into-wh_ic.png"),
        onPress: () => {
          this.toErpList("StkInRecord");
        },
      });
    }
    if (!!ShowPastStkOut) {
      datas.push({
        key: "出库",
        image: require("./img/list-go-out-wh_ic.png"),
        onPress: () => {
          this.toErpList("StkOutByModel");
        },
      });
    }
    if (!!ShowPastStkOut) {
      datas.push({
        key: "询价",
        image: require("./img/list-askprice_ic.png"),
        onPress: () => {
          this.toErpList("StkInquireRecord");
        },
      });
    }
    if (!!ShowPastQuote) {
      datas.push({
        key: "报价",
        image: require("./img/list-quote_ic.png"),
        onPress: () => {
          this.toErpList("HisOfferPrice");
        },
      });
    }
    if (AppErpUserRoleList.length > 0) {
      return (
        <View style={styles.container}>
          <ZnlCardList
            datas={datas}
            renderRow={this._renderRow}
            style={{ borderBottomWidth: 1, borderColor: "#f0f0f0" }}
            rowStyle={{ height: 52 }}
          />
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
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    fontSize: 15,
  },
  titleicon: {
    marginLeft: 0,
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
