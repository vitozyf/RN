import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/AntDesign";

class SearchPane extends Component {
  render() {
    const { title, children, showDeleteIcon, onPressDelete } = this.props;
    return (
      <View style={styles.SearchPane}>
        <View style={styles.SearchPaneTitle}>
          <Text style={styles.SearchPaneTitleText}>{title}</Text>
          {showDeleteIcon && (
            <Icon.Button
              name={"delete"}
              size={18}
              color="#999"
              backgroundColor="transparent"
              iconStyle={styles.Icon}
              onPress={onPressDelete}
            />
          )}
        </View>
        <View>
          <View style={styles.SearchPaneBody}>{children}</View>
        </View>
      </View>
    );
  }
}

SearchPane.propTypes = {
  title: PropTypes.string,
  showDeleteIcon: PropTypes.bool,
  onPressDelete: PropTypes.func,
};
SearchPane.defaultProps = {
  showDeleteIcon: true,
};

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
    paddingRight: 12,
  },
  SearchPaneTitleText: {
    fontSize: 16,
    color: "#666",
  },
  Icon: {
    marginRight: 0,
    // backgroundColor: '#007AFF'
  },
  SearchPaneBody: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export default SearchPane;
