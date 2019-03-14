/* @flow */
import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
// import Icon from "react-native-vector-icons/AntDesign";
import Icon from "@components/Iconfont/CloudIcon";

type Props = {
  title: string,
  children: any,
  showDeleteIcon: boolean,
  onPressDelete?: Function,
  style?: Object,
};
class SearchPane extends Component<Props> {
  static defaultProps = {
    showDeleteIcon: true,
  };
  render() {
    const {
      title,
      children,
      showDeleteIcon,
      onPressDelete,
      style,
    } = this.props;
    return (
      <View style={[styles.SearchPane, style]}>
        <View style={styles.SearchPaneTitle}>
          <Text style={styles.SearchPaneTitleText}>{title}</Text>
          {showDeleteIcon && (
            <Icon.Button
              name={"delete_ic"}
              size={18}
              color="#999"
              backgroundColor="transparent"
              iconStyle={styles.Icon}
              onPress={onPressDelete}
            />
          )}
        </View>
        <View style={styles.SearchPaneBody}>{children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SearchPane: {
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  SearchPaneTitle: {
    height: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 8,
  },
  SearchPaneTitleText: {
    fontSize: 14,
    color: "#666",
  },
  Icon: {
    marginRight: 0,
  },
  SearchPaneBody: {
    paddingTop: 5,
    paddingBottom: 0,
  },
});

export default SearchPane;
