// @flow
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DeviceInfo from "react-native-device-info";
import { connect } from "react-redux";
import { ISIOS } from "@src/utils/system";
import { HeaderHeightInit } from "@src/utils/constant";

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
  ActiveRouteName: string,
};
type State = {
  currentHeaderHeightAni: any,
  currentOpacityAni: any,
};
class ZnlHeader extends Component<Props, State> {
  static defaultProps = {
    leftIcon: "ios-arrow-back",
  };
  constructor(props) {
    super(props);
    this.state = {
      currentHeaderHeightAni: new Animated.Value(HeaderHeightInit),
      currentOpacityAni: new Animated.Value(1),
    };
  }
  currentHeaderHeight: number = HeaderHeightInit;
  componentWillReceiveProps(prop) {
    const IsAlowAni =
      prop.ActiveRouteName === "Yunext" || prop.ActiveRouteName === "Stocks";
    const { currentHeaderHeight } = this;
    if (currentHeaderHeight !== prop.HeaderHeight) {
      Animated.timing(this.state.currentHeaderHeightAni, {
        toValue: prop.HeaderHeight,
        duration: IsAlowAni ? 200 : 0,
      }).start(() => {
        this.currentHeaderHeight = prop.HeaderHeight;
      });
      Animated.timing(this.state.currentOpacityAni, {
        toValue: prop.HeaderHeight === HeaderHeightInit ? 1 : 0,
        duration: IsAlowAni ? 200 : 0,
      }).start();
    }
  }
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
    ) : hideLeft ? null : (
      <View style={styles.right} />
    );

    const { currentHeaderHeightAni, currentOpacityAni } = this.state;
    return (
      <Animated.View
        style={[
          styles.Header,
          style,
          {
            height: currentHeaderHeightAni,
            opacity: currentOpacityAni,
          },
        ]}
      >
        {Left}
        {CenEle}
        {RightEle}
      </Animated.View>
    );
  }
}

let PaddingTop = 0;
if (ISIOS) {
  switch (DeviceInfo.getModel()) {
    case "iPhone X":
    case "iPhone XR":
    case "iPhone XS":
    case "iPhone XS Max":
      PaddingTop = 44;
      break;
    default:
      PaddingTop = 20;
      break;
  }
}

const styles = StyleSheet.create({
  Header: {
    paddingTop: PaddingTop,
    backgroundColor: "#f8f8f8",
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
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
      ActiveRouteName: state.ActiveRouteName,
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
