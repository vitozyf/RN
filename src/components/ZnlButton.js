// @flow
import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

type Props = {
  type: string, //default  main warn
  placeholder: string,
  onPress: Function,
  style: Object, // 按钮样式
  textStyle: Object, // 文本样式
  activeOpacity: number,
  disabled: boolean,
  children: any,
};
export default class ZnlButton extends Component<Props> {
  static defaultProps = {
    type: "default",
    placeholder: "请输入内容",
    maxLength: 20,
    activeOpacity: 0.8,
    disabled: false,
  };
  render() {
    const {
      type,
      children,
      onPress,
      style,
      textStyle,
      activeOpacity,
      disabled,
    } = this.props;
    let typeStyle = {};
    let typeTextStyle = {};
    switch (type) {
      case "default":
        typeStyle = disabled
          ? styles.buttonDefaultDisabled
          : styles.buttonDefault;
        typeTextStyle = disabled
          ? styles.textDefaultDisabled
          : styles.textDefault;
        break;
      case "main":
        typeStyle = disabled ? styles.buttonMainDisabled : styles.buttonMain;
        typeTextStyle = disabled ? styles.textMainDisabled : styles.textMain;
        break;
      case "light":
        typeStyle = disabled ? styles.buttonLightDisabled : styles.buttonLight;
        typeTextStyle = disabled ? styles.textLightDisabled : styles.textLight;
        break;
      case "warn":
        typeStyle = disabled ? styles.buttonWarnDisabled : styles.buttonWarn;
        typeTextStyle = disabled ? styles.textWarnDisabled : styles.textWarn;
      default:
        break;
    }
    const styleMix = [styles.Button, typeStyle, style];
    const textStyleMix = [styles.Text, typeTextStyle, textStyle];
    return (
      <TouchableOpacity
        onPress={() => {
          return disabled ? null : onPress();
        }}
        activeOpacity={disabled ? 1 : activeOpacity}
        style={styleMix}
      >
        <Text style={textStyleMix}>{children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  Button: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  Text: {
    fontSize: 18,
  },
  // 主按钮
  buttonMain: {
    backgroundColor: "#ee7700",
  },
  textMain: {
    color: "#fff",
  },
  buttonMainDisabled: {
    backgroundColor: "#FFC099",
  },
  textMainDisabled: {
    color: "#fff",
  },
  // 默认
  buttonDefault: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  textDefault: {
    color: "#333",
  },
  buttonDefaultDisabled: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f2f2f2",
  },
  textDefaultDisabled: {
    color: "#999",
  },
  // 警告按钮
  buttonWarn: {
    backgroundColor: "#E64340",
  },
  textWarn: {
    color: "#fff",
  },
  buttonWarnDisabled: {
    backgroundColor: "#E64340",
  },
  textWarnDisabled: {
    color: "#fff",
  },
  // light
  buttonLight: {
    backgroundColor: "#FFE4D0",
    borderWidth: 1,
    borderColor: "#ED9E00",
  },
  textLight: {
    color: "#ED9E00",
  },
  buttonLightDisabled: {
    backgroundColor: "rgba(238, 119, 0, 0.5)",
  },
  textLightDisabled: {
    color: "#fff",
  },
});
