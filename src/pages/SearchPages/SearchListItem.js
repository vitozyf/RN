/**
 * 搜索结果列表行
 * @flow
 */
import React, { PureComponent } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import type { IData } from "./SerchList";

type Props = {
  value: IData,
  navigation: INavigation,
};

class SearchListItem extends PureComponent<Props> {
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

    return (
      <TouchableOpacity
        style={[styles.FlatListRow]}
        activeOpacity={0.8}
        onPress={() => {
          this.RowClickHandler(value);
        }}
      >
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
                styles.yunextTitle,
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
              {value.QuotedPhrase && (
                <Text
                  style={[
                    styles.color999,
                    styles.TextSize12,
                    value.SType === 3 ? styles.TextRed : null,
                  ]}
                >
                  ({value.QuotedPhrase}){" "}
                </Text>
              )}
              <Text style={[styles.TextColor333]}>{value.QuantityPhrase}</Text>
              <Text
                style={[
                  styles.ColorMain,
                  styles.FontBold,
                  value.SType === 3 ? styles.TextRed : null,
                ]}
              >
                {value.UnitPriceText}
              </Text>
            </Text>
          </View>
        </View>
        {/* bottom */}
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
            {value.SupplierName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  // common
  colorMain: {
    color: "#ee7700",
  },
  colorccc: {
    color: "#ccc",
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
  yunextTitle: {},
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
});

export default SearchListItem;
