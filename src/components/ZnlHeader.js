// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DeviceInfo from "react-native-device-info";
import { connect } from "react-redux";
import { ISIOS } from "@src/utils/system";

type Props = {
  style: Object,
  title: string,
  hideLeft: boolean,
  leftIcon: string,
  onPressIcon: Function,
  renderLeft: Function,
  renderCenter: Function,
  renderRight: Function,
  HeaderHeight: number,
};
class ZnlHeader extends Component<Props> {
  static defaultProps = {
    leftIcon: "ios-arrow-back",
  };
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
        <Icon name={leftIcon} color="#4D4D4D" size={26} style={styles.icon} />
      </TouchableOpacity>
    );

    const CenEle = renderCenter ? (
      renderCenter()
    ) : (
      <Text style={styles.Title}>{title}</Text>
    );

    const RightEle = renderRight ? (
      renderRight()
    ) : (
      <View style={styles.right} />
    );

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

const styles = StyleSheet.create({
  Header: {
    paddingTop: ISIOS
      ? DeviceInfo.getDeviceName() === "iPhone X"
        ? 44
        : 20
      : 0,
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
  right: {
    width: 30,
    marginLeft: 5,
  },
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
