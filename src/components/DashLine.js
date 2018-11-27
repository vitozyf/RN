/**
 * 虚线
 * @flow
 */

import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

const LineWidth = 5;
const LineMargin = 3;
const LineHeight = 1;

type Props = {
  len: number, // 虚线个数
  width: number, // 总长度
  backgroundColor: string, // 背景颜色
};
export default class DashLine extends Component<Props> {
  static defaultProps = {
    backgroundColor: "#999",
  };
  render() {
    const { len, width, backgroundColor } = this.props;
    const arr = [];
    for (let i = 0; i < width / (LineWidth + LineMargin); i++) {
      arr.push(i);
    }
    return (
      <View style={[styles.dashLine]}>
        {arr.map((item, index) => {
          return (
            <View
              style={[styles.dashItem, { backgroundColor }]}
              key={"dash" + index}
            />
          );
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dashLine: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  dashItem: {
    height: LineHeight,
    width: LineWidth,
    marginRight: LineMargin,
    flex: 1,
  },
});
