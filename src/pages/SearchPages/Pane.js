/**
 * 公司信息面板
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  children?: any,
  title?: string,
};
class Pane extends Component<Props> {
  render() {
    const { children, title } = this.props;
    return (
      <View>
        {title && (
          <View style={styles.header}>
            <View style={styles.line} />
            <Text style={styles.title}>{title}</Text>
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
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
