/* @flow */
import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import { HeaderTitle, HeaderRight } from "@components";

type Props = {
  navigation: INavigation,
  AvatarPath: string,
};
class HeaderLeft extends Component<Props> {
  onPress = () => {
    const { navigation } = this.props;
    navigation.openDrawer();
  };
  render() {
    const { AvatarPath } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.onPress}>
        <Image
          style={styles.headerLeftImg}
          source={{
            uri: AvatarPath,
          }}
        />
      </TouchableOpacity>
    );
  }
}

const HeaderLeftCom = connect((state, props) => {
  return Object.assign({}, { AvatarPath: state.UserInfo.AvatarPath }, props);
})(HeaderLeft);

type ErpIndexProps = {
  navigation: INavigation,
  ErpUserRoleList: Array<any>,
  HomeUserInfo: any,
};

class ErpIndex extends Component<ErpIndexProps> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <HeaderTitle title="ERP" textStyle={{ color: "#fff" }} />,
      headerLeft: <HeaderLeftCom navigation={navigation} />,
      headerRight: <HeaderRight />,
    };
  };
  toErpList(name) {
    const { navigation, ErpUserRoleList } = this.props;
    // 成本价
    const NoSeeStockCost = !!ErpUserRoleList.find(item => {
      return item.ResourceId === 122265;
    });
    navigation.push("ErpList", { name, NoSeeStockCost });
  }

  render() {
    const { ErpUserRoleList, HomeUserInfo } = this.props;
    const { IsMainAccount } = HomeUserInfo;
    let AppErpUserRoleList = ErpUserRoleList;
    if (IsMainAccount) {
      AppErpUserRoleList = [
        {
          ResourceId: 157,
        },
        {
          ResourceId: 200,
        },
        {
          ResourceId: 202,
        },
        {
          ResourceId: 205,
        },
        {
          ResourceId: 209,
        },
        {
          ResourceId: 122265,
        },
      ];
    }

    // 库存
    const ShowStkStock = AppErpUserRoleList.find(item => {
      return item.ResourceId === 157;
    });
    // 入库
    const ShowPastStkIn = AppErpUserRoleList.find(item => {
      return item.ResourceId === 200;
    });
    // 出库
    const ShowPastStkOut = AppErpUserRoleList.find(item => {
      return item.ResourceId === 202;
    });
    // 询价
    const ShowPastInquire = AppErpUserRoleList.find(item => {
      return item.ResourceId === 205;
    });
    // 报价
    const ShowPastQuote = AppErpUserRoleList.find(item => {
      return item.ResourceId === 209;
    });
    // 成本价
    const NoSeeStockCost = AppErpUserRoleList.find(item => {
      return item.ResourceId === 122265;
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
          <Text style={styles.noruleText}>
            您没有权限访问, 请联系主账号开通权限
          </Text>
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
  headerLeftImg: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginLeft: 10,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  noruleText: {
    fontSize: 16,
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
