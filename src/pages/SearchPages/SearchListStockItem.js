/**
 * 搜索结果列表行
 * @flow
 */
import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "@components/Iconfont/CloudIcon";
import type { IData } from "./SerchList";

type Props = {
  value: IData,
  navigation: INavigation,
};

class SearchListStockItem extends PureComponent<Props> {
  toCompanyDetail = (listRow: IData) => {
    const { navigation } = this.props;
    navigation.push("CompanyInfo", {
      listRow,
    });
  };
  RowClickHandler = (value: IData) => {
    const companyId = value.Supplier.Id;
    const companyName = value.SupplierName;
    if ((companyId || companyName) && !value.IsInvisibleSupplier) {
      this.toCompanyDetail(value);
    }
  };
  render() {
    const { value } = this.props;
    const IsInvisibleSupplierStyle = value.IsInvisibleSupplier
      ? styles.colorccc
      : null;
    // 现货类型
    const StockType = value.StockType;
    let StockTypeTextEle = null;
    let StockTypeBorderColor = styles.StockType0BorderColor;
    switch (StockType) {
      case 4:
        StockTypeTextEle = (
          <Text style={[styles.StockTypeCommon, styles.StockType4]}>
            正品企业
          </Text>
        );
        // StockTypeBorderColor = styles.StockType4BorderColor;
        break;
      case 8:
        StockTypeTextEle = (
          <Text style={[styles.StockTypeCommon, styles.StockType8]}>
            正品物料
          </Text>
        );
        // StockTypeBorderColor = styles.StockType8BorderColor;
        break;
      case 5:
        StockTypeTextEle = (
          <Text style={[styles.StockTypeCommon, styles.StockType5]}>
            正品期货
          </Text>
        );
        // StockTypeBorderColor = styles.StockType5BorderColor;
        break;
      case 6:
        StockTypeTextEle = (
          <Text style={[styles.StockTypeCommon, styles.StockType6]}>
            保证有料
          </Text>
        );
        // StockTypeBorderColor = styles.StockType6BorderColor;
        break;
      case 9:
        StockTypeTextEle = (
          <Text style={[styles.StockTypeCommon, styles.StockType9]}>
            优势库存
          </Text>
        );
        // StockTypeBorderColor = styles.StockType9BorderColor;
        break;
      case 7:
        StockTypeTextEle = (
          <Text style={[styles.StockTypeCommon, styles.StockType7]}>
            品牌替代
          </Text>
        );
        // StockTypeBorderColor = styles.StockType7BorderColor;
        break;
      default:
        break;
    }
    // title
    if (value.FlatListRowType === 1) {
      return (
        <View>
          <View
            style={{
              height: 10,
              backgroundColor: "#f8f8f8",
            }}
          />
          <View style={[styles.FlatListRowTitle, StockTypeBorderColor]}>
            <View style={[styles.FlatListRowTitleText]}>
              {StockTypeTextEle}
            </View>
          </View>
        </View>
      );
    } else if (value.FlatListRowType === 2) {
      return (
        <View style={styles.FlatListRowTitle2}>
          <View
            style={{
              height: 10,
              backgroundColor: "#f8f8f8",
            }}
          />
          <View style={styles.FlexCenter}>
            <Text style={styles.FlatListRowTitle2Text}>
              以下库存由会员自行发布，正能量未参与任何监督，请自行甄别。
            </Text>
          </View>
          <View style={styles.FlatListRowTitle2Bom}>
            <Text style={styles.FlatListRowTitle2Text}>
              推荐使用正能量验货：
            </Text>
            <Text
              onPress={() => {
                Linking.openURL("tel:0755-23894827");
              }}
              style={[styles.FlatListRowTitle2Text, styles.telText]}
            >
              0755-23894827
            </Text>
          </View>
        </View>
      );
    }
    const Telephone = value.Supplier.Telephone
      ? value.Supplier.Telephone.split(",")[0]
      : "";
    const Tel = Telephone ? Telephone.split(" ")[0] : "";
    return (
      <TouchableOpacity
        style={[styles.FlatListRow]}
        activeOpacity={0.8}
        onPress={() => {
          this.RowClickHandler(value);
        }}
      >
        <View style={styles.flexrow}>
          <View style={styles.flexrow}>
            <Text style={styles.SupplierName}>{value.SupplierName}</Text>
            {(value.Supplier.PublicLabelInfo || []).map((item, index) => {
              if (index < 1) {
                return (
                  <Text style={styles.lableTag} key={index}>
                    {item.LabelName}({item.LabelTimes})
                  </Text>
                );
              }
            })}
          </View>
          <View>{StockTypeTextEle}</View>
        </View>
        {/* top */}
        <View style={[styles.FlatListRowTop]}>
          <View style={styles.FlatListRowTopTitleBox}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={[
                styles.TextCommon,
                value.SType === 3 ? styles.TextRed : null,
                styles.FlatListRowTopTitle,
                styles.stocksTitle,
              ]}
            >
              {value.PartNo}&nbsp;
            </Text>
          </View>

          <View style={styles.FlatListRowTopConteneBox}>
            <Text
              style={[
                styles.TextColor333,
                styles.TextCommon,
                value.SType === 3 ? styles.TextRed : null,
              ]}
            >
              {value.PDatePhrase && (
                <Text
                  style={[
                    styles.color999,
                    styles.TextSize12,
                    value.SType === 3 ? styles.TextRed : null,
                  ]}
                >
                  ({value.PDatePhrase}){" "}
                </Text>
              )}
              <Text
                style={[styles.TextColor333, styles.colorMain, styles.FontBold]}
              >
                <Icon name="amount_ic" size={12} />
                {value.Qty}
              </Text>
              <Text
                style={[
                  styles.ColorMain,
                  styles.FontBold,
                  value.SType === 3 ? styles.TextRed : null,
                ]}
              >
                {value.Properties}
              </Text>
            </Text>
          </View>
        </View>

        <View style={[styles.FlatListRowBottom]}>
          <Text
            style={[
              styles.TextCommonBottom,
              value.SType === 3 ? styles.TextRed : null,
              IsInvisibleSupplierStyle,
              styles.fontSize13,
            ]}
          >
            {value.Brand} | {value.Package} | {value.MakeAges}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[
              styles.TextCommonBottom,
              styles.TextCommonBottomSupplierName,
              value.SType === 3 ? styles.TextRed : null,
              IsInvisibleSupplierStyle,
              styles.fontSize13,
            ]}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
            {value.Depot}
          </Text>
        </View>
        {/* getyunexttopstocks */}
        <View style={styles.stocksBottom}>
          <Text
            style={[
              styles.color666,
              styles.stocksBottomText,
              styles.fontSize13,
            ]}
          >
            {value.Description}
          </Text>
          <Text
            style={[styles.stocksBottomText, styles.fontSize13, styles.telText]}
            onPress={() => {
              Linking.openURL(`tel:${Tel}`);
            }}
          >
            {Tel}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  // common
  flexrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  colorMain: {
    color: "#ee7700",
  },
  colorccc: {
    color: "#ccc",
  },
  color666: {
    color: "#666",
  },
  fontSize13: {
    fontSize: 13,
  },
  TextRed: {
    color: "red",
  },
  TextColor333: {
    color: "#333",
  },
  color999: {
    color: "#999",
  },
  TextSize12: {
    fontSize: 12,
  },
  ColorMain: {
    color: "#EF7609",
  },
  FontBold: {
    fontWeight: "bold",
  },
  // title
  FlatListRowTitle: {
    marginLeft: 8,
    paddingRight: 8,
    borderBottomWidth: 1,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  FlatListRowTitle2: {
    backgroundColor: "#F0F0F0",
  },
  FlexCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  FlatListRowTitle2Bom: {
    flexDirection: "row",
    justifyContent: "center",
  },
  FlatListRowTitle2Text: {
    fontSize: 12,
    lineHeight: 22,
    color: "#666",
  },
  telText: {
    color: "#2288CC",
  },
  FlatListRowTitleText: {
    width: 80,
  },
  FlatListRow: {
    paddingLeft: 8,
    paddingRight: 8,
    borderBottomWidth: 1,
    borderColor: "#E6E6E6",
  },
  TextCommon: {
    lineHeight: 22,
    fontSize: 15,
  },
  TextCommonBottom: {
    fontSize: 13,
    lineHeight: 18,
    color: "#666",
  },
  TextCommonBottomSupplierName: {
    maxWidth: 180,
    color: "#000",
  },
  stocksTitle: {},
  FlatListRowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 4,
    paddingBottom: 4,
  },
  FlatListRowTopTitleBox: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  FlatListRowTopTitle: {
    maxWidth: 175,
  },
  FlatListRowTopConteneBox: {
    flexWrap: "wrap",
    marginLeft: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  FlatListRowBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 3,
  },
  // 现货类型
  StockTypeCommon: {
    fontSize: 12,
    lineHeight: 16,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 2,
    // fontWeight: "bold",
    borderWidth: 1,
    textAlign: "center",
    maxWidth: 80,
  },
  StockType0BorderColor: {
    borderColor: "#E6E6E6",
  },
  StockType4: {
    color: "#fff",
    backgroundColor: "#FF0000",
    borderColor: "#FF0000",
  },
  StockType4BorderColor: {
    borderColor: "#ffaa00",
  },
  StockType6: {
    color: "#ff2200",
    backgroundColor: "#fdf7a0",
    borderColor: "#ffaa00",
  },
  StockType6BorderColor: {
    borderColor: "#ffaa00",
  },
  StockType8: {
    color: "#fff",
    backgroundColor: "#ff6200",
    borderColor: "#ff6200",
  },
  StockType8BorderColor: {
    borderColor: "#ff6200",
  },
  StockType5: {
    color: "#fff",
    backgroundColor: "#269AF3",
    borderColor: "#269AF3",
  },
  StockType5BorderColor: {
    borderColor: "#269AF3",
  },
  StockType9: {
    color: "#FFF",
    backgroundColor: "#00bedb",
    borderColor: "#00bedb",
  },
  StockType9BorderColor: {
    borderColor: "#00bedb",
  },
  StockType7: {
    color: "#006DCC",
    backgroundColor: "#CCE7FF",
    borderColor: "#006DCC",
  },
  StockType7BorderColor: {
    borderColor: "#006DCC",
  },
  lableTag: {
    color: "#41B341",
    borderColor: "#41B341",
    borderWidth: 1,
    borderRadius: 2,
    paddingLeft: 3,
    paddingRight: 3,
    marginLeft: 5,
  },
  SupplierName: {
    fontWeight: "bold",
    color: "#666",
    lineHeight: 30,
  },
  stocksBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 4,
  },
  stocksBottomText: {
    lineHeight: 18,
  },
});

export default SearchListStockItem;
