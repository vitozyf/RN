import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
// import { StatusBar } from "react-native";
import { connect } from "react-redux";
import { ISIOS } from "@src/utils/system";
class ZnlHeader extends Component {
  render() {
    const {
      style,
      title,
      hideLeft,
      leftIcon,
      onPressIcon,
      renderLeft,
      renderCenter,
      renderRight,
      HeaderHeight,
    } = this.props;

    const Left = hideLeft ? null : renderLeft ? (
      renderLeft()
    ) : (
      <TouchableOpacity
        onPress={onPressIcon || null}
        activeOpacity={0.8}
        style={styles.iconbox}
      >
        <Icon name={leftIcon} color="#999" size={22} style={styles.icon} />
      </TouchableOpacity>
    );

    const CenEle = renderCenter ? (
      renderCenter()
    ) : (
      <Text style={styles.Title}>{title}</Text>
    );

    const RightEle = renderRight && renderRight();

    return (
      <View
        style={[
          styles.Header,
          style,
          {
            height: HeaderHeight,
          },
        ]}
      >
        {Left}
        {CenEle}
        {RightEle}
      </View>
    );
  }
}

ZnlHeader.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string,
  hideLeft: PropTypes.bool,
  leftIcon: PropTypes.string,
  onPressIcon: PropTypes.func,
  renderLeft: PropTypes.func,
  renderCenter: PropTypes.func,
  renderRight: PropTypes.func,
};

ZnlHeader.defaultProps = {
  leftIcon: "ios-arrow-back",
};

const styles = StyleSheet.create({
  Header: {
    paddingTop: ISIOS ? 20 : 0,
    // height: ISIOS ? 64 : 44,
    backgroundColor: "rgba(248,248,248,0.82)",
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
  },
  Title: {
    lineHeight: 44,
    textAlign: "center",
    fontSize: 18,
    flex: 1,
  },
  iconbox: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 44,
    marginRight: 5,
  },
  icon: {},
});

const mapStateToProps = (state, props) => {
  return Object.assign(
    {},
    {
      HeaderHeight: state.HeaderHeight,
    },
    props
  );
};
const mapDispatchToProps = dispatch => {
  return {
    SetHeaderHeight: HeaderHeight => {
      return dispatch({
        type: "SetHeaderHeight",
        HeaderHeight,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZnlHeader);

// export default ZnlHeader;
