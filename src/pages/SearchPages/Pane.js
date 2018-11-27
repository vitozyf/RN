/**
 * 公司信息面板
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  children?: any,
  title?: string,
  renderHeaderRight?: Function,
};
class Pane extends Component<Props> {
  render() {
    const { children, title, renderHeaderRight } = this.props;
    return (
      <View>
        {title && (
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.line} />
              <Text style={styles.title}>{title}</Text>
            </View>
            {renderHeaderRight && renderHeaderRight()}
          </View>
        )}
        {children}
        <View style={styles.bottomLine} />
      </View>
    );
  }
}
export default Pane;

const styles = StyleSheet.create({
  bottomLine: {
    marginLeft: 10,
    marginRight: 10,
    height: 1,
    flex: 1,
    backgroundColor: "#ccc",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
  },
  headerLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    width: 6,
    height: 20,
    backgroundColor: "#ee7700",
    marginRight: 6,
  },
  title: {
    lineHeight: 40,
    fontWeight: "bold",
    color: "#666",
  },
});
