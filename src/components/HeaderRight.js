import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

class HeaderRight extends Component {
  render() {
    const { title, style, onPress } = this.props;
    return (
      <TouchableOpacity
        style={[styles.HeaderRightView, style]}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Text style={[styles.title]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  HeaderRightView: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },
});

HeaderRight.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  onPress: PropTypes.func,
};
// HeaderRight.defaultProps = {
//   title: ''
// }

export default HeaderRight;
