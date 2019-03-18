/**
 * 库存详情
 * @flow
 */
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ZnlHeader, ZnlCardList } from "@components";

// 销售定价 = 销售价 * 1.16 ¥
// 成本价 有权限
type Props = { navigation: INavigation };
type State = {
  data: any,
  NoSeeStockCost: boolean,
  name: string,
};
class InventoryDetails extends Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => {
    const goBack = () => {
      navigation.goBack();
    };
    const name = navigation.getParam("name");
    let Title = "";
    switch (name) {
      case "StkStock":
        Title = "库存详情";
        break;

      default:
        break;
    }
    return {
      header: <ZnlHeader title={Title} onPressIcon={goBack} />,
    };
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      data: {},
      NoSeeStockCost: false,
      name: "",
    };
  }
  _renderRow = item => {
    const { data, NoSeeStockCost } = this.state;
    let showValue = true;
    if (item.value === "BuyPrice") {
      if (!NoSeeStockCost) {
        showValue = false;
      }
    }
    return (
      <View style={styles.baseRow}>
        <View style={{ width: 80 }}>
          <Text style={styles.baseRowTitle}>{item.key}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          {showValue && (
            <Text style={styles.baseRowValue}>{data[item.value]}</Text>
          )}

          {item.value === "SalesPrice" && !isNaN(data[item.value] * 1.16) && (
            <Text>(含税： {data[item.value] * 1.16})</Text>
          )}
        </View>
      </View>
    );
  };
  render() {
    const { data } = this.state;
    const TopDatas = [
      {
        key: "品牌",
        value: "Brand",
      },
      {
        key: "批号",
        value: "MakeYear",
      },
      {
        key: "封装",
        value: "Packaging",
      },
      {
        key: "品质",
        value: "Quality",
      },
      {
        key: "库存量",
        value: "InvQty",
      },
      {
        key: "包装",
        value: "MPQ",
      },
      {
        key: "货期",
        value: "Leadtime",
      },
      {
        key: "位置",
        value: "StorageName",
      },
      {
        key: "仓库",
        value: "InvPosition",
      },
      {
        key: "入库时间",
        value: "StkInTime",
      },
    ];
    const BottomDatas = [
      {
        key: "采购员",
        value: "BuyerName",
      },
      {
        key: "合伙人",
        value: "Partner",
      },
      {
        key: "销售定价",
        value: "SalesPrice",
      },
      {
        key: "销售价",
        value: "FollowPrice",
      },
      {
        key: "采购价",
        value: "BuyPrice",
      },
      {
        key: "交易说明",
        value: "Explain",
      },
      {
        key: "备注",
        value: "Remark",
      },
    ];
    return (
      <View style={styles.container}>
        <ScrollView style={styles.containerScrollView}>
          <View style={[styles.boxCom, styles.top]}>
            <View style={styles.header}>
              <Text
                style={styles.model}
                selectable={true}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {data.Model}
              </Text>
              <Text style={styles.InvType}>{data.InvType}</Text>
            </View>
            <ZnlCardList datas={TopDatas} renderRow={this._renderRow} />
          </View>

          <View style={[styles.boxCom, styles.top]}>
            <View style={styles.header}>
              <Text
                style={styles.model}
                selectable={true}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {data.SupplierName}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>供应商</Text>
            </View>
            <ZnlCardList datas={BottomDatas} renderRow={this._renderRow} />
          </View>
        </ScrollView>
      </View>
    );
  }
  componentWillMount() {
    const { navigation } = this.props;
    const data = navigation.getParam("data");
    const name = navigation.getParam("name");
    const NoSeeStockCost = navigation.getParam("NoSeeStockCost");
    navigation.setParams({
      name,
    });
    this.setState({
      data,
      name,
      NoSeeStockCost,
    });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 12,
    paddingRight: 0,
    paddingTop: 10,
  },
  containerScrollView: {
    paddingRight: 12,
  },
  boxCom: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 6,
    marginBottom: 20,
  },
  top: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  model: {
    maxWidth: 300,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  InvType: {
    fontSize: 16,
    color: "#ee7700",
    fontWeight: "bold",
  },
  baseRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  baseRowTitle: {
    fontSize: 15,
    color: "#999",
  },
  baseRowValue: {
    maxWidth: 280,
    fontSize: 15,
    flex: 1,
  },
});

export default InventoryDetails;
