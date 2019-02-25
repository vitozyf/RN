/**
 * 区域列表
 * @flow
 */
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  renderRow: Function,
  datas: Array<any>,
};
class ZnlCardList extends Component<Props> {
  render() {
    const { renderRow, datas } = this.props;
    const RowElement = datas.map((item, index) => {
      const borderHide = index === datas.length - 1;
      return (
        <View
          style={[styles.cardRow, borderHide ? styles.borderHide : null]}
          key={index}
        >
          {renderRow && renderRow(item)}
        </View>
      );
    });
    return <View style={styles.container}>{RowElement}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 8,
  },
  cardRow: {
    marginLeft: 12,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    height: 44,
  },
  borderHide: {
    borderBottomWidth: 0,
  },
});

export default ZnlCardList;
